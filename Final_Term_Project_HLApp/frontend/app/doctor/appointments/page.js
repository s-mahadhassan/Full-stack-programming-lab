/**
 * Purpose: Doctor Appointments Panel
 * Description: Lists all appointments assigned to the logged-in doctor,
 * allowing approvals, rejections, and completion mark-offs.
 */

'use client';

import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import { getAppointments, updateAppointmentStatus } from '../../../services/appointmentService';
import { toast } from 'react-toastify';

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Status Modal states
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [statusVal, setStatusVal] = useState('approved');

  const loadAppointmentsList = async () => {
    setLoading(true);
    try {
      const res = await getAppointments();
      setAppointments(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load assigned appointments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointmentsList();
  }, []);

  const openStatusModal = (app) => {
    setSelectedAppointment(app);
    setStatusVal(app.status === 'pending' ? 'approved' : app.status);
    setIsStatusOpen(true);
  };

  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateAppointmentStatus(selectedAppointment._id, { status: statusVal });
      if (res.success) {
        toast.success(`Appointment status updated to '${statusVal}'`);
        setIsStatusOpen(false);
        loadAppointmentsList();
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
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Manage Clinical Consultations</h2>
        <p style={{ color: 'var(--text-muted)' }}>Approve, reject, or complete scheduled appointments under your care</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--primary)' }}>Retrieving appointments...</div>
      ) : (
        <Table
          headers={['Patient', 'Age/Gender', 'Scheduled Date', 'Time Slot', 'Reason', 'Status', 'Actions']}
          data={appointments}
          renderRow={(app) => (
            <tr key={app._id}>
              <td>
                <strong style={{ color: '#ffffff' }}>{app.patientId?.userId?.name || 'Unknown'}</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Blood Group: {app.patientId?.bloodGroup}
                </div>
              </td>
              <td>{app.patientId?.age} / <span style={{ textTransform: 'capitalize' }}>{app.patientId?.gender}</span></td>
              <td>{new Date(app.date).toLocaleDateString()}</td>
              <td>{app.time}</td>
              <td>{app.reason}</td>
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
      <Modal isOpen={isStatusOpen} onClose={() => setIsStatusOpen(false)} title="Update Appointment Status">
        {selectedAppointment && (
          <form onSubmit={handleStatusSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Patient: <strong style={{ color: '#ffffff' }}>{selectedAppointment.patientId?.userId?.name}</strong>
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Complaint: <span style={{ color: '#ffffff', fontStyle: 'italic' }}>"{selectedAppointment.reason}"</span>
              </p>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="status">Status Evaluation</label>
              <select
                name="status"
                id="status"
                value={statusVal}
                onChange={(e) => setStatusVal(e.target.value)}
                className="form-input"
                style={{ width: '100%' }}
              >
                <option value="approved">Approve/Accept</option>
                <option value="rejected">Reject/Cancel</option>
                <option value="completed">Mark as Completed</option>
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
