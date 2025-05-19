// backend/controllers/authController.js
const authService = require('../services/authService'); // Import the authService

const authController = {
    /**
     * Handles user registration.
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object.
     * @param {NextFunction} next - The next middleware function.
     */
    register: async (req, res, next) => {
        try {
            const { name, email, password, tenantName } = req.body;

            authService.validateRegistrationData({ name, email, password, tenantName });

            const emailTaken = await authService.isEmailTaken(email);
            if (emailTaken) {
                return res.status(409).json({ message: 'Email is already taken' });
            }

            const tenant = await authService.createTenant(tenantName);
            const hashedPassword = await authService.hashPassword(password);
            const newUser = await authService.createUser({ name, email }, hashedPassword, tenant.id);
            const token = authService.generateToken(newUser);

            res.status(201).json({
                message: 'User created successfully',
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                    tenantId: tenant.id,
                },
                token,
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Handles user login.
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object.
     * @param {NextFunction} next - The next middleware function.
     */
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            const user = await authService.getUserByEmail(email);

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const passwordMatch = await authService.comparePassword(password, user.password_hash);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = authService.generateToken(user);

            res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    tenantId: user.tenant_id,
                    tenantName: user.tenant ? user.tenant.name : null,
                    registrations: user.registrations.filter(reg => reg.status === "confirmed").map(reg => reg.event_id)
                },
                token,
            });
        } catch (error) {
            next(error);
        }
    },

     /**
     * Handles user profile retrieval.  This is a protected route.
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object.
     * @param {NextFunction} next - The next middleware function.
     */
    getProfile: async (req, res, next) => {
        try {
            //  The user object is already attached to the request by the authenticate middleware (`req.user`)
            const user = await authService.getUserById(req.user.id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({
                message: 'Profile retrieved successfully',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    tenantId: user.tenant_id,
                    tenantName: user.tenant ? user.tenant.name : null
                }
            });
        } catch (error) {
             next(error);
        }
    }
};

module.exports = authController;

