/**
 * Purpose: Reusable Sidebar Navigation
 * Description: Renders role-specific nav links and provides the logout hook.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user, logoutUser } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  // Define links based on user role
  const getLinks = () => {
    switch (user.role) {
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
          { name: 'Doctors', path: '/admin/doctors', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
          { name: 'Patients', path: '/admin/patients', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
          { name: 'Appointments', path: '/admin/appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' }
        ];
      case 'doctor':
        return [
          { name: 'Dashboard', path: '/doctor/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
          { name: 'Appointments', path: '/doctor/appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
          { name: 'Treatments', path: '/doctor/treatments', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
          { name: 'Prescriptions', path: '/doctor/prescriptions', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
        ];
      case 'patient':
        return [
          { name: 'Dashboard', path: '/patient/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
          { name: 'Appointments', path: '/patient/appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
          { name: 'My Treatments', path: '/patient/treatments', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
          { name: 'My Prescriptions', path: '/patient/prescriptions', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
          { name: 'Simulated SMS', path: '/patient/notifications', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' }
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <div className="sidebar">
      <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
        <h2 style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.4rem' }}>
          <svg style={{ width: '28px', height: '28px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 10.5V20a2 2 0 01-2 2H7a2 2 0 01-2-2v-9.5m14 0a2 2 0 00-2-2h-2M5 10.5a2 2 0 012-2h2m-4 4h14m-3-4v-3a2 2 0 00-2-2h-3a2 2 0 00-2 2v3m-6 0h12" />
          </svg>
          HLApp
        </h2>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        {links.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.8rem 1rem',
                borderRadius: '8px',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'var(--transition-fast)'
              }}
              className={isActive ? '' : 'sidebar-link-hover'}
            >
              <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon} />
              </svg>
              {link.name}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logoutUser}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.8rem 1rem',
          borderRadius: '8px',
          color: '#f87171',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '500',
          textAlign: 'left',
          width: '100%',
          marginTop: 'auto',
          transition: 'var(--transition-fast)'
        }}
      >
        <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Sign Out
      </button>

      <style jsx global>{`
        .sidebar-link-hover:hover {
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--text-main) !important;
        }
      `}</style>
    </div>
  );
}
