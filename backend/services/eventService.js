const { Event, User, Registration } = require('../models'); 
const { Op } = require('sequelize');
const createError = require('http-errors');
const sequelize = require('../utils/db'); 

const eventService = {
    /**
     * Validates event data before creation.
     * @param {object} eventData - The event data to validate.
     * @returns {void}
     * @throws {Error} - Throws an error if the data is invalid.
     */
    validateEventData: (eventData) => {
        const { title, description, startTime, endTime, capacity, price } = eventData;
        if (!title || !description || !startTime || !endTime || capacity === undefined || price === undefined) {
            throw createError(400, 'All event fields are required'); // Use http-errors
        }
        if (capacity < 0) {
            throw createError(400, 'Capacity must be a non-negative number');
        }
        if (price < 0) {
            throw createError(400, 'Price must be a non-negative number');
        }
        //  Add more validation as needed (e.g., date validation)
    },

    /**
     * Creates a new event.
     * @param {object} eventData - The event data.
     * @param {number} tenantId - The ID of the tenant creating the event.
     * @returns {Promise<Event>} - A promise that resolves to the created event.
     */
    createEvent: async (eventData, tenantId) => {
        try {
            eventService.validateEventData(eventData); // Validate the data
            const { title, description, startTime, endTime, capacity, price } = eventData;

            const newEvent = await Event.create({
                title,
                description,
                start_time: startTime,
                end_time: endTime,
                capacity,
                price,
                tenant_id: tenantId,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return newEvent;
        } catch (error) {
            throw error; // Re-throw the error so it can be handled by the controller
        }
    },

    /**
     * Gets all events for a tenant
     * @param tenantId
     * @returns {Promise<Event[]>}
     */
    getEventsByTenant: async (tenantId) => {
				try {
				    const events = await Event.findAll({
				        where: { tenant_id: tenantId },
				        order: [['start_time', 'ASC']],
				        include: [{ model: Registration, as: 'registrations' }],
				    });

				    // Convert to plain objects and modify the registrations
				    const modified = events.map((item) => {
				        const plainItem = item.toJSON();
				        plainItem.registrations = plainItem.registrations
				            .filter((registration) => registration.status === 'confirmed')
				            .map((registration) => registration.user_id);
				        return plainItem;
				    });

				    return modified;
				} catch (error) {
				    throw error;
				}
		},
		
    /**
     * Retrieves a single event by ID.
     * @param {number} eventId - The ID of the event.
     * @returns {Promise<Event>} - A promise that resolves to the event.
     * @throws {Error} - Throws an error if the event is not found.
     */
    getEventById: async (eventId) => {
        const event = await Event.findByPk(eventId);
        if (!event) {
            throw createError(404, 'Event not found'); // Use http-errors
        }
        return event;
    },
    /**
     * Registers a user for an event.
     * @param {number} eventId - The ID of the event.
     * @param {number} userId - The ID of the user.
     * @returns {Promise<Registration>} - A promise that resolves to the registration.
     * @throws {Error}
     */
    registerUserForEvent: async (eventId, userId) => {
				const transaction = await sequelize.transaction();

				try {
				    const event = await eventService.getEventById(eventId);

				    // Check if the event is already full within the transaction
				    const registrationCount = await Registration.count({ 
				        where: { event_id: eventId },
				        transaction 
				    });

				    if (registrationCount >= event.capacity) {
				        throw createError(400, 'Event is full');
				    }

				    // Check if the user is already registered
				    const existingRegistration = await Registration.findOne({
				        where: {
				            event_id: eventId,
				            user_id: userId,
				        },
				        transaction
				    });

				    if (existingRegistration) {
				        throw createError(400, 'User is already registered for this event');
				    }

				    // Simulate payment if the event is not free
				    if (event.price > 0) {
				        console.log(`Simulating payment of $${event.price} for user ${userId} and event ${eventId}`);
				    }

				    // Create the registration within the transaction
				    const registration = await Registration.create({
				        event_id: eventId,
				        user_id: userId,
				        status: 'confirmed',
				        createdAt: new Date(),
				        updatedAt: new Date()
				    }, { transaction });

				    // Commit the transaction if everything is successful
				    await transaction.commit();

				    return registration;

				} catch (error) {
				    // Rollback the transaction on error
				    await transaction.rollback();
				    throw createError(404, 'Failed to register user for the event.');
				}
		}    
};

module.exports = eventService;
