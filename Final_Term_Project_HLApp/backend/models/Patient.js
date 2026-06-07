/**
 * Purpose: Patient Schema and Model
 * Description: Stores physical details (age, gender, blood group), contact address, 
 * historical medical notes, and references the assigned Doctor.
 */

const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true // A user can only have one patient profile
    },
    age: {
      type: Number,
      required: [true, 'Please add patient age']
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Please add patient gender']
    },
    bloodGroup: {
      type: String,
      required: [true, 'Please add blood group']
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
      trim: true
    },
    medicalHistory: {
      type: [String],
      default: []
    },
    assignedDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Patient', PatientSchema);
