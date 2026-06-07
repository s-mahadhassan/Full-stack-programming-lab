/**
 * Purpose: Authentication Routing Config
 * Routes:
 *   - POST /register -> register new user (Public)
 *   - POST /login -> verify credentials and return token (Public)
 *   - GET /profile -> retrieve current user info (Protected)
 *   - POST /logout -> clear session confirmation (Protected)
 */

const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.post('/logout', protect, logoutUser);

module.exports = router;
