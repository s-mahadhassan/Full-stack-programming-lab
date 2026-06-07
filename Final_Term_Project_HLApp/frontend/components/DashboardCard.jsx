/**
 * Purpose: Reusable Dashboard Stats Card
 * Description: Displays values, title banners, description notes, and custom SVGs.
 */

import React from 'react';

export default function DashboardCard({ title, value, icon, description, color = 'var(--primary)' }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-muted)' }}>{title}</span>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color
        }}>
          <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
          </svg>
        </div>
      </div>

      <div style={{ fontSize: '2rem', fontWeight: '700', margin: '0.2rem 0' }}>{value}</div>

      {description && (
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{description}</span>
      )}
    </div>
  );
}
