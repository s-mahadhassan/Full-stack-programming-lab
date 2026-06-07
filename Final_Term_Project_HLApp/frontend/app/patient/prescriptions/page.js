/**
 * Purpose: Patient Prescriptions Screen
 * Description: Renders active prescriptions list, displaying drugs, 
 * dosages, duration, and doctor suggestions.
 */

'use client';

import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import { getPrescriptions } from '../../../services/prescriptionService';
import { toast } from 'react-toastify';

export default function PatientPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptionsList = async () => {
      try {
        const res = await getPrescriptions();
        setPrescriptions(res.data || []);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load your medical prescriptions.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptionsList();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>My Medical Prescriptions</h2>
        <p style={{ color: 'var(--text-muted)' }}>Review active drug prescriptions, dosage frequencies, and special instructions from your doctor</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--primary)' }}>Retrieving prescriptions...</div>
      ) : prescriptions.length > 0 ? (
        <Table
          headers={['Specialist Doctor', 'Consultation Reason', 'Medications & Dosages', 'Instructions / Advice', 'Prescribed On']}
          data={prescriptions}
          renderRow={(pres) => (
            <tr key={pres._id}>
              <td>
                <strong style={{ color: '#ffffff' }}>Dr. {pres.doctorId?.userId?.name}</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Specialization: {pres.doctorId?.specialization}
                </div>
              </td>
              <td>{pres.appointmentId?.reason || 'Routine Checkup'}</td>
              <td>
                <ul style={{ paddingLeft: '1rem', margin: 0, fontSize: '0.9rem' }}>
                  {pres.medications?.map((med, mIdx) => (
                    <li key={mIdx} style={{ marginBottom: '0.25rem' }}>
                      <strong style={{ color: 'var(--primary-hover)' }}>{med.name}</strong> ({med.dosage}) 
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          Frequency: {med.frequency} | Duration: {med.duration}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </td>
              <td>{pres.instructions}</td>
              <td>{new Date(pres.createdAt).toLocaleDateString()}</td>
            </tr>
          )}
        />
      ) : (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          You do not have any active medical prescriptions.
        </div>
      )}
    </div>
  );
}
