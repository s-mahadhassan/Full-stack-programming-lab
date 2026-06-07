/**
 * Purpose: Doctor Router Config
 * Routes:
 *   - GET / -> list all doctors (Public)
 *   - GET /:id -> view single doctor details (Protected)
 *   - POST / -> add new doctor (Protected, Admin only)
 *   - PUT /:id -> update doctor details (Protected, Admin/Doctor owner)
 *   - DELETE /:id -> delete doctor details (Protected, Admin only)
 */

const express = require('express');
const router = express.Router();
const {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getDoctors)
  .post(protect, authorize('admin'), createDoctor);

router.route('/:id')
  .get(protect, getDoctorById)
  .put(protect, updateDoctor)
  .delete(protect, authorize('admin'), deleteDoctor);

module.exports = router;
