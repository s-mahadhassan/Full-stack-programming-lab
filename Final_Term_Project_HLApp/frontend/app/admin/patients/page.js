/**
 * Purpose: Admin Patients Panel
 * Description: Displays patient lists, registers new patients, updates medical/contact details,
 * assigns doctors from a select dropdown, and performs deletions.
 */

'use client';

import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import FormInput from '../../../components/FormInput';
import { getPatients, createPatient, updatePatient, deletePatient } from '../../../services/patientService';
import { getDoctors } from '../../../services/doctorService';
import { toast } from 'react-toastify';

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState([]);
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
    age: '',
    gender: 'male',
    bloodGroup: 'A+',
    address: '',
    medicalHistory: '',
    assignedDoctor: ''
  });
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const loadPageData = async () => {
    setLoading(true);
    try {
      const [patientsRes, doctorsRes] = await Promise.all([
        getPatients(),
        getDoctors()
      ]);
      setPatients(patientsRes.data || []);
      setDoctors(doctorsRes.data || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load patient or doctor datasets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPageData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openCreateModal = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      age: '',
      gender: 'male',
      bloodGroup: 'A+',
      address: '',
      medicalHistory: '',
      assignedDoctor: ''
    });
    setIsCreateOpen(true);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password || 'patientpassword123',
        age: Number(formData.age),
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        address: formData.address,
        medicalHistory: formData.medicalHistory ? formData.medicalHistory.split(',').map(h => h.trim()) : [],
        assignedDoctor: formData.assignedDoctor || null
      };

      const res = await createPatient(payload);
      if (res.success) {
        toast.success('Patient profile created successfully.');
        setIsCreateOpen(false);
        loadPageData();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to create patient account.');
    }
  };

  const openEditModal = (pat) => {
    setSelectedPatientId(pat._id);
    setFormData({
      name: pat.userId?.name || '',
      email: pat.userId?.email || '',
      password: '', // do not display
      age: pat.age,
      gender: pat.gender,
      bloodGroup: pat.bloodGroup,
      address: pat.address,
      medicalHistory: pat.medicalHistory ? pat.medicalHistory.join(', ') : '',
      assignedDoctor: pat.assignedDoctor?._id || ''
    });
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        age: Number(formData.age),
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        address: formData.address,
        medicalHistory: formData.medicalHistory ? formData.medicalHistory.split(',').map(h => h.trim()) : [],
        assignedDoctor: formData.assignedDoctor || null
      };

      const res = await updatePatient(selectedPatientId, payload);
      if (res.success) {
        toast.success('Patient details updated successfully.');
        setIsEditOpen(false);
        loadPageData();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to update patient profile.');
    }
  };

  const openDeleteModal = (id) => {
    setSelectedPatientId(id);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await deletePatient(selectedPatientId);
      if (res.success) {
        toast.success('Patient profile and user credentials deleted.');
        setIsDeleteOpen(false);
        loadPageData();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete patient account.');
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Manage Patient Profiles</h2>
          <p style={{ color: 'var(--text-muted)' }}>Create, edit, view medical logs, and delete patient records</p>
        </div>
        <button className="btn btn-primary" onClick={openCreateModal}>
          + Register Patient
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--primary)' }}>Retrieving patient database logs...</div>
      ) : (
        <Table
          headers={['Name', 'Email', 'Age/Gender', 'Blood Group', 'Address', 'Assigned Doctor', 'Actions']}
          data={patients}
          renderRow={(pat) => (
            <tr key={pat._id}>
              <td><strong style={{ color: '#ffffff' }}>{pat.userId?.name || 'N/A'}</strong></td>
              <td>{pat.userId?.email || 'N/A'}</td>
              <td>{pat.age} / <span style={{ textTransform: 'capitalize' }}>{pat.gender}</span></td>
              <td><span style={{ color: 'var(--primary-hover)', fontWeight: 'bold' }}>{pat.bloodGroup}</span></td>
              <td>{pat.address}</td>
              <td>
                {pat.assignedDoctor?.userId?.name ? (
                  <span style={{ color: 'var(--secondary)', fontWeight: '500' }}>
                    Dr. {pat.assignedDoctor.userId.name} ({pat.assignedDoctor.specialization})
                  </span>
                ) : (
                  <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Unassigned</span>
                )}
              </td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="btn btn-secondary" 
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                    onClick={() => openEditModal(pat)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger" 
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                    onClick={() => openDeleteModal(pat._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          )}
        />
      )}

      {/* Register Patient Modal */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Register Patient Profile">
        <form onSubmit={handleCreateSubmit}>
          <FormInput label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
          <FormInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <FormInput label="Password (Default is patientpassword123)" name="password" type="password" value={formData.password} onChange={handleChange} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FormInput label="Age" name="age" type="number" value={formData.age} onChange={handleChange} required />
            <div className="form-group">
              <label className="form-label" htmlFor="gender">Gender</label>
              <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className="form-input" style={{ width: '100%' }}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="bloodGroup">Blood Group</label>
              <select name="bloodGroup" id="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="form-input" style={{ width: '100%' }}>
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
            
            <div className="form-group">
              <label className="form-label" htmlFor="assignedDoctor">Assign Doctor</label>
              <select name="assignedDoctor" id="assignedDoctor" value={formData.assignedDoctor} onChange={handleChange} className="form-input" style={{ width: '100%' }}>
                <option value="">-- No Assigned Doctor --</option>
                {doctors.map(doc => (
                  <option key={doc._id} value={doc._id}>
                    Dr. {doc.userId?.name || 'Unknown'} ({doc.specialization})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <FormInput label="Address" name="address" value={formData.address} onChange={handleChange} required />
          <FormInput label="Medical History Notes (comma separated)" name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} placeholder="e.g. Hypertension, Asthma" />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsCreateOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Patient</button>
          </div>
        </form>
      </Modal>

      {/* Edit Patient Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Patient Profile">
        <form onSubmit={handleEditSubmit}>
          <FormInput label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
          <FormInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FormInput label="Age" name="age" type="number" value={formData.age} onChange={handleChange} required />
            <div className="form-group">
              <label className="form-label" htmlFor="gender">Gender</label>
              <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className="form-input" style={{ width: '100%' }}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="bloodGroup">Blood Group</label>
              <select name="bloodGroup" id="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="form-input" style={{ width: '100%' }}>
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

            <div className="form-group">
              <label className="form-label" htmlFor="assignedDoctor">Assign Doctor</label>
              <select name="assignedDoctor" id="assignedDoctor" value={formData.assignedDoctor} onChange={handleChange} className="form-input" style={{ width: '100%' }}>
                <option value="">-- No Assigned Doctor --</option>
                {doctors.map(doc => (
                  <option key={doc._id} value={doc._id}>
                    Dr. {doc.userId?.name || 'Unknown'} ({doc.specialization})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <FormInput label="Address" name="address" value={formData.address} onChange={handleChange} required />
          <FormInput label="Medical History Notes (comma separated)" name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsEditOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Update Profile</button>
          </div>
        </form>
      </Modal>

      {/* Delete Patient Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete Patient Record">
        <div style={{ padding: '0.5rem 0' }}>
          <p style={{ color: 'var(--text-main)', marginBottom: '1.5rem' }}>
            Are you sure you want to permanently delete this patient record? This action will remove their medical log and associated User login credentials.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button className="btn btn-secondary" onClick={() => setIsDeleteOpen(false)}>Cancel</button>
            <button className="btn btn-danger" onClick={handleDeleteConfirm}>Yes, Delete Profile</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
