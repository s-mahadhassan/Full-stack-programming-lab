/**
 * Purpose: Appointment Router Config
 * Routes:
 *   - GET / -> list all appointments (Protected, filtered by role)
 *   - GET /:id -> view single appointment (Protected)
 *   - POST / -> book new appointment (Protected, Patient or Admin)
 *   - PUT /:id/status -> approve or reject appointment (Protected, Admin & Doctors only)
 *   - PUT /:id -> update details (Protected, Admin or Patient booking owner)
 *   - DELETE /:id -> cancel/delete appointment (Protected, Admin or Patient booking owner)
 */

const express = require('express');
const router = express.Router();
const {
  getAppointments,
  getAppointmentById,
  bookAppointment,
  updateAppointmentStatus,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getAppointments)
  .post(protect, bookAppointment);

router.route('/:id')
  .get(protect, getAppointmentById)
  .put(protect, updateAppointment)
  .delete(protect, deleteAppointment);

router.route('/:id/status')
  .put(protect, authorize('admin', 'doctor'), updateAppointmentStatus);

module.exports = router;
