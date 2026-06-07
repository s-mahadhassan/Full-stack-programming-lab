/**
 * Purpose: Registration Page Component
 * Description: Renders generic auth inputs alongside role selection.
 * Dynamically displays profile configurations for Doctor/Patient and invokes useAuth registers.
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import FormInput from '../../../components/FormInput';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const { registerUser, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    
    // Doctor specific fields
    specialization: '',
    experience: '',
    department: '',
    phone: '',
    fees: '',
    
    // Patient specific fields
    age: '',
    gender: 'male',
    bloodGroup: 'A+',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    // Prepare register object based on role
    const registrationData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    };

    if (formData.role === 'doctor') {
      registrationData.specialization = formData.specialization;
      registrationData.experience = Number(formData.experience);
      registrationData.department = formData.department;
      registrationData.phone = formData.phone;
      registrationData.fees = Number(formData.fees);
    } else if (formData.role === 'patient') {
      registrationData.age = Number(formData.age);
      registrationData.gender = formData.gender;
      registrationData.bloodGroup = formData.bloodGroup;
      registrationData.address = formData.address;
    }

    const result = await registerUser(registrationData);
    if (result.success) {
      toast.success('Registration successful! Account generated.');
    } else {
      toast.error(result.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 2rem',
      background: 'radial-gradient(circle at center, #1f2937 0%, #0b0f19 100%)'
    }}>
      <div style={{
        maxWidth: '550px',
        width: '100%',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--primary)' }}>Create HLApp Account</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.4rem' }}>
            Register your login credentials and medical profile
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* General Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FormInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              required
            />
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. user@hlapp.com"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FormInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min 6 chars"
              required
            />
            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat password"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="role">Account Role</label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
              style={{ width: '100%' }}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">System Admin</option>
            </select>
          </div>

          {/* Conditional Doctor Fields */}
          {formData.role === 'doctor' && (
            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px dashed var(--border-color)'
            }}>
              <h4 style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>Doctor Profile Details</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormInput
                  label="Specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="e.g. Cardiology"
                  required
                />
                <FormInput
                  label="Experience (Years)"
                  name="experience"
                  type="number"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 10"
                  min="0"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormInput
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g. Cardio Center"
                  required
                />
                <FormInput
                  label="Consultation Fee ($)"
                  name="fees"
                  type="number"
                  value={formData.fees}
                  onChange={handleChange}
                  placeholder="e.g. 150"
                  min="0"
                  required
                />
              </div>

              <FormInput
                label="Contact Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +92-333-1234567"
                required
              />
            </div>
          )}

          {/* Conditional Patient Fields */}
          {formData.role === 'patient' && (
            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px dashed var(--border-color)'
            }}>
              <h4 style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>Patient Profile Details</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormInput
                  label="Age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g. 25"
                  min="0"
                  required
                />
                
                <div className="form-group">
                  <label className="form-label" htmlFor="gender">Gender</label>
                  <select
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-input"
                    style={{ width: '100%' }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="bloodGroup">Blood Group</label>
                <select
                  name="bloodGroup"
                  id="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="form-input"
                  style={{ width: '100%' }}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <FormInput
                label="Home Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. Street 10, Cityville"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.8rem', marginTop: '1.5rem' }}
            disabled={loading}
          >
            {loading ? 'Processing Registration...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Already registered? </span>
          <Link href="/login" style={{ color: 'var(--primary-hover)', fontWeight: '500', textDecoration: 'none' }}>
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
