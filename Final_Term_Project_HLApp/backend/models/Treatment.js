/**
 * Purpose: Treatment Lifecycle Schema and Model
 * Description: Stores physical checkup history, continuous diagnosis reports, 
 * follow-up schedules, and treatment status logs.
 */

const mongoose = require('mongoose');

const TreatmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true
    },
    diagnosis: {
      type: String,
      required: [true, 'Please add a diagnosis description'],
      trim: true
    },
    treatmentStatus: {
      type: String,
      enum: ['active', 'completed', 'under_observation'],
      default: 'active'
    },
    physicalCheckup: {
      bloodPressure: { type: String, default: 'N/A' },
      pulse: { type: Number, default: 0 },
      temperature: { type: Number, default: 0.0 },
      weight: { type: Number, default: 0.0 }
    },
    followUpVisits: [
      {
        visitDate: { type: Date, required: true },
        notes: { type: String, default: '' },
        status: {
          type: String,
          enum: ['scheduled', 'completed', 'missed'],
          default: 'scheduled'
        }
      }
    ],
    statusUpdates: [
      {
        status: { type: String, required: true },
        date: { type: Date, default: Date.now },
        notes: { type: String, default: '' }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Treatment', TreatmentSchema);
