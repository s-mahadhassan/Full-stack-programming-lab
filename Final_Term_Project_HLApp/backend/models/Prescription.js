/**
 * Purpose: Prescription Schema and Model
 * Description: Stores a collection of prescribed medications (name, dosage, frequency, duration),
 * custom instructions, and links them to Patient, Doctor, and Appointment.
 */

const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true
    },
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
    date: {
      type: Date,
      default: Date.now
    },
    medications: [
      {
        name: {
          type: String,
          required: [true, 'Please add medication name']
        },
        dosage: {
          type: String,
          required: [true, 'Please add dosage detail'] // e.g. "500mg" or "1 tablet"
        },
        frequency: {
          type: String,
          required: [true, 'Please add dosage frequency'] // e.g. "Once daily", "Twice daily"
        },
        duration: {
          type: String,
          required: [true, 'Please add treatment duration'] // e.g. "5 days"
        }
      }
    ],
    instructions: {
      type: String,
      default: 'Take medications as directed.'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Prescription', PrescriptionSchema);
