/**
 * Purpose: Authentication API Services
 * Description: Registers endpoints for login, signup, logout, and token-profile queries.
 */

import API from './api';

export const login = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  if (response.data.success && response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const register = async (userData) => {
  const response = await API.post('/auth/register', userData);
  if (response.data.success && response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const getProfile = async () => {
  const response = await API.get('/auth/profile');
  return response.data;
};

export const logout = async () => {
  try {
    await API.post('/auth/logout');
  } catch (error) {
    console.error('Logout error on backend:', error);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
