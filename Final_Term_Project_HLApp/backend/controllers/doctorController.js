/**
 * Purpose: Doctor Controller
 * Description: CRUD operations on the Doctor schema.
 * Note: Adding a doctor automatically registers a corresponding User account with role 'doctor'.
 * Deleting a doctor also removes their User credential.
 */

const Doctor = require('../models/Doctor');
const User = require('../models/User');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find().populate('userId', 'name email role');
    return res.json({ success: true, count: doctors.length, data: doctors });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Private
const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email role');
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor profile not found' });
    }
    return res.json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new doctor (and associated User account)
// @route   POST /api/doctors
// @access  Private/Admin
const createDoctor = async (req, res, next) => {
  try {
    const { name, email, password, specialization, experience, department, phone, fees, availability } = req.body;

    // Validate email uniqueness
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    // Create User record first
    const user = await User.create({
      name,
      email,
      password: password || '123456', // default password if not provided
      role: 'doctor'
    });

    // Create Doctor Profile
    const doctor = await Doctor.create({
      userId: user._id,
      specialization,
      experience,
      department,
      phone,
      fees,
      availability: availability || { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], hours: '09:00 - 17:00' }
    });

    return res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

// @desc    Update doctor profile
// @route   PUT /api/doctors/:id
// @access  Private
const updateDoctor = async (req, res, next) => {
  try {
    let doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor profile not found' });
    }

    // Security: Only Admin or corresponding Doctor can update
    if (req.user.role !== 'admin' && req.user._id.toString() !== doctor.userId.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this profile' });
    }

    // Destructure body
    const { name, email, specialization, experience, department, phone, fees, availability, status } = req.body;

    // If name or email needs update, do it on the User object
    if (name || email) {
      const userUpdate = {};
      if (name) userUpdate.name = name;
      if (email) userUpdate.email = email;
      await User.findByIdAndUpdate(doctor.userId, userUpdate, { new: true, runValidators: true });
    }

    // Update Doctor details
    const doctorUpdate = {
      specialization: specialization || doctor.specialization,
      experience: experience !== undefined ? experience : doctor.experience,
      department: department || doctor.department,
      phone: phone || doctor.phone,
      fees: fees !== undefined ? fees : doctor.fees,
      availability: availability || doctor.availability,
      status: status || doctor.status
    };

    doctor = await Doctor.findByIdAndUpdate(req.params.id, doctorUpdate, {
      new: true,
      runValidators: true
    }).populate('userId', 'name email role');

    return res.json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete doctor (and associated User account)
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
const deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor profile not found' });
    }

    // Delete base user and doctor profile
    await User.findByIdAndDelete(doctor.userId);
    await Doctor.findByIdAndDelete(req.params.id);

    return res.json({ success: true, message: 'Doctor and user account deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor
};
