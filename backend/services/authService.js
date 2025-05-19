const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Tenant, User, Registration } = require('../models'); 
const createError = require('http-errors');

const authService = {
    /**
     * Validates user registration data.
     * @param {object} userData - The user data to validate.
     * @throws {Error} - If any required field is missing.
     */
    validateRegistrationData: (userData) => {
        const { name, email, password, tenantName } = userData;
        if (!name || !email || !password || !tenantName) {
            throw createError(400, 'All fields are required');
        }
    },

    /**
     * Checks if a user with the given email already exists.
     * @param {string} email - The email to check.
     * @returns {Promise<boolean>} - A promise that resolves to true if the user exists, false otherwise.
     */
    isEmailTaken: async (email) => {
        const existingUser = await User.findOne({ where: { email } });
        return !!existingUser;
    },

    /**
     * Creates a new tenant.
     * @param {string} tenantName - The name of the tenant.
     * @returns {Promise<Tenant>} - A promise that resolves to the created Tenant instance.
     */
    createTenant: async (tenantName) => {
				// Check if the tenant already exists
				const existingTenant = await Tenant.findOne({ where: { name: tenantName } });
				
				if (existingTenant) {
				    return existingTenant;
				}

				// Create a new tenant if it doesn't exist
				return Tenant.create({
				    name: tenantName,
				    createdAt: new Date(),
				    updatedAt: new Date(),
				});
		},


    /**
     * Hashes the user's password.
     * @param {string} password - The password to hash.
     * @returns {Promise<string>} - A promise that resolves to the hashed password.
     */
    hashPassword: async (password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    },

    /**
     * Creates a new user.
     * @param {object} userData - The user data.
     * @param {string} hashedPassword - The hashed password.
     * @param {number} tenantId - The ID of the tenant.
     * @returns {Promise<User>} - A promise that resolves to the created User instance.
     */
    createUser: async (userData, hashedPassword, tenantId) => {
        const { name, email } = userData;
        const newUser = await User.create({
            name,
            email,
            password_hash: hashedPassword,
            role: 'user',
            tenant_id: tenantId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return newUser;
    },

    /**
     * Generates a JWT token for the user.
     * @param {User} user - The user object.
     * @returns {string} - The JWT token.
     */
    generateToken: (user) => {
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, tenantId: user.tenant_id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return token;
    },

     /**
     * Retrieves a user by email.
     * @param {string} email - The email address.
     * @returns {Promise<User | null>} - A promise that resolves to the user object or null if not found.
     */
    getUserByEmail: async (email) => {
        const user = await User.findOne({
            where: { email },
            include: [{ model: Tenant, as: 'tenant' }, { model: Registration, as: 'registrations' }]
        });
        return user;
    },

     /**
     * Compares a password with its hash.
     * @param {string} password - The password to compare.
     * @param {string} hashedPassword - The stored hashed password.
     * @returns {Promise<boolean>} - A promise that resolves to true if the password matches, false otherwise.
     */
    comparePassword: async (password, hashedPassword) => {
        return bcrypt.compare(password, hashedPassword);
    },

      /**
     * Retrieves a user by ID.
     * @param {number} userId - The user ID.
     * @returns {Promise<User | null>} - A promise that resolves to the user object or null if not found.
     */
    getUserById: async (userId) => {
        const user = await User.findByPk(userId, {
            include: [{ model: Tenant, as: 'tenant' }],
            attributes: ['id', 'name', 'email', 'role', 'tenant_id']
        });
        return user;
    }
};

module.exports = authService;

