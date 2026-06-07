/**
 * Purpose: Appointment Schema and Model
 * Description: Stores references to Patient and Doctor, date/time parameters, 
 * booking reasoning, current status, and status history logs.
 */

const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      default: null // Doctor can be assigned later by admin or doctor
    },
    date: {
      type: Date,
      required: [true, 'Please add a booking date']
    },
    time: {
      type: String,
      required: [true, 'Please add a booking time slot']
    },
    reason: {
      type: String,
      required: [true, 'Please add a reason for the appointment'],
      trim: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'completed'],
      default: 'pending'
    },
    statusHistory: [
      {
        status: String,
        updatedBy: String, // e.g. "admin", "doctor", "system"
        timestamp: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Appointment', AppointmentSchema);
