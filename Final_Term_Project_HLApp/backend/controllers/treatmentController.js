/**
 * Purpose: Treatment Controller
 * Description: CRUD operations on the Treatment lifecycle schema. 
 * Supports physical checkup data entry, follow-up logs, status transitions,
 * and schedules automated reminders for follow-ups.
 */

const Treatment = require('../models/Treatment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Notification = require('../models/Notification');

// @desc    Get all treatments (Role-filtered)
// @route   GET /api/treatments
// @access  Private
const getTreatments = async (req, res, next) => {
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

    const treatments = await Treatment.find(query)
      .populate({
        path: 'patientId',
        populate: { path: 'userId', select: 'name email age gender' }
      })
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email specialization' }
      })
      .populate('appointmentId')
      .sort({ createdAt: -1 });

    return res.json({ success: true, count: treatments.length, data: treatments });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single treatment record
// @route   GET /api/treatments/:id
// @access  Private
const getTreatmentById = async (req, res, next) => {
  try {
    const treatment = await Treatment.findById(req.params.id)
      .populate({
        path: 'patientId',
        populate: { path: 'userId', select: 'name email age gender bloodGroup address' }
      })
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email specialization' }
      })
      .populate('appointmentId');

    if (!treatment) {
      return res.status(404).json({ success: false, message: 'Treatment record not found' });
    }

    // Auth validation
    if (req.user.role === 'patient' && treatment.patientId.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this treatment record' });
    }
    if (req.user.role === 'doctor' && treatment.doctorId.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this treatment record' });
    }

    return res.json({ success: true, data: treatment });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new treatment lifecycle record (Doctor only)
// @route   POST /api/treatments
// @access  Private (Doctor only)
const createTreatment = async (req, res, next) => {
  try {
    const { patientId, appointmentId, diagnosis, treatmentStatus, physicalCheckup, followUpVisits } = req.body;

    // Verify requesting doctor
    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor profile not found' });
    }

    // Verify patient profile
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient profile not found' });
    }

    const treatment = await Treatment.create({
      patientId,
      doctorId: doctor._id,
      appointmentId,
      diagnosis,
      treatmentStatus: treatmentStatus || 'active',
      physicalCheckup: physicalCheckup || { bloodPressure: 'N/A', pulse: 0, temperature: 0, weight: 0 },
      followUpVisits: followUpVisits || [],
      statusUpdates: [{ status: treatmentStatus || 'active', notes: 'Treatment cycle initiated.' }]
    });

    // Send notification to Patient
    const patientProfile = await Patient.findById(patientId).populate('userId', 'name');
    if (patientProfile && patientProfile.userId) {
      await Notification.create({
        userId: patientProfile.userId._id,
        title: 'New Treatment Plan Created',
        message: `Dr. ${req.user.name} has created a new treatment plan for diagnosis: ${diagnosis}.`,
        type: 'followup'
      });
    }

    return res.status(201).json({ success: true, data: treatment });
  } catch (error) {
    next(error);
  }
};

// @desc    Update treatment lifecycle (checkups, follow-ups, statuses)
// @route   PUT /api/treatments/:id
// @access  Private (Doctor only)
const updateTreatment = async (req, res, next) => {
  try {
    let treatment = await Treatment.findById(req.params.id);
    if (!treatment) {
      return res.status(404).json({ success: false, message: 'Treatment record not found' });
    }

    // Verify doctor ownership
    const doctor = await Doctor.findOne({ userId: req.user._id });
    if (!doctor || treatment.doctorId.toString() !== doctor._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this treatment record' });
    }

    const { diagnosis, treatmentStatus, physicalCheckup, followUpVisits, newStatusUpdate } = req.body;

    if (diagnosis) treatment.diagnosis = diagnosis;
    if (treatmentStatus) {
      if (treatment.treatmentStatus !== treatmentStatus) {
        treatment.treatmentStatus = treatmentStatus;
        treatment.statusUpdates.push({
          status: treatmentStatus,
          notes: newStatusUpdate ? newStatusUpdate.notes : 'Status updated'
        });
      }
    }
    if (physicalCheckup) {
      treatment.physicalCheckup = {
        bloodPressure: physicalCheckup.bloodPressure || treatment.physicalCheckup.bloodPressure,
        pulse: physicalCheckup.pulse !== undefined ? physicalCheckup.pulse : treatment.physicalCheckup.pulse,
        temperature: physicalCheckup.temperature !== undefined ? physicalCheckup.temperature : treatment.physicalCheckup.temperature,
        weight: physicalCheckup.weight !== undefined ? physicalCheckup.weight : treatment.physicalCheckup.weight
      };
    }
    
    // Add/Update follow-up visits
    if (followUpVisits) {
      // If a new follow-up is scheduled, create a notification
      const oldLen = treatment.followUpVisits.length;
      treatment.followUpVisits = followUpVisits;
      
      if (treatment.followUpVisits.length > oldLen) {
        // Trigger notification for the latest scheduled visit
        const newVisit = treatment.followUpVisits[treatment.followUpVisits.length - 1];
        const patientProfile = await Patient.findById(treatment.patientId).populate('userId', 'name');
        if (patientProfile && patientProfile.userId && newVisit.status === 'scheduled') {
          await Notification.create({
            userId: patientProfile.userId._id,
            title: 'Follow-up Scheduled',
            message: `A new follow-up visit is scheduled for ${new Date(newVisit.visitDate).toLocaleDateString()}. Notes: ${newVisit.notes}`,
            type: 'followup',
            scheduledTime: newVisit.visitDate
          });
        }
      }
    }

    if (newStatusUpdate && !treatmentStatus) {
      treatment.statusUpdates.push(newStatusUpdate);
    }

    await treatment.save();
    return res.json({ success: true, data: treatment });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete treatment record
// @route   DELETE /api/treatments/:id
// @access  Private (Doctor or Admin only)
const deleteTreatment = async (req, res, next) => {
  try {
    const treatment = await Treatment.findById(req.params.id);
    if (!treatment) {
      return res.status(404).json({ success: false, message: 'Treatment record not found' });
    }

    await Treatment.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Treatment record deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTreatments,
  getTreatmentById,
  createTreatment,
  updateTreatment,
  deleteTreatment
};
