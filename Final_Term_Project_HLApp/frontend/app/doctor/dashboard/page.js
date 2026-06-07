/**
 * Purpose: Doctor Dashboard Panel
 * Description: Displays clinical metrics (Assigned Patients, Appointments, Active Treatments),
 * and lists today's scheduled appointments for the logged-in doctor.
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardCard from '../../../components/DashboardCard';
import Table from '../../../components/Table';
import { getAppointments } from '../../../services/appointmentService';
import { getTreatments } from '../../../services/treatmentService';
import { toast } from 'react-toastify';

export default function DoctorDashboard() {
  const [metrics, setMetrics] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    activeTreatments: 0
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

        // Count unique patients assigned from appointments & treatments
        const uniquePatients = new Set(apps.map(a => a.patientId?._id));
        const pendingCount = apps.filter(a => a.status === 'pending').length;
        const activeTreatsCount = treats.filter(t => t.treatmentStatus === 'active').length;

        setMetrics({
          totalPatients: uniquePatients.size || 0,
          totalAppointments: apps.length || 0,
          pendingAppointments: pendingCount,
          activeTreatments: activeTreatsCount
        });

        // Filter out today's upcoming approved appointments
        setUpcomingApps(apps.filter(a => a.status === 'approved').slice(0, 5));
      } catch (error) {
        console.error(error);
        toast.error('Failed to load clinic statistics.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return <div style={{ color: 'var(--primary)', textAlign: 'center', marginTop: '3rem' }}>Loading clinical metrics...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Clinical Workspace</h2>
        <p style={{ color: 'var(--text-muted)' }}>Overview of your clinical patients, appointments, and active treatments</p>
      </div>

      <div className="dashboard-grid">
        <DashboardCard
          title="Assigned Patients"
          value={metrics.totalPatients}
          icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857"
          description="Patients under your care"
          color="#3b82f6"
        />
        <DashboardCard
          title="My Appointments"
          value={metrics.totalAppointments}
          icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          description={`${metrics.pendingAppointments} pending your approval`}
          color="#eab308"
        />
        <DashboardCard
          title="Active Treatments"
          value={metrics.activeTreatments}
          icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"
          description="Patients currently in treatment plans"
          color="#10b981"
        />
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#ffffff' }}>Upcoming Approved Consultations</h3>
        
        <Table
          headers={['Patient', 'Age/Gender', 'Date', 'Time Slot', 'Reason', 'Actions']}
          data={upcomingApps}
          renderRow={(app) => (
            <tr key={app._id}>
              <td><strong style={{ color: '#ffffff' }}>{app.patientId?.userId?.name || 'Unknown'}</strong></td>
              <td>{app.patientId?.age} / {app.patientId?.gender}</td>
              <td>{new Date(app.date).toLocaleDateString()}</td>
              <td>{app.time}</td>
              <td>{app.reason}</td>
              <td>
                <Link href="/doctor/treatments" className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', textDecoration: 'none' }}>
                  Manage Lifecycle
                </Link>
              </td>
            </tr>
          )}
        />
      </div>
    </div>
  );
}
