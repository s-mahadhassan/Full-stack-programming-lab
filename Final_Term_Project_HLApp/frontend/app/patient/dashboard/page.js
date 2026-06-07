/**
 * Purpose: Patient Dashboard Panel
 * Description: Retrieves appointments, active treatments, and notifications
 * to display stats, upcoming visits, and primary diagnostics notes.
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardCard from '../../../components/DashboardCard';
import Table from '../../../components/Table';
import { getAppointments } from '../../../services/appointmentService';
import { getTreatments } from '../../../services/treatmentService';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

export default function PatientDashboard() {
  const { profile } = useAuth();
  const [metrics, setMetrics] = useState({
    appointmentsCount: 0,
    activeTreatments: 0,
    assignedDoctorName: 'None'
  });
  const [upcomingApps, setUpcomingApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [appRes, treatRes] = await Promise.all([
          getAppointments(),
          getTreatments()
        ]);

        const apps = appRes.data || [];
        const treats = treatRes.data || [];
        const docName = profile?.assignedDoctor?.userId?.name 
          ? `Dr. ${profile.assignedDoctor.userId.name}` 
          : 'Unassigned';

        setMetrics({
          appointmentsCount: apps.length,
          activeTreatments: treats.filter(t => t.treatmentStatus === 'active').length,
          assignedDoctorName: docName
        });

        setUpcomingApps(apps.filter(a => a.status === 'approved' || a.status === 'pending').slice(0, 5));
      } catch (error) {
        console.error(error);
        toast.error('Failed to load your patient dashboard statistics.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [profile]);

  if (loading) {
    return <div style={{ color: 'var(--primary)', textAlign: 'center', marginTop: '3rem' }}>Loading your medical dashboard...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>My Patient Portal</h2>
        <p style={{ color: 'var(--text-muted)' }}>Monitor your appointments, active treatments, and prescriptions history</p>
      </div>

      <div className="dashboard-grid">
        <DashboardCard
          title="Assigned Specialist"
          value={metrics.assignedDoctorName}
          icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          description={profile?.assignedDoctor?.specialization ? `Specialist: ${profile.assignedDoctor.specialization}` : 'No assigned doctor'}
          color="#3b82f6"
        />
        <DashboardCard
          title="My Appointments"
          value={metrics.appointmentsCount}
          icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          description="Total booking reservations in queue"
          color="#eab308"
        />
        <DashboardCard
          title="My Active Treatments"
          value={metrics.activeTreatments}
          icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"
          description="Medical supervisions under progress"
          color="#10b981"
        />
      </div>

      {/* Profile quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', marginTop: '2.5rem' }}>
        
        {/* Appointments table */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#ffffff' }}>Upcoming Booking Schedules</h3>
          <Table
            headers={['Specialist', 'Date', 'Time Slot', 'Reason', 'Status']}
            data={upcomingApps}
            renderRow={(app) => (
              <tr key={app._id}>
                <td>
                  {app.doctorId ? (
                    <strong style={{ color: '#ffffff' }}>Dr. {app.doctorId.userId?.name}</strong>
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Unassigned</span>
                  )}
                </td>
                <td>{new Date(app.date).toLocaleDateString()}</td>
                <td>{app.time}</td>
                <td>{app.reason}</td>
                <td>
                  <span className={`badge ${app.status === 'approved' ? 'badge-approved' : 'badge-pending'}`}>
                    {app.status}
                  </span>
                </td>
              </tr>
            )}
          />
        </div>

        {/* Medical History summaries */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#ffffff' }}>My Medical Profile</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Age / Gender:</span>
              <p style={{ fontWeight: '500', marginTop: '0.1rem' }}>{profile?.age} Years / <span style={{ textTransform: 'capitalize' }}>{profile?.gender}</span></p>
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Blood Group:</span>
              <p style={{ fontWeight: '500', color: 'var(--primary-hover)', marginTop: '0.1rem' }}>{profile?.bloodGroup}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Contact Address:</span>
              <p style={{ fontWeight: '500', marginTop: '0.1rem' }}>{profile?.address}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Recorded Allergies & History:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.25rem' }}>
                {profile?.medicalHistory?.length > 0 ? (
                  profile.medicalHistory.map((hist, idx) => (
                    <span key={idx} style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      color: 'var(--status-rejected)',
                      fontSize: '0.75rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      fontWeight: '600'
                    }}>{hist}</span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>None recorded</span>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
