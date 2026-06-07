/**
 * Purpose: Notification Resource API Services
 * Description: Interfaces retrieval, mark as read, and manual simulation triggers.
 */

import API from './api';

export const getNotifications = async () => {
  const response = await API.get('/notifications');
  return response.data;
};

export const markAsRead = async (id) => {
  const response = await API.put(`/notifications/${id}/read`);
  return response.data;
};

export const triggerSimulatedNotification = async (notificationData) => {
  const response = await API.post('/notifications', notificationData);
  return response.data;
};
