/**
 * Purpose: Admin Dashboard Screen
 * Description: Retrieves doctors, patients, and appointments totals,
 * presenting cards with hover animations.
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardCard from '../../../components/DashboardCard';
import { getDoctors } from '../../../services/doctorService';
import { getPatients } from '../../../services/patientService';
import { getAppointments } from '../../../services/appointmentService';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
    pendingAppointments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [docsRes, patientsRes, appointmentsRes] = await Promise.all([
          getDoctors(),
          getPatients(),
          getAppointments()
        ]);

        const pendingCount = appointmentsRes.data.filter(app => app.status === 'pending').length;

        setStats({
          doctors: docsRes.count || 0,
          patients: patientsRes.count || 0,
          appointments: appointmentsRes.count || 0,
          pendingAppointments: pendingCount
        });
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
        toast.error('Failed to load dashboard metrics.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div style={{ color: 'var(--primary)', textAlign: 'center', marginTop: '3rem' }}>Loading system metrics...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Administrative Overview</h2>
        <p style={{ color: 'var(--text-muted)' }}>Quick statistics and shortcuts to manage healthcare operations</p>
      </div>

      <div className="dashboard-grid">
        <DashboardCard
          title="Total Specialists"
          value={stats.doctors}
          icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          description="Active doctors registered in the system"
          color="#3b82f6"
        />
        <DashboardCard
          title="Total Patients"
          value={stats.patients}
          icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857"
          description="Patients with active medical history logs"
          color="#10b981"
        />
        <DashboardCard
          title="Bookings Queue"
          value={stats.appointments}
          icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          description={`${stats.pendingAppointments} appointments pending evaluation`}
          color="#eab308"
        />
      </div>

      {/* Admin Fast Actions */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#ffffff' }}>Operational Shortcuts</h3>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <Link href="/admin/doctors" className="btn btn-primary" style={{ textDecoration: 'none', gap: '0.5rem' }}>
            <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Manage Specialists
          </Link>
          
          <Link href="/admin/patients" className="btn btn-secondary" style={{ textDecoration: 'none', gap: '0.5rem' }}>
            <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Manage Patient Profiles
          </Link>

          <Link href="/admin/appointments" className="btn btn-secondary" style={{ textDecoration: 'none', gap: '0.5rem' }}>
            <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            View Bookings Queue
          </Link>
        </div>
      </div>
    </div>
  );
}
