/**
 * Purpose: Doctor Treatments Management Panel
 * Description: Enables doctors to track the patient treatment lifecycle, record 
 * physical checkups (BP, pulse, temp, weight), update follow-up schedules, and view medical histories.
 */

'use client';

import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import FormInput from '../../../components/FormInput';
import { getTreatments, createTreatment, updateTreatment } from '../../../services/treatmentService';
import { getAppointments } from '../../../services/appointmentService';
import { toast } from 'react-toastify';

export default function DoctorTreatmentsPage() {
  const [treatments, setTreatments] = useState([]);
  const [appointments, setAppointments] = useState([]); // approved appointments to start new treatment
  const [loading, setLoading] = useState(true);

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    appointmentId: '',
    diagnosis: '',
    treatmentStatus: 'active',
    bloodPressure: '',
    pulse: '',
    temperature: '',
    weight: '',
    followUpDate: '',
    followUpNotes: ''
  });
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  const loadPageData = async () => {
    setLoading(true);
    try {
      const [treatRes, appRes] = await Promise.all([
        getTreatments(),
        getAppointments()
      ]);
      setTreatments(treatRes.data || []);
      
      // We only allow creating treatment for approved/completed appointments which do not already have a treatment record
      const existingAppIds = new Set(treatRes.data?.map(t => t.appointmentId?._id));
      const availableApps = appRes.data?.filter(a => (a.status === 'approved' || a.status === 'completed') && !existingAppIds.has(a._id)) || [];
      setAppointments(availableApps);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load treatments data.');
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

  const openCreateModal = () => {
    if (appointments.length === 0) {
      return toast.info('No available approved appointments to initiate new treatment cycles.');
    }
    setFormData({
      appointmentId: appointments[0]._id,
      diagnosis: '',
      treatmentStatus: 'active',
      bloodPressure: '120/80',
      pulse: '72',
      temperature: '98.6',
      weight: '70',
      followUpDate: '',
      followUpNotes: ''
    });
    setIsCreateOpen(true);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedApp = appointments.find(a => a._id === formData.appointmentId);
      const payload = {
        appointmentId: formData.appointmentId,
        patientId: selectedApp.patientId._id,
        diagnosis: formData.diagnosis,
        treatmentStatus: formData.treatmentStatus,
        physicalCheckup: {
          bloodPressure: formData.bloodPressure,
          pulse: Number(formData.pulse),
          temperature: Number(formData.temperature),
          weight: Number(formData.weight)
        }
      };

      const res = await createTreatment(payload);
      if (res.success) {
        toast.success('Treatment cycle initiated.');
        setIsCreateOpen(false);
        loadPageData();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to start treatment plan.');
    }
  };

  const openEditModal = (treat) => {
    setSelectedTreatment(treat);
    setFormData({
      diagnosis: treat.diagnosis,
      treatmentStatus: treat.treatmentStatus,
      bloodPressure: treat.physicalCheckup?.bloodPressure || '',
      pulse: treat.physicalCheckup?.pulse || '',
      temperature: treat.physicalCheckup?.temperature || '',
      weight: treat.physicalCheckup?.weight || '',
      followUpDate: '',
      followUpNotes: ''
    });
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        diagnosis: formData.diagnosis,
        treatmentStatus: formData.treatmentStatus,
        physicalCheckup: {
          bloodPressure: formData.bloodPressure,
          pulse: Number(formData.pulse),
          temperature: Number(formData.temperature),
          weight: Number(formData.weight)
        }
      };

      // Add a follow-up visit if a date is provided
      if (formData.followUpDate) {
        const currentFollowUps = [...(selectedTreatment.followUpVisits || [])];
        currentFollowUps.push({
          visitDate: new Date(formData.followUpDate),
          notes: formData.followUpNotes,
          status: 'scheduled'
        });
        payload.followUpVisits = currentFollowUps;
      }

      const res = await updateTreatment(selectedTreatment._id, payload);
      if (res.success) {
        toast.success('Treatment lifecycle updated successfully.');
        setIsEditOpen(false);
        loadPageData();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update treatment cycle logs.');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return 'badge-approved';
      case 'completed': return 'badge-completed';
      case 'under_observation': return 'badge-pending';
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Manage Clinical Treatments</h2>
          <p style={{ color: 'var(--text-muted)' }}>Monitor diagnostics progress, follow-up visit logs, and physical checkups</p>
        </div>
        <button className="btn btn-primary" onClick={openCreateModal}>
          + Initiate Treatment
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--primary)' }}>Retrieving treatment files...</div>
      ) : (
        <Table
          headers={['Patient', 'Diagnosis', 'Blood Pressure', 'Pulse', 'Temp', 'Weight', 'Lifecycle Status', 'Actions']}
          data={treatments}
          renderRow={(treat) => (
            <tr key={treat._id}>
              <td><strong style={{ color: '#ffffff' }}>{treat.patientId?.userId?.name || 'Unknown'}</strong></td>
              <td>{treat.diagnosis}</td>
              <td>{treat.physicalCheckup?.bloodPressure}</td>
              <td>{treat.physicalCheckup?.pulse} bpm</td>
              <td>{treat.physicalCheckup?.temperature} °F</td>
              <td>{treat.physicalCheckup?.weight} kg</td>
              <td>
                <span className={`badge ${getStatusBadge(treat.treatmentStatus)}`}>
                  {treat.treatmentStatus.replace('_', ' ')}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-secondary"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                  onClick={() => openEditModal(treat)}
                >
                  Manage/Log
                </button>
              </td>
            </tr>
          )}
        />
      )}

      {/* Initiate Treatment Modal */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Initiate Treatment Cycle">
        <form onSubmit={handleCreateSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="appointmentId">Select Consultation Appointment</label>
            <select
              name="appointmentId"
              id="appointmentId"
              value={formData.appointmentId}
              onChange={handleChange}
              className="form-input"
              style={{ width: '100%' }}
              required
            >
              {appointments.map(app => (
                <option key={app._id} value={app._id}>
                  {app.patientId?.userId?.name} - {app.reason} ({new Date(app.date).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>

          <FormInput label="Primary Diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleChange} required />

          <div className="form-group">
            <label className="form-label" htmlFor="treatmentStatus">Initial Treatment Status</label>
            <select
              name="treatmentStatus"
              id="treatmentStatus"
              value={formData.treatmentStatus}
              onChange={handleChange}
              className="form-input"
              style={{ width: '100%' }}
            >
              <option value="active">Active Plan</option>
              <option value="under_observation">Under Observation</option>
              <option value="completed">Completed/Resolved</option>
            </select>
          </div>

          <h4 style={{ color: 'var(--secondary)', margin: '1rem 0' }}>Physical Checkup Records</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FormInput label="Blood Pressure (e.g. 120/80)" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} required />
            <FormInput label="Pulse (bpm)" name="pulse" type="number" value={formData.pulse} onChange={handleChange} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FormInput label="Temperature (°F)" name="temperature" type="number" min="70" max="120" value={formData.temperature} onChange={handleChange} required />
            <FormInput label="Weight (kg)" name="weight" type="number" min="0" value={formData.weight} onChange={handleChange} required />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsCreateOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Treatment</button>
          </div>
        </form>
      </Modal>

      {/* Edit/Log Treatment Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Update Treatment & Checkups">
        {selectedTreatment && (
          <form onSubmit={handleEditSubmit}>
            <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              <p>Patient: <strong style={{ color: '#ffffff' }}>{selectedTreatment.patientId?.userId?.name}</strong></p>
              <p style={{ marginTop: '0.2rem' }}>Initial Diagnosis: <span style={{ color: 'var(--text-muted)' }}>{selectedTreatment.diagnosis}</span></p>
            </div>

            <FormInput label="Update Diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleChange} required />

            <div className="form-group">
              <label className="form-label" htmlFor="treatmentStatus">Treatment Status</label>
              <select
                name="treatmentStatus"
                id="treatmentStatus"
                value={formData.treatmentStatus}
                onChange={handleChange}
                className="form-input"
                style={{ width: '100%' }}
              >
                <option value="active">Active Plan</option>
                <option value="under_observation">Under Observation</option>
                <option value="completed">Completed/Resolved</option>
              </select>
            </div>

            <h4 style={{ color: 'var(--secondary)', margin: '1rem 0' }}>Physical Checkup Records</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormInput label="Blood Pressure" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} required />
              <FormInput label="Pulse (bpm)" name="pulse" type="number" value={formData.pulse} onChange={handleChange} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormInput label="Temperature (°F)" name="temperature" type="number" value={formData.temperature} onChange={handleChange} required />
              <FormInput label="Weight (kg)" name="weight" type="number" value={formData.weight} onChange={handleChange} required />
            </div>

            <h4 style={{ color: 'var(--secondary)', margin: '1.5rem 0 0.5rem' }}>Schedule Follow-up Visit (Optional)</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormInput label="Follow-up Date" name="followUpDate" type="date" value={formData.followUpDate} onChange={handleChange} />
              <FormInput label="Instructions/Notes" name="followUpNotes" value={formData.followUpNotes} onChange={handleChange} placeholder="e.g. Bring laboratory results" />
            </div>

            {selectedTreatment.followUpVisits?.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-muted)' }}>Follow-up History:</span>
                <ul style={{ fontSize: '0.8rem', paddingLeft: '1.2rem', marginTop: '0.4rem', color: 'var(--text-muted)' }}>
                  {selectedTreatment.followUpVisits.map((v, i) => (
                    <li key={i}>
                      {new Date(v.visitDate).toLocaleDateString()} - {v.notes || 'No notes'} ({v.status})
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setIsEditOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
