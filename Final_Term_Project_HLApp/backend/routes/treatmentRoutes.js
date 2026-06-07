/**
 * Purpose: Treatment Router Config
 * Routes:
 *   - GET / -> list all treatments (Protected, role-filtered)
 *   - GET /:id -> view single treatment details (Protected, role-filtered)
 *   - POST / -> create treatment record (Protected, Doctor only)
 *   - PUT /:id -> update physical checkup, status, and follow-ups (Protected, Doctor only)
 *   - DELETE /:id -> delete treatment (Protected, Admin & Doctors only)
 */

const express = require('express');
const router = express.Router();
const {
  getTreatments,
  getTreatmentById,
  createTreatment,
  updateTreatment,
  deleteTreatment
} = require('../controllers/treatmentController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getTreatments)
  .post(protect, authorize('doctor'), createTreatment);

router.route('/:id')
  .get(protect, getTreatmentById)
  .put(protect, authorize('doctor'), updateTreatment)
  .delete(protect, authorize('admin', 'doctor'), deleteTreatment);

module.exports = router;
