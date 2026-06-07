/**
 * Purpose: Notification Controller
 * Description: CRUD operations on the Notification schema.
 * Supports retrieval of role-filtered user alerts, status updates (read/unread),
 * and manual triggering of simulated notifications.
 */

const Notification = require('../models/Notification');

// @desc    Get all notifications for logged in user
// @route   GET /api/notifications
// @access  Private
const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    return res.json({ success: true, count: notifications.length, data: notifications });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
const markNotificationAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOne({ _id: req.params.id, userId: req.user._id });
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    notification.status = 'read';
    await notification.save();

    return res.json({ success: true, data: notification });
  } catch (error) {
    next(error);
  }
};

// @desc    Create manual notification (For admin/doctor triggers or simulation testing)
// @route   POST /api/notifications
// @access  Private
const createNotification = async (req, res, next) => {
  try {
    const { userId, title, message, type, isMobileSent } = req.body;

    if (!userId || !title || !message || !type) {
      return res.status(400).json({ success: false, message: 'Please provide userId, title, message, and type' });
    }

    const notification = await Notification.create({
      userId,
      title,
      message,
      type,
      isMobileSent: isMobileSent !== undefined ? isMobileSent : true // Default to true to simulate SMS alerts
    });

    return res.status(201).json({ success: true, data: notification });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  markNotificationAsRead,
  createNotification
};
