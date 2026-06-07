/**
 * Purpose: Login Page Component
 * Description: Renders email/password inputs, processes forms through useAuth,
 * and triggers interactive success/error toast alerts.
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import FormInput from '../../../components/FormInput';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const { loginUser, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(formData.email, formData.password);
    if (result.success) {
      toast.success('Signed in successfully! Welcome back.');
    } else {
      toast.error(result.message || 'Failed to sign in. Please verify your credentials.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'radial-gradient(circle at center, #1f2937 0%, #0b0f19 100%)'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--primary)' }}>HLApp Login</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.4rem' }}>
            Enter your credentials to access your portal
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. admin@hlapp.com"
            required
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.8rem', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
          <Link href="/register" style={{ color: 'var(--primary-hover)', fontWeight: '500', textDecoration: 'none' }}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
