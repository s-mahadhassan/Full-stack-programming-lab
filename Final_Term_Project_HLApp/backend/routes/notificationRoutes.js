/**
 * Purpose: Notification Router Config
 * Routes:
 *   - GET / -> retrieve notifications for the logged in user (Protected)
 *   - PUT /:id/read -> mark notification as read (Protected)
 *   - POST / -> create manual notification (Protected, Admin & Doctors only)
 */

const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markNotificationAsRead,
  createNotification
} = require('../controllers/notificationController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getNotifications)
  .post(protect, authorize('admin', 'doctor'), createNotification);

router.route('/:id/read')
  .put(protect, markNotificationAsRead);

module.exports = router;
