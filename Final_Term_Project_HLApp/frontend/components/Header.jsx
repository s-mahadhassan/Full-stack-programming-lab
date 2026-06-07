/**
 * Purpose: Reusable Application Header
 * Description: Renders greeting banners, role indicators, dates, and account tags.
 */

'use client';

import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user } = useAuth();

  if (!user) return null;

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'doctor': return 'Medical Doctor';
      case 'patient': return 'Registered Patient';
      default: return 'User';
    }
  };

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'admin': return { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
      case 'doctor': return { backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' };
      case 'patient': return { backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' };
      default: return { backgroundColor: 'rgba(156, 163, 175, 0.1)', color: '#9ca3af' };
    }
  };

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 0',
      marginBottom: '2rem',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: '600' }}>
          Welcome back, <span style={{ color: 'var(--primary)' }}>{user.name}</span>
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}>
          <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{user.name}</span>
          <span style={{
            fontSize: '0.75rem',
            padding: '0.2rem 0.5rem',
            borderRadius: '4px',
            marginTop: '0.25rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            ...getRoleBadgeStyle(user.role)
          }}>
            {getRoleLabel(user.role)}
          </span>
        </div>
        
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid var(--primary)',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#ffffff'
        }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
