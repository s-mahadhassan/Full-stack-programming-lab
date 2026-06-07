/**
 * Purpose: Notification Schema and Model
 * Description: Stores administrative updates, appointment flags, medication reminders,
 * status details, and flag indicators for simulated SMS and actual SMTP emails.
 */

const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['appointment', 'medication', 'followup'],
      required: true
    },
    status: {
      type: String,
      enum: ['unread', 'read'],
      default: 'unread'
    },
    scheduledTime: {
      type: Date,
      default: Date.now
    },
    isEmailSent: {
      type: Boolean,
      default: false
    },
    isMobileSent: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Notification', NotificationSchema);
