/**
 * Purpose: Authentication Controller
 * Description: Implements registration (with automatic profile creation based on role),
 * login verification, token returns, logout responses, and profile population queries.
 */

const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, ...profileData } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create user record
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'patient'
    });

    // Create role-specific profile
    if (user.role === 'doctor') {
      const { specialization, experience, department, phone, fees, availability } = profileData;
      await Doctor.create({
        userId: user._id,
        specialization: specialization || 'General Medicine',
        experience: experience || 0,
        department: department || 'General',
        phone: phone || 'N/A',
        fees: fees || 0,
        availability: availability || { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], hours: '09:00 - 17:00' }
      });
    } else if (user.role === 'patient') {
      const { age, gender, bloodGroup, address, medicalHistory } = profileData;
      await Patient.create({
        userId: user._id,
        age: age || 0,
        gender: gender || 'other',
        bloodGroup: bloodGroup || 'Unknown',
        address: address || 'N/A',
        medicalHistory: medicalHistory || []
      });
    }

    return res.status(201).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Check for user (include password)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    return res.json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let profile = null;
    if (user.role === 'doctor') {
      profile = await Doctor.findOne({ userId: user._id });
    } else if (user.role === 'patient') {
      profile = await Patient.findOne({ userId: user._id }).populate({
        path: 'assignedDoctor',
        populate: { path: 'userId', select: 'name email' }
      });
    }

    return res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      profile
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user (client-side handles token removal, backend sends confirmation)
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = async (req, res, next) => {
  try {
    return res.json({ success: true, message: 'Logged out successfully. Please discard the token.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser
};
