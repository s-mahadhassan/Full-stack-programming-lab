/**
 * Purpose: Patient Resource API Services
 * Description: Interfaces CRUD actions for Patient records.
 */

import API from './api';

export const getPatients = async () => {
  const response = await API.get('/patients');
  return response.data;
};

export const getPatientById = async (id) => {
  const response = await API.get(`/patients/${id}`);
  return response.data;
};

export const createPatient = async (patientData) => {
  const response = await API.post('/patients', patientData);
  return response.data;
};

export const updatePatient = async (id, patientData) => {
  const response = await API.put(`/patients/${id}`, patientData);
  return response.data;
};

export const deletePatient = async (id) => {
  const response = await API.delete(`/patients/${id}`);
  return response.data;
};
