/**
 * Purpose: Prescription Router Config
 * Routes:
 *   - GET / -> list prescriptions (Protected)
 *   - GET /:id -> view prescription (Protected)
 *   - POST / -> create prescription (Protected, Doctor only)
 *   - PUT /:id -> edit prescription details (Protected, Doctor only)
 *   - DELETE /:id -> delete prescription (Protected, Doctor only)
 */

const express = require('express');
const router = express.Router();
const {
  getPrescriptions,
  getPrescriptionById,
  createPrescription,
  updatePrescription,
  deletePrescription
} = require('../controllers/prescriptionController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getPrescriptions)
  .post(protect, authorize('doctor'), createPrescription);

router.route('/:id')
  .get(protect, getPrescriptionById)
  .put(protect, authorize('doctor'), updatePrescription)
  .delete(protect, authorize('doctor'), deletePrescription);

module.exports = router;
