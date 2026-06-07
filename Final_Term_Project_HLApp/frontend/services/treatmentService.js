/**
 * Purpose: Treatment Lifecycle Resource API Services
 * Description: Interfaces treatment plans, physical checkups, follow-up logs, and updates.
 */

import API from './api';

export const getTreatments = async () => {
  const response = await API.get('/treatments');
  return response.data;
};

export const getTreatmentById = async (id) => {
  const response = await API.get(`/treatments/${id}`);
  return response.data;
};

export const createTreatment = async (treatmentData) => {
  const response = await API.post('/treatments', treatmentData);
  return response.data;
};

export const updateTreatment = async (id, treatmentData) => {
  const response = await API.put(`/treatments/${id}`, treatmentData);
  return response.data;
};

export const deleteTreatment = async (id) => {
  const response = await API.delete(`/treatments/${id}`);
  return response.data;
};
