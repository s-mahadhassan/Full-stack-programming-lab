/**
 * Purpose: Doctor Prescriptions Screen
 * Description: Lists written prescriptions and provides a creation form with dynamic 
 * rows for multiple medications (name, dosage, frequency, duration).
 */

'use client';

import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import FormInput from '../../../components/FormInput';
import { getPrescriptions, createPrescription } from '../../../services/prescriptionService';
import { getAppointments } from '../../../services/appointmentService';
import { toast } from 'react-toastify';

export default function DoctorPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [appointments, setAppointments] = useState([]); // approved/completed appointments to prescribe for
  const [loading, setLoading] = useState(true);

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form states
  const [selectedAppId, setSelectedAppId] = useState('');
  const [medications, setMedications] = useState([
    { name: '', dosage: '', frequency: 'Once daily', duration: '5 days' }
  ]);
  const [instructions, setInstructions] = useState('');

  const loadPageData = async () => {
    setLoading(true);
    try {
      const [presRes, appRes] = await Promise.all([
        getPrescriptions(),
        getAppointments()
      ]);
      setPrescriptions(presRes.data || []);
      
      // Filter appointments that are approved/completed to let doctor prescribe
      setAppointments(appRes.data?.filter(a => a.status === 'approved' || a.status === 'completed') || []);
      if (appRes.data?.length > 0) {
        setSelectedAppId(appRes.data[0]._id);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load prescriptions or appointments lists.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPageData();
  }, []);

  const openCreateModal = () => {
    if (appointments.length === 0) {
      return toast.info('No active consultations available to write prescriptions.');
    }
    setMedications([{ name: '', dosage: '', frequency: 'Once daily', duration: '5 days' }]);
    setInstructions('Take medications as directed.');
    setIsCreateOpen(true);
  };

  const handleMedicationChange = (index, field, value) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const addMedicationRow = () => {
    setMedications([
      ...medications,
      { name: '', dosage: '', frequency: 'Once daily', duration: '5 days' }
    ]);
  };

  const removeMedicationRow = (index) => {
    if (medications.length === 1) return;
    setMedications(medications.filter((_, idx) => idx !== index));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    // Check if any medication name is empty
    if (medications.some(m => !m.name || !m.dosage)) {
      return toast.warning('Please fill in all medication names and dosages.');
    }

    try {
      const selectedApp = appointments.find(a => a._id === selectedAppId);
      const payload = {
        appointmentId: selectedAppId,
        patientId: selectedApp.patientId._id,
        medications,
        instructions
      };

      const res = await createPrescription(payload);
      if (res.success) {
        toast.success('Prescription created and patient notified.');
        setIsCreateOpen(false);
        loadPageData();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to create prescription records.');
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Manage Clinical Prescriptions</h2>
          <p style={{ color: 'var(--text-muted)' }}>Write, review, and link prescriptions to patient consultations</p>
        </div>
        <button className="btn btn-primary" onClick={openCreateModal}>
          + Write Prescription
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--primary)' }}>Retrieving prescription lists...</div>
      ) : (
        <Table
          headers={['Patient', 'Consultation', 'Medications Prescribed', 'Instructions', 'Prescribed Date']}
          data={prescriptions}
          renderRow={(pres) => (
            <tr key={pres._id}>
              <td><strong style={{ color: '#ffffff' }}>{pres.patientId?.userId?.name || 'Unknown'}</strong></td>
              <td>{pres.appointmentId?.reason || 'Routine Checkup'}</td>
              <td>
                <ul style={{ paddingLeft: '1rem', margin: 0, fontSize: '0.9rem' }}>
                  {pres.medications?.map((med, idx) => (
                    <li key={idx}>
                      <span style={{ color: 'var(--primary-hover)', fontWeight: '500' }}>{med.name}</span> ({med.dosage}) - {med.frequency} for {med.duration}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{pres.instructions}</td>
              <td>{new Date(pres.createdAt).toLocaleDateString()}</td>
            </tr>
          )}
        />
      )}

      {/* Write Prescription Modal */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Write New Prescription">
        <form onSubmit={handleCreateSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="appointmentId">Select Patient Consultation</label>
            <select
              name="appointmentId"
              id="appointmentId"
              value={selectedAppId}
              onChange={(e) => setSelectedAppId(e.target.value)}
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

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '1.5rem 0 0.5rem'
          }}>
            <h4 style={{ color: 'var(--secondary)' }}>Medications List</h4>
            <button type="button" className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }} onClick={addMedicationRow}>
              + Add Medication
            </button>
          </div>

          {medications.map((med, idx) => (
            <div 
              key={idx} 
              style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-color)',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                position: 'relative'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '0.75rem' }}>
                <FormInput
                  label="Medication Name"
                  name={`name-${idx}`}
                  value={med.name}
                  onChange={(e) => handleMedicationChange(idx, 'name', e.target.value)}
                  placeholder="e.g. Amoxicillin"
                  required
                />
                <FormInput
                  label="Dosage"
                  name={`dosage-${idx}`}
                  value={med.dosage}
                  onChange={(e) => handleMedicationChange(idx, 'dosage', e.target.value)}
                  placeholder="e.g. 500mg"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Frequency</label>
                  <select
                    value={med.frequency}
                    onChange={(e) => handleMedicationChange(idx, 'frequency', e.target.value)}
                    className="form-input"
                    style={{ width: '100%' }}
                  >
                    <option value="Once daily">Once daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Three times daily">Three times daily</option>
                    <option value="Four times daily">Four times daily</option>
                    <option value="As needed">As needed</option>
                  </select>
                </div>
                <FormInput
                  label="Duration"
                  name={`duration-${idx}`}
                  value={med.duration}
                  onChange={(e) => handleMedicationChange(idx, 'duration', e.target.value)}
                  placeholder="e.g. 5 days"
                  required
                />
              </div>

              {medications.length > 1 && (
                <button
                  type="button"
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--status-rejected)',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                  onClick={() => removeMedicationRow(idx)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <FormInput
            label="Special Instructions / Advice"
            name="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="e.g. Take with food, rest well."
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsCreateOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Prescription</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
