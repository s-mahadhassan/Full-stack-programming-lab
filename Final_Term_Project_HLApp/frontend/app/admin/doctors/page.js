/**
 * Purpose: Admin Doctors Panel
 * Description: Renders the Doctors management system grid with CRUD capabilities
 * (creation, listings, updates, deletion) inside overlay modals and hooks up API actions.
 */

'use client';

import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import FormInput from '../../../components/FormInput';
import { getDoctors, createDoctor, updateDoctor, deleteDoctor } from '../../../services/doctorService';
import { toast } from 'react-toastify';

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modals status
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    experience: '',
    department: '',
    phone: '',
    fees: '',
    status: 'active'
  });
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const fetchDoctorsList = async () => {
    setLoading(true);
    try {
      const res = await getDoctors();
      setDoctors(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load doctors catalog.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorsList();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openCreateModal = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      specialization: '',
      experience: '',
      department: '',
      phone: '',
      fees: '',
      status: 'active'
    });
    setIsCreateOpen(true);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password || 'doctorpassword123',
        specialization: formData.specialization,
        experience: Number(formData.experience),
        department: formData.department,
        phone: formData.phone,
        fees: Number(formData.fees)
      };

      const res = await createDoctor(payload);
      if (res.success) {
        toast.success('Doctor registered successfully.');
        setIsCreateOpen(false);
        fetchDoctorsList();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to register doctor.');
    }
  };

  const openEditModal = (doc) => {
    setSelectedDoctorId(doc._id);
    setFormData({
      name: doc.userId?.name || '',
      email: doc.userId?.email || '',
      password: '', // do not display password
      specialization: doc.specialization,
      experience: doc.experience,
      department: doc.department,
      phone: doc.phone,
      fees: doc.fees,
      status: doc.status || 'active'
    });
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        specialization: formData.specialization,
        experience: Number(formData.experience),
        department: formData.department,
        phone: formData.phone,
        fees: Number(formData.fees),
        status: formData.status
      };

      const res = await updateDoctor(selectedDoctorId, payload);
      if (res.success) {
        toast.success('Doctor profile updated successfully.');
        setIsEditOpen(false);
        fetchDoctorsList();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to update doctor profile.');
    }
  };

  const openDeleteModal = (id) => {
    setSelectedDoctorId(id);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await deleteDoctor(selectedDoctorId);
      if (res.success) {
        toast.success('Doctor and user account deleted successfully.');
        setIsDeleteOpen(false);
        fetchDoctorsList();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete doctor account.');
    }
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Manage Specialists</h2>
          <p style={{ color: 'var(--text-muted)' }}>Create, edit, view, and delete doctor profiles</p>
        </div>
        <button className="btn btn-primary" onClick={openCreateModal}>
          + Register Doctor
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--primary)' }}>Retrieving specialists logs...</div>
      ) : (
        <Table
          headers={['Name', 'Email', 'Specialization', 'Department', 'Phone', 'Fees', 'Status', 'Actions']}
          data={doctors}
          renderRow={(doc) => (
            <tr key={doc._id}>
              <td><strong style={{ color: '#ffffff' }}>{doc.userId?.name || 'N/A'}</strong></td>
              <td>{doc.userId?.email || 'N/A'}</td>
              <td>{doc.specialization}</td>
              <td>{doc.department}</td>
              <td>{doc.phone}</td>
              <td>${doc.fees}</td>
              <td>
                <span className={`badge ${doc.status === 'active' ? 'badge-completed' : 'badge-rejected'}`}>
                  {doc.status}
                </span>
              </td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="btn btn-secondary" 
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                    onClick={() => openEditModal(doc)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger" 
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                    onClick={() => openDeleteModal(doc._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          )}
        />
      )}

      {/* Register Modal */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Register New Doctor">
        <form onSubmit={handleCreateSubmit}>
          <FormInput label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
          <FormInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <FormInput label="Password (Default is doctorpassword123)" name="password" type="password" value={formData.password} onChange={handleChange} />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FormInput label="Specialization" name="specialization" value={formData.specialization} onChange={handleChange} required />
            <FormInput label="Experience (Years)" name="experience" type="number" value={formData.experience} onChange={handleChange} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FormInput label="Department" name="department" value={formData.department} onChange={handleChange} required />
            <FormInput label="Consultation Fee ($)" name="fees" type="number" value={formData.fees} onChange={handleChange} required />
          </div>

          <FormInput label="Contact Phone" name="phone" value={formData.phone} onChange={handleChange} required />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsCreateOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Doctor</button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Doctor Profile">
        <form onSubmit={handleEditSubmit}>
          <FormInput label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
          <FormInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FormInput label="Specialization" name="specialization" value={formData.specialization} onChange={handleChange} required />
            <FormInput label="Experience (Years)" name="experience" type="number" value={formData.experience} onChange={handleChange} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FormInput label="Department" name="department" value={formData.department} onChange={handleChange} required />
            <FormInput label="Consultation Fee ($)" name="fees" type="number" value={formData.fees} onChange={handleChange} required />
          </div>

          <FormInput label="Contact Phone" name="phone" value={formData.phone} onChange={handleChange} required />

          <div className="form-group">
            <label className="form-label" htmlFor="status">Availability Status</label>
            <select name="status" id="status" value={formData.status} onChange={handleChange} className="form-input" style={{ width: '100%' }}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsEditOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Update Profile</button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete Doctor Account">
        <div style={{ padding: '0.5rem 0' }}>
          <p style={{ color: 'var(--text-main)', marginBottom: '1.5rem' }}>
            Are you sure you want to permanently delete this doctor account? This action will delete their profile and associated User login credentials.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button className="btn btn-secondary" onClick={() => setIsDeleteOpen(false)}>Cancel</button>
            <button className="btn btn-danger" onClick={handleDeleteConfirm}>Yes, Delete Account</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
