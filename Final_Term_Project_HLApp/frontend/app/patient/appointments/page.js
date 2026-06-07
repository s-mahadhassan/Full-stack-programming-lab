/**
 * Purpose: Patient Appointment Panel
 * Description: Renders booked schedules list and presents a booking form
 * where patients can choose dates, times, select doctors, and input reasons.
 */

'use client';

import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import FormInput from '../../../components/FormInput';
import { getAppointments, bookAppointment, deleteAppointment } from '../../../services/appointmentService';
import { getDoctors } from '../../../services/doctorService';
import { toast } from 'react-toastify';

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '09:00 AM',
    reason: ''
  });
  const [selectedAppId, setSelectedAppId] = useState(null);

  const loadPageData = async () => {
    setLoading(true);
    try {
      const [appRes, docRes] = await Promise.all([
        getAppointments(),
        getDoctors()
      ]);
      setAppointments(appRes.data || []);
      
      const activeDocs = docRes.data?.filter(d => d.status === 'active') || [];
      setDoctors(activeDocs);
      if (activeDocs.length > 0) {
        setFormData(prev => ({ ...prev, doctorId: activeDocs[0]._id }));
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load appointments log.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPageData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openBookModal = () => {
    if (doctors.length === 0) {
      return toast.info('No active doctors available in the clinic at this time.');
    }
    setFormData({
      doctorId: doctors[0]._id,
      date: '',
      time: '09:00 AM',
      reason: ''
    });
    setIsBookOpen(true);
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        doctorId: formData.doctorId,
        date: new Date(formData.date),
        time: formData.time,
        reason: formData.reason
      };

      const res = await bookAppointment(payload);
      if (res.success) {
        toast.success('Appointment booked successfully! Pending approval.');
        setIsBookOpen(false);
        loadPageData();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to book appointment slot.');
    }
  };

  const openCancelModal = (id) => {
    setSelectedAppId(id);
    setIsCancelOpen(true);
  };

  const handleCancelConfirm = async () => {
    try {
      const res = await deleteAppointment(selectedAppId);
      if (res.success) {
        toast.success('Appointment booking cancelled.');
        setIsCancelOpen(false);
        loadPageData();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to cancel appointment booking.');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return 'badge-pending';
      case 'approved': return 'badge-approved';
      case 'completed': return 'badge-completed';
      case 'rejected': return 'badge-rejected';
      default: return '';
    }
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>My Appointment History</h2>
          <p style={{ color: 'var(--text-muted)' }}>Book new consultation sessions and check request statuses</p>
        </div>
        <button className="btn btn-primary" onClick={openBookModal}>
          Book Appointment
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--primary)' }}>Retrieving appointments logs...</div>
      ) : (
        <Table
          headers={['Specialist', 'Scheduled Date', 'Time Slot', 'Reason', 'Status', 'Actions']}
          data={appointments}
          renderRow={(app) => (
            <tr key={app._id}>
              <td>
                {app.doctorId ? (
                  <div>
                    <strong style={{ color: '#ffffff' }}>Dr. {app.doctorId.userId?.name}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Specialization: {app.doctorId.specialization}
                    </div>
                  </div>
                ) : (
                  <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Unassigned</span>
                )}
              </td>
              <td>{new Date(app.date).toLocaleDateString()}</td>
              <td>{app.time}</td>
              <td>{app.reason}</td>
              <td>
                <span className={`badge ${getStatusBadge(app.status)}`}>
                  {app.status}
                </span>
              </td>
              <td>
                {(app.status === 'pending' || app.status === 'approved') ? (
                  <button
                    className="btn btn-danger"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                    onClick={() => openCancelModal(app._id)}
                  >
                    Cancel Booking
                  </button>
                ) : (
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>No action available</span>
                )}
              </td>
            </tr>
          )}
        />
      )}

      {/* Book Appointment Modal */}
      <Modal isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} title="Book Consultation Appointment">
        <form onSubmit={handleBookSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="doctorId">Select Specialist Doctor</label>
            <select
              name="doctorId"
              id="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              className="form-input"
              style={{ width: '100%' }}
              required
            >
              {doctors.map(doc => (
                <option key={doc._id} value={doc._id}>
                  Dr. {doc.userId?.name} ({doc.specialization} - Fee: ${doc.fees})
                </option>
              ))}
            </select>
          </div>

          <FormInput
            label="Booking Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]} // restrict booking past dates
            required
          />

          <div className="form-group">
            <label className="form-label" htmlFor="time">Time Slot</label>
            <select
              name="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              className="form-input"
              style={{ width: '100%' }}
              required
            >
              <option value="09:00 AM">09:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:30 AM">11:30 AM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="03:30 PM">03:30 PM</option>
              <option value="04:30 PM">04:30 PM</option>
            </select>
          </div>

          <FormInput
            label="Reason / Chief Complaints"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="e.g. Regular general checkup, high blood pressure symptoms"
            required
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsBookOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Book Consultation</button>
          </div>
        </form>
      </Modal>

      {/* Cancel Confirmation Modal */}
      <Modal isOpen={isCancelOpen} onClose={() => setIsCancelOpen(false)} title="Cancel Appointment Booking">
        <div style={{ padding: '0.5rem 0' }}>
          <p style={{ color: 'var(--text-main)', marginBottom: '1.5rem' }}>
            Are you sure you want to cancel this appointment reservation? This action cannot be undone.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button className="btn btn-secondary" onClick={() => setIsCancelOpen(false)}>No, Keep booking</button>
            <button className="btn btn-danger" onClick={handleCancelConfirm}>Yes, Cancel Booking</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
