/**
 * Purpose: Application Landing/Splash Screen
 * Description: Renders the public greeting page, detailing features, 
 * and listing navigation entries to Login and Register panels.
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // If already logged in, show dashboard shortcut
  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'doctor') return '/doctor/dashboard';
    return '/patient/dashboard';
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      background: 'radial-gradient(circle at center, #ffffff 0%, #f1f5f9 100%)',
      textAlign: 'center'
    }}>
      {/* Visual Accent Circle */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'rgba(220, 38, 38, 0.05)',
        filter: 'blur(60px)',
        zIndex: 0
      }} />

      <main style={{ zIndex: 1, maxWidth: '600px', width: '100%' }}>
        {/* Healthcare Logo Graphic */}
        <div style={{
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
          border: '1px solid rgba(220, 38, 38, 0.2)',
          borderRadius: '24px',
          width: '72px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary)',
          margin: '0 auto 1.5rem',
          animation: 'pulseLogo 2s infinite'
        }}>
          <svg style={{ width: '40px', height: '40px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 10.5V20a2 2 0 01-2 2H7a2 2 0 01-2-2v-9.5m14 0a2 2 0 00-2-2h-2M5 10.5a2 2 0 012-2h2m-4 4h14m-3-4v-3a2 2 0 00-2-2h-3a2 2 0 00-2 2v3m-6 0h12" />
          </svg>
        </div>

        <h1 style={{
          fontSize: '3rem',
          fontWeight: '700',
          marginBottom: '1rem',
          letterSpacing: '-0.025em',
          lineHeight: '1.2'
        }}>
          Secure Healthcare <br />
          <span style={{
            background: 'linear-gradient(to right, var(--primary), var(--secondary))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>Management System</span>
        </h1>

        <p style={{
          color: 'var(--text-muted)',
          fontSize: '1.1rem',
          lineHeight: '1.6',
          marginBottom: '2.5rem'
        }}>
          A complete solution for patient CRUD records, doctor assignments, medical prescriptions, appointment bookings, and treatment lifecycle tracking.
        </p>

        {loading ? (
          <div style={{ color: 'var(--primary)', fontWeight: '500' }}>Checking authentication state...</div>
        ) : user ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <p style={{ color: 'var(--text-muted)' }}>Signed in as <strong style={{ color: 'var(--text-main)' }}>{user.name}</strong> ({user.role})</p>
            <Link href={getDashboardPath()} className="btn btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1.05rem' }}>
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <Link href="/login" className="btn btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1.05rem', textDecoration: 'none' }}>
              Login to Account
            </Link>
            <Link href="/register" className="btn btn-secondary" style={{ padding: '0.8rem 2rem', fontSize: '1.05rem', textDecoration: 'none' }}>
              Create Account
            </Link>
          </div>
        )}
      </main>

      <footer style={{
        marginTop: '5rem',
        color: '#4b5563',
        fontSize: '0.85rem'
      }}>
        &copy; {new Date().getFullYear()} HLApp Healthcare. Built with Next.js & Express.
      </footer>

      <style jsx global>{`
        @keyframes pulseLogo {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.2); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(220, 38, 38, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
        }
      `}</style>
    </div>
  );
}
