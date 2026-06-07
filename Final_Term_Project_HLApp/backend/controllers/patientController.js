/**
 * Purpose: Patient Controller
 * Description: CRUD operations on the Patient schema.
 * Note: Adding a patient automatically creates a User account with role 'patient'.
 * Deleting a patient deletes their associated User account.
 */

const Patient = require('../models/Patient');
const User = require('../models/User');

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private (Admin & Doctors only)
const getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find()
      .populate('userId', 'name email role')
      .populate({
        path: 'assignedDoctor',
        populate: { path: 'userId', select: 'name email' }
      });
    return res.json({ success: true, count: patients.length, data: patients });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single patient by ID
// @route   GET /api/patients/:id
// @access  Private (Admin, Doctor, or corresponding Patient)
const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate('userId', 'name email role')
      .populate({
        path: 'assignedDoctor',
        populate: { path: 'userId', select: 'name email specialization' }
      });

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient profile not found' });
    }

    // Role-based auth check: Patients can only see their own profile
    if (req.user.role === 'patient' && req.user._id.toString() !== patient.userId._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this profile' });
    }

    return res.json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new patient record (and User account)
// @route   POST /api/patients
// @access  Private/Admin
const createPatient = async (req, res, next) => {
  try {
    const { name, email, password, age, gender, bloodGroup, address, medicalHistory, assignedDoctor } = req.body;

    // Validate email uniqueness
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    // Create User record
    const user = await User.create({
      name,
      email,
      password: password || '123456', // default password
      role: 'patient'
    });

    // Create Patient profile
    const patient = await Patient.create({
      userId: user._id,
      age,
      gender,
      bloodGroup,
      address,
      medicalHistory: medicalHistory || [],
      assignedDoctor: assignedDoctor || null
    });

    return res.status(201).json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
};

// @desc    Update patient details
// @route   PUT /api/patients/:id
// @access  Private (Admin or corresponding Patient)
const updatePatient = async (req, res, next) => {
  try {
    let patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient profile not found' });
    }

    // Security: Only Admin or corresponding Patient can update
    if (req.user.role === 'patient' && req.user._id.toString() !== patient.userId.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this profile' });
    }

    // Destructure body
    const { name, email, age, gender, bloodGroup, address, medicalHistory, assignedDoctor } = req.body;

    // Update base User
    if (name || email) {
      const userUpdate = {};
      if (name) userUpdate.name = name;
      if (email) userUpdate.email = email;
      await User.findByIdAndUpdate(patient.userId, userUpdate, { new: true, runValidators: true });
    }

    // Update Patient details
    const patientUpdate = {
      age: age !== undefined ? age : patient.age,
      gender: gender || patient.gender,
      bloodGroup: bloodGroup || patient.bloodGroup,
      address: address || patient.address,
      medicalHistory: medicalHistory || patient.medicalHistory,
      assignedDoctor: assignedDoctor !== undefined ? assignedDoctor : patient.assignedDoctor
    };

    patient = await Patient.findByIdAndUpdate(req.params.id, patientUpdate, {
      new: true,
      runValidators: true
    }).populate('userId', 'name email role')
      .populate({
        path: 'assignedDoctor',
        populate: { path: 'userId', select: 'name email' }
      });

    return res.json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete patient (and associated User account)
// @route   DELETE /api/patients/:id
// @access  Private/Admin
const deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient profile not found' });
    }

    // Delete base User and Patient profile
    await User.findByIdAndDelete(patient.userId);
    await Patient.findByIdAndDelete(req.params.id);

    return res.json({ success: true, message: 'Patient and user account deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient
};
