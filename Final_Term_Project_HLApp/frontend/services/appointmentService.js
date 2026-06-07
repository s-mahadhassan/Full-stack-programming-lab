/**
 * Purpose: Appointment Resource API Services
 * Description: Interfaces booking, updates, status changes, and cancellations.
 */

import API from './api';

export const getAppointments = async () => {
  const response = await API.get('/appointments');
  return response.data;
};

export const getAppointmentById = async (id) => {
  const response = await API.get(`/appointments/${id}`);
  return response.data;
};

export const bookAppointment = async (appointmentData) => {
  const response = await API.post('/appointments', appointmentData);
  return response.data;
};

export const updateAppointmentStatus = async (id, statusData) => {
  const response = await API.put(`/appointments/${id}/status`, statusData);
  return response.data;
};

export const updateAppointment = async (id, appointmentData) => {
  const response = await API.put(`/appointments/${id}`, appointmentData);
  return response.data;
};

export const deleteAppointment = async (id) => {
  const response = await API.delete(`/appointments/${id}`);
  return response.data;
};
