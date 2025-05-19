const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticate, isAdmin, tenantGuard } = require('../middleware/authMiddleware'); // Import the middleware

// Define routes
router.get('/events', authenticate, eventController.getAllEvents);
router.get('/events/:eventId', authenticate, tenantGuard('event'), eventController.getEventById); // Added tenantGuard
router.post('/events', authenticate, isAdmin, eventController.createEvent); // Admin-only route
router.post('/register/:eventId', authenticate, tenantGuard('event'), eventController.registerForEvent); // Added tenantGuard
router.get('/registrations/:registrationId', authenticate, tenantGuard('registration'), eventController.getRegistration);
router.get('/users/:id', authenticate, tenantGuard('user'), eventController.getUser);
module.exports = router;
