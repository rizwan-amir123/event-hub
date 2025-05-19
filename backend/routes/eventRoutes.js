const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticate, isAdmin, tenantGuard } = require('../middleware/authMiddleware'); 

// Define routes
router.get('/events', authenticate, eventController.getAllEvents);
router.post('/events', authenticate, isAdmin, eventController.createEvent); // Admin-only route
router.post('/register/:eventId', authenticate, tenantGuard('event'), eventController.registerForEvent); 

module.exports = router;


