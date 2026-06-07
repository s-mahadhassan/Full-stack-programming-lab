/**
 * Purpose: Admin Appointment Panel
 * Description: Lists all patient booking requests, updates statuses, 
 * and assigns specialized doctors to appointments.
 */

'use client';

import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import { getAppointments, updateAppointmentStatus } from '../../../services/appointmentService';
import { getDoctors } from '../../../services/doctorService';
import { toast } from 'react-toastify';

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Status Modal states
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [statusForm, setStatusForm] = useState({
    status: 'approved',
    doctorId: ''
  });

  const loadPageData = async () => {
    setLoading(true);
    try {
      const [appRes, docRes] = await Promise.all([
        getAppointments(),
        getDoctors()
      ]);
      setAppointments(appRes.data || []);
      setDoctors(docRes.data || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load appointments or doctors lists.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPageData();
  }, []);

  const openStatusModal = (app) => {
    setSelectedAppointment(app);
    setStatusForm({
      status: app.status === 'pending' ? 'approved' : app.status,
      doctorId: app.doctorId?._id || ''
    });
    setIsStatusOpen(true);
  };

  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        status: statusForm.status,
        doctorId: statusForm.doctorId || null
      };

      const res = await updateAppointmentStatus(selectedAppointment._id, payload);
      if (res.success) {
        toast.success(`Appointment status updated to '${statusForm.status}' successfully.`);
        setIsStatusOpen(false);
        loadPageData();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to update appointment status.');
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
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Manage Appointments Queue</h2>
        <p style={{ color: 'var(--text-muted)' }}>Approve, reject, or assign doctors to incoming patient bookings</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--primary)' }}>Retrieving appointments queue...</div>
      ) : (
        <Table
          headers={['Patient', 'Assigned Specialist', 'Scheduled Date', 'Time Slot', 'Reason', 'Status', 'Actions']}
          data={appointments}
          renderRow={(app) => (
            <tr key={app._id}>
              <td>
                <strong style={{ color: '#ffffff' }}>{app.patientId?.userId?.name || 'Unknown'}</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Email: {app.patientId?.userId?.email || 'N/A'}
                </div>
              </td>
              <td>
                {app.doctorId ? (
                  <span style={{ color: 'var(--secondary)' }}>
                    Dr. {app.doctorId.userId?.name || 'Unknown'} ({app.doctorId.specialization})
                  </span>
                ) : (
                  <span style={{ color: 'var(--status-pending)', fontStyle: 'italic' }}>Pending Assignment</span>
                )}
              </td>
              <td>{new Date(app.date).toLocaleDateString()}</td>
              <td>{app.time}</td>
              <td style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {app.reason}
              </td>
              <td>
                <span className={`badge ${getStatusBadge(app.status)}`}>
                  {app.status}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                  onClick={() => openStatusModal(app)}
                >
                  Manage Status
                </button>
              </td>
            </tr>
          )}
        />
      )}

      {/* Manage Status Modal */}
      <Modal isOpen={isStatusOpen} onClose={() => setIsStatusOpen(false)} title="Manage Appointment Status">
        {selectedAppointment && (
          <form onSubmit={handleStatusSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Patient: <strong style={{ color: '#ffffff' }}>{selectedAppointment.patientId?.userId?.name}</strong>
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Reason: <span style={{ color: '#ffffff', fontStyle: 'italic' }}>"{selectedAppointment.reason}"</span>
              </p>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="status">Status Evaluation</label>
              <select
                name="status"
                id="status"
                value={statusForm.status}
                onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value })}
                className="form-input"
                style={{ width: '100%' }}
              >
                <option value="approved">Approve Appointment</option>
                <option value="rejected">Reject Appointment</option>
                <option value="completed">Mark as Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="doctorId">Assign Specialist Doctor</label>
              <select
                name="doctorId"
                id="doctorId"
                value={statusForm.doctorId}
                onChange={(e) => setStatusForm({ ...statusForm, doctorId: e.target.value })}
                className="form-input"
                style={{ width: '100%' }}
              >
                <option value="">-- No Doctor Assigned --</option>
                {doctors.map(doc => (
                  <option key={doc._id} value={doc._id}>
                    Dr. {doc.userId?.name || 'Unknown'} ({doc.specialization} - {doc.department})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setIsStatusOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
