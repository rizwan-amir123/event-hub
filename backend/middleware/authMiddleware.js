const jwt = require('jsonwebtoken');
const { Tenant, User } = require('../models');

const authMiddleware = {
    /**
     * Middleware to authenticate a user using JWT.
     * Attaches the user object to the request if the token is valid.
     */
    authenticate: async (req, res, next) => {
        try {
            // 1. Get the token from the header
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Authentication required' }); 
            }

            const token = authHeader.split(' ')[1];

            // 2. Verify the token
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded; 
            } catch (err) {
                return res.status(401).json({ message: 'Invalid token' }); 
            }
            
            // 3.  Fetch the user from the database and attach to the request
            const user = await User.findByPk(req.user.id);

            if (!user) {
                return res.status(401).json({ message: 'User not found' }); 
            }
            req.user = user; 
            next();

        } catch (error) {
            //  Catch any unexpected errors
            console.error(error);
            return res.status(500).json({ message: 'Server error' }); 
        }
    },

    /**
     * Middleware to check if the user has the 'admin' role.
     * Must be used *after* the authenticate middleware.
     */
    isAdmin: (req, res, next) => {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized. Admin role required' }); // Using standard Express
        }
        next();
    },

    /**
     * Middleware to ensure that the user's tenant matches the requested resource's tenant.
     * This is crucial for multi-tenancy.  Use this *after* authenticate.
     */
    tenantGuard: (resourceType) => {
        return async (req, res, next) => {
            try {
                //  Check if user is admin, if admin, skip tenantGuard
                if (req.user.role === 'admin') {
                    return next();
                }

                const userTenantId = req.user.tenant_id;

                let resourceTenantId;
                if (resourceType === 'event') {
                    const { Event } = require('../models');  
                    const eventId = req.params.eventId || req.body.event_id; 
                    const event = await Event.findByPk(eventId); 
                    if (!event) {
                        return res.status(404).json({ message: 'Event not found' }); 
                    }
                    resourceTenantId = event.tenant_id;
                } else if (resourceType === 'registration') {
                    const { Registration } = require('../models');
                    const registrationId = req.params.registrationId;
                    const registration = await Registration.findByPk(registrationId, {
                        include: {
                            model: Event,
                            as: 'event'
                        }
                    });
                    if (!registration) {
                         return res.status(404).json({ message: 'Registration not found' }); 
                    }
                    resourceTenantId = registration.event.tenant_id;
                } else if (resourceType === 'user') {
                    //For user routes,
                    const { id } = req.params;
                    if(req.user.id !== Number(id)){
                         return res.status(403).json({ message: 'Unauthorized. User can only access their own data.' }); 
                    }
                    resourceTenantId = req.user.tenant_id
                }
                // Add more resource types as needed (e.g., 'order', 'product')

                if (userTenantId !== resourceTenantId) {
                      return res.status(403).json({ message: `Unauthorized.  User's tenant does not match the ${resourceType}'s tenant.` }); 
                }
                next();
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Server error' }); 
            }
        };
    },
};

module.exports = authMiddleware;

