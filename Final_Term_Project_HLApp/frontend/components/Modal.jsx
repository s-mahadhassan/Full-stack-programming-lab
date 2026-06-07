/**
 * Purpose: Reusable Overlay Modal Component
 * Description: Renders background blur overlays, header banners, form bodies,
 * and dismiss triggers.
 */

'use client';

import React, { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative' }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#ffffff' }}>{title}</h3>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.2rem',
              transition: 'var(--transition-fast)'
            }}
            onMouseOver={(e) => e.target.style.color = '#ffffff'}
            onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
          >
            &times;
          </button>
        </div>

        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
