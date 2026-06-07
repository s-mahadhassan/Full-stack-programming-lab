/**
 * Purpose: Doctor Schema and Model
 * Description: Stores specialization, experience, department, phone, fees, availability, 
 * and references the base User model.
 */

const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true // A user can only have one doctor profile
    },
    specialization: {
      type: String,
      required: [true, 'Please add a specialization'],
      trim: true
    },
    experience: {
      type: Number,
      required: [true, 'Please add years of experience']
    },
    department: {
      type: String,
      required: [true, 'Please add a department'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number']
    },
    availability: {
      days: {
        type: [String],
        default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      },
      hours: {
        type: String,
        default: '09:00 - 17:00'
      }
    },
    fees: {
      type: Number,
      required: [true, 'Please add consultation fees']
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Doctor', DoctorSchema);
