/**
 * Purpose: Prescription Resource API Services
 * Description: Interfaces CRUD actions for patient prescriptions.
 */

import API from './api';

export const getPrescriptions = async () => {
  const response = await API.get('/prescriptions');
  return response.data;
};

export const getPrescriptionById = async (id) => {
  const response = await API.get(`/prescriptions/${id}`);
  return response.data;
};

export const createPrescription = async (prescriptionData) => {
  const response = await API.post('/prescriptions', prescriptionData);
  return response.data;
};

export const updatePrescription = async (id, prescriptionData) => {
  const response = await API.put(`/prescriptions/${id}`, prescriptionData);
  return response.data;
};

export const deletePrescription = async (id) => {
  const response = await API.delete(`/prescriptions/${id}`);
  return response.data;
};
