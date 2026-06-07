/**
 * Purpose: Patient Treatments Screen
 * Description: Renders the active diagnostics plans, physical logs (BP, temp, weight),
 * and follow-up schedules.
 */

'use client';

import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import { getTreatments } from '../../../services/treatmentService';
import { toast } from 'react-toastify';

export default function PatientTreatmentsPage() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreatmentsList = async () => {
      try {
        const res = await getTreatments();
        setTreatments(res.data || []);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load your treatment records.');
      } finally {
        setLoading(false);
      }
    };

    fetchTreatmentsList();
  }, []);

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
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>My Treatment History</h2>
        <p style={{ color: 'var(--text-muted)' }}>Review physical checkup logs and scheduled follow-up visits under medical supervision</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--primary)' }}>Retrieving treatment history...</div>
      ) : treatments.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {treatments.map((treat) => (
            <div key={treat._id} className="card" style={{ padding: '2rem' }}>
              
              {/* Header section */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Diagnosis</span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#ffffff', marginTop: '0.2rem' }}>
                    {treat.diagnosis}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                    Supervised by: <strong style={{ color: 'var(--secondary)' }}>Dr. {treat.doctorId?.userId?.name}</strong> ({treat.doctorId?.specialization})
                  </p>
                </div>
                <span className={`badge ${getStatusBadge(treat.treatmentStatus)}`}>
                  {treat.treatmentStatus.replace('_', ' ')}
                </span>
              </div>

              {/* Physical checkup details */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--primary-hover)', fontSize: '1rem', marginBottom: '0.8rem' }}>Latest Physical Vitals</h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '1rem'
                }}>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '0.8rem 1.2rem', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Blood Pressure:</span>
                    <p style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '0.2rem', color: '#ffffff' }}>{treat.physicalCheckup?.bloodPressure || 'N/A'}</p>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '0.8rem 1.2rem', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pulse Rate:</span>
                    <p style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '0.2rem', color: '#ffffff' }}>{treat.physicalCheckup?.pulse || 0} bpm</p>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '0.8rem 1.2rem', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Body Temp:</span>
                    <p style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '0.2rem', color: '#ffffff' }}>{treat.physicalCheckup?.temperature || 0.0} °F</p>
                  </div>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '0.8rem 1.2rem', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Weight:</span>
                    <p style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '0.2rem', color: '#ffffff' }}>{treat.physicalCheckup?.weight || 0.0} kg</p>
                  </div>
                </div>
              </div>

              {/* Follow-up Visit schedules */}
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ color: 'var(--primary-hover)', fontSize: '1rem', marginBottom: '0.8rem' }}>Scheduled Follow-up Visits</h4>
                {treat.followUpVisits?.length > 0 ? (
                  <div className="table-wrapper" style={{ marginTop: '0.5rem' }}>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Scheduled Date</th>
                          <th>Instructions / Notes</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {treat.followUpVisits.map((visit, vIdx) => (
                          <tr key={vIdx}>
                            <td><strong style={{ color: '#ffffff' }}>{new Date(visit.visitDate).toLocaleDateString()}</strong></td>
                            <td>{visit.notes || 'None'}</td>
                            <td>
                              <span className={`badge ${visit.status === 'completed' ? 'badge-completed' : (visit.status === 'missed' ? 'badge-rejected' : 'badge-pending')}`}>
                                {visit.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-muted)' }}>No follow-up visits scheduled yet.</p>
                )}
              </div>

              {/* Treatment status history */}
              {treat.statusUpdates?.length > 0 && (
                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Treatment Updates History:</span>
                  <ul style={{ fontSize: '0.85rem', paddingLeft: '1.2rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {treat.statusUpdates.map((up, uIdx) => (
                      <li key={uIdx}>
                        {new Date(up.date).toLocaleDateString()} - Status: <strong style={{ color: '#ffffff' }}>{up.status}</strong>. Details: <em>{up.notes}</em>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          You do not have any active medical treatments recorded in the database.
        </div>
      )}
    </div>
  );
}
