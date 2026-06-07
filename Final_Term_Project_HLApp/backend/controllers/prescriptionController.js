/**
 * Purpose: Prescription Controller
 * Description: CRUD operations on the Prescription model.
 * Allows doctors to prescribe medications (name, dosage, frequency, duration) and schedules
 * medication notification reminders.
 */

const Prescription = require('../models/Prescription');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const Notification = require('../models/Notification');

// @desc    Get all prescriptions (Role-filtered)
// @route   GET /api/prescriptions
// @access  Private
const getPrescriptions = async (req, res, next) => {
  try {
    let query = {};

    // Filter by role
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ userId: req.user._id });
      if (!patient) {
        return res.status(404).json({ success: false, message: 'Patient profile not found' });
      }
      query.patientId = patient._id;
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ userId: req.user._id });
      if (!doctor) {
        return res.status(404).json({ success: false, message: 'Doctor profile not found' });
      }
      query.doctorId = doctor._id;
    }

    const prescriptions = await Prescription.find(query)
      .populate({
        path: 'patientId',
        populate: { path: 'userId', select: 'name email' }
      })
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email specialization' }
      })
      .populate('appointmentId')
      .sort({ createdAt: -1 });

    return res.json({ success: true, count: prescriptions.length, data: prescriptions });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single prescription by ID
// @route   GET /api/prescriptions/:id
// @access  Private
const getPrescriptionById = async (req, res, next) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate({
        path: 'patientId',
        populate: { path: 'userId', select: 'name email age gender' }
      })
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email specialization' }
      })
      .populate('appointmentId');

    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }

    // Role validation
    if (req.user.role === 'patient' && prescription.patientId.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this prescription' });
    }
    if (req.user.role === 'doctor' && prescription.doctorId.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this prescription' });
    }

    return res.json({ success: true, data: prescription });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new prescription (Doctor only)
// @route   POST /api/prescriptions
// @access  Private (Doctor only)
const createPrescription = async (req, res, next) => {
  try {
    const { appointmentId, patientId, medications, instructions } = req.body;

    if (!appointmentId || !patientId || !medications || medications.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide appointmentId, patientId, and medications' });
    }

    // Find Doctor profile
    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor profile not found' });
    }

    // Create prescription record
    const prescription = await Prescription.create({
      appointmentId,
      patientId,
      doctorId: doctor._id,
      medications,
      instructions: instructions || 'Take medications as directed.'
    });

    // Create medication reminders for the patient
    const patientProfile = await Patient.findById(patientId).populate('userId', 'name');
    if (patientProfile && patientProfile.userId) {
      const medList = medications.map(med => `${med.name} (${med.dosage}) - ${med.frequency}`).join(', ');
      
      await Notification.create({
        userId: patientProfile.userId._id,
        title: 'New Prescription Added',
        message: `Dr. ${req.user.name} has added a prescription: ${medList}. Instructions: ${instructions}`,
        type: 'medication'
      });
    }

    return res.status(201).json({ success: true, data: prescription });
  } catch (error) {
    next(error);
  }
};

// @desc    Update prescription (Doctor only)
// @route   PUT /api/prescriptions/:id
// @access  Private (Doctor only)
const updatePrescription = async (req, res, next) => {
  try {
    let prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }

    // Auth verification
    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (!doctor || prescription.doctorId.toString() !== doctor._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this prescription' });
    }

    const { medications, instructions } = req.body;
    if (medications) prescription.medications = medications;
    if (instructions) prescription.instructions = instructions;

    await prescription.save();
    return res.json({ success: true, data: prescription });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete prescription (Doctor only)
// @route   DELETE /api/prescriptions/:id
// @access  Private (Doctor only)
const deletePrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }

    // Auth verification
    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (!doctor || prescription.doctorId.toString() !== doctor._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this prescription' });
    }

    await Prescription.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Prescription deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPrescriptions,
  getPrescriptionById,
  createPrescription,
  updatePrescription,
  deletePrescription
};
