/**
 * Purpose: Patient Router Config
 * Routes:
 *   - GET / -> list all patients (Protected, Admin & Doctors only)
 *   - GET /:id -> view single patient (Protected, Admin, Doctors, or corresponding Patient)
 *   - POST / -> create patient record (Protected, Admin only)
 *   - PUT /:id -> update patient details (Protected, Admin or corresponding Patient)
 *   - DELETE /:id -> delete patient record (Protected, Admin only)
 */

const express = require('express');
const router = express.Router();
const {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient
} = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, authorize('admin', 'doctor'), getPatients)
  .post(protect, authorize('admin'), createPatient);

router.route('/:id')
  .get(protect, getPatientById)
  .put(protect, updatePatient)
  .delete(protect, authorize('admin'), deletePatient);

module.exports = router;
