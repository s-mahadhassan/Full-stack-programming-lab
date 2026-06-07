/**
 * Purpose: Appointment Controller
 * Description: CRUD operations on the Appointment schema. Includes status workflows
 * (pending, approved, rejected, completed) and triggers automated notification generation.
 */

const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Notification = require('../models/Notification');
const { sendEmail } = require('../services/emailService');

// @desc    Get all appointments (Role-filtered)
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res, next) => {
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

    const appointments = await Appointment.find(query)
      .populate({
        path: 'patientId',
        populate: { path: 'userId', select: 'name email' }
      })
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email specialization' }
      })
      .sort({ date: 1, time: 1 });

    return res.json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate({
        path: 'patientId',
        populate: { path: 'userId', select: 'name email' }
      })
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email specialization' }
      });

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Role-based auth verification
    if (req.user.role === 'patient' && appointment.patientId.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this appointment' });
    }
    if (req.user.role === 'doctor' && appointment.doctorId.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this appointment' });
    }

    return res.json({ success: true, data: appointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private
const bookAppointment = async (req, res, next) => {
  try {
    let { patientId, doctorId, date, time, reason } = req.body;

    // If logged in as patient, override patientId with current patient profile
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ userId: req.user._id });
      if (!patient) {
        return res.status(400).json({ success: false, message: 'Patient profile must exist to book' });
      }
      patientId = patient._id;

      // Auto assign doctor if patient has an assigned doctor and no doctor was specified
      if (!doctorId && patient.assignedDoctor) {
        doctorId = patient.assignedDoctor;
      }
    }

    if (!patientId || !date || !time || !reason) {
      return res.status(400).json({ success: false, message: 'Please provide patientId, date, time, and reason' });
    }

    // Check if appointment slot already booked for this doctor
    if (doctorId) {
      const slotTaken = await Appointment.findOne({ doctorId, date, time, status: { $ne: 'rejected' } });
      if (slotTaken) {
        return res.status(400).json({ success: false, message: 'This time slot is already booked for this doctor' });
      }
    }

    const appointment = await Appointment.create({
      patientId,
      doctorId: doctorId || null,
      date,
      time,
      reason,
      status: 'pending',
      statusHistory: [{ status: 'pending', updatedBy: req.user.role }]
    });

    // Create Booking Notification
    const patientProfile = await Patient.findById(patientId).populate('userId', 'name email');
    if (patientProfile && patientProfile.userId) {
      await Notification.create({
        userId: patientProfile.userId._id,
        title: 'Appointment Booked',
        message: `Your appointment request for ${new Date(date).toLocaleDateString()} at ${time} has been registered and is pending approval.`,
        type: 'appointment'
      });
    }

    return res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve or Reject appointment (Admin or Doctor) + optional Doctor Assignment
// @route   PUT /api/appointments/:id/status
// @access  Private (Admin & Doctors only)
const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status, doctorId } = req.body;

    if (!status || !['approved', 'rejected', 'completed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid status (approved, rejected, completed)' });
    }

    let appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Doctor checks
    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ userId: req.user._id });
      if (!doctor) {
        return res.status(404).json({ success: false, message: 'Doctor profile not found' });
      }
      // A doctor can only approve/reject appointments assigned to them, or if it is unassigned they can assign to themselves
      if (appointment.doctorId && appointment.doctorId.toString() !== doctor._id.toString()) {
        return res.status(403).json({ success: false, message: 'Not authorized to update status of another doctor\'s appointment' });
      }
    }

    // Update appointment
    appointment.status = status;
    if (doctorId) {
      appointment.doctorId = doctorId;
    } else if (req.user.role === 'doctor' && !appointment.doctorId) {
      const doctor = await Doctor.findOne({ userId: req.user._id });
      appointment.doctorId = doctor._id;
    }

    appointment.statusHistory.push({
      status,
      updatedBy: req.user.role
    });

    await appointment.save();

    // Populate patient info for notification
    const patientProfile = await Patient.findById(appointment.patientId).populate('userId', 'name email');
    const doctorProfile = appointment.doctorId
      ? await Doctor.findById(appointment.doctorId).populate('userId', 'name email specialization')
      : null;

    if (patientProfile && patientProfile.userId) {
      const docName = doctorProfile ? `Dr. ${doctorProfile.userId.name}` : 'an assigned Doctor';
      const notificationMsg = `Your appointment for ${new Date(appointment.date).toLocaleDateString()} at ${appointment.time} has been ${status} by ${docName}.`;

      // Create Notification record
      const notification = await Notification.create({
        userId: patientProfile.userId._id,
        title: `Appointment ${status.charAt(0).toUpperCase() + status.slice(1)}`,
        message: notificationMsg,
        type: 'appointment'
      });

      // Send Email in background (handle errors to avoid request blocks)
      try {
        const emailSubject = `Appointment ${status.charAt(0).toUpperCase() + status.slice(1)} - HLApp`;
        const emailHTML = `
          <h2>Healthcare Management System</h2>
          <p>Dear ${patientProfile.userId.name},</p>
          <p>${notificationMsg}</p>
          <hr />
          <p>This is an automated system email. Please do not reply directly.</p>
        `;
        await sendEmail({
          email: patientProfile.userId.email,
          subject: emailSubject,
          html: emailHTML
        });
        notification.isEmailSent = true;
        await notification.save();
      } catch (err) {
        console.error('SMTP Email sending failed:', err.message);
      }
    }

    return res.json({ success: true, data: appointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Update appointment details
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = async (req, res, next) => {
  try {
    let appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Only Admin or the booking patient can edit general details (date/time/reason)
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ userId: req.user._id });
      if (appointment.patientId.toString() !== patient._id.toString()) {
        return res.status(403).json({ success: false, message: 'Not authorized to update this appointment' });
      }
    }

    const { date, time, reason, doctorId } = req.body;

    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;
    appointment.reason = reason || appointment.reason;
    if (doctorId !== undefined) {
      appointment.doctorId = doctorId;
    }

    await appointment.save();
    return res.json({ success: true, data: appointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete/Cancel appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Auth check
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ userId: req.user._id });
      if (appointment.patientId.toString() !== patient._id.toString()) {
        return res.status(403).json({ success: false, message: 'Not authorized to cancel this appointment' });
      }
    }

    await Appointment.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Appointment cancelled/deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAppointments,
  getAppointmentById,
  bookAppointment,
  updateAppointmentStatus,
  updateAppointment,
  deleteAppointment
};
