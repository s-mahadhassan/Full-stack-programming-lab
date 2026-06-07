/**
 * Purpose: Doctor Resource API Services
 * Description: Interfaces CRUD actions for Doctor profiles.
 */

import API from './api';

export const getDoctors = async () => {
  const response = await API.get('/doctors');
  return response.data;
};

export const getDoctorById = async (id) => {
  const response = await API.get(`/doctors/${id}`);
  return response.data;
};

export const createDoctor = async (doctorData) => {
  const response = await API.post('/doctors', doctorData);
  return response.data;
};

export const updateDoctor = async (id, doctorData) => {
  const response = await API.put(`/doctors/${id}`, doctorData);
  return response.data;
};

export const deleteDoctor = async (id) => {
  const response = await API.delete(`/doctors/${id}`);
  return response.data;
};
