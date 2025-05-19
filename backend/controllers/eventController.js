const eventService = require('../services/eventService'); 
const { Event } = require('../models/event');
const { Registration } = require('../models/registration');
const { User } = require('../models/user');
const { Op } = require('sequelize');
const createError = require('http-errors');

const eventController = {
    /**
     * Handles event creation (admin only).
     */
    createEvent: async (req, res, next) => {
        try {
            const { title, description, startTime, endTime, capacity, price } = req.body;
            const tenantId = req.user.tenant_id;

            const newEvent = await eventService.createEvent({ title, description, startTime, endTime, capacity, price }, tenantId); 

            res.status(201).json({ message: 'Event created successfully', event: newEvent });
        } catch (error) {
            next(error); // Pass the error to the error handler
        }
    },

    /**
     * Retrieves all events for the current tenant.
     */
    getAllEvents: async (req, res, next) => {
        try {
            const tenantId = req.user.tenant_id;
            const events = await eventService.getEventsByTenant(tenantId);  
            res.status(200).json({ message: 'Events retrieved successfully', events });
        } catch (error) {
            next(error);
        }
    },

    

    /**
     * Handles user registration for an event.
     */
    registerForEvent: async (req, res, next) => {
        try {
            const { eventId } = req.params;
            const userId = req.user.id;

            const registration = await eventService.registerUserForEvent(eventId, userId);
            res.status(201).json({ message: 'Registration successful', registration });
        } catch (error) {
            next(error);
        }
    },

};

module.exports = eventController;
