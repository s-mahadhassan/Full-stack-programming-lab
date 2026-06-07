/**
 * Purpose: Patient Mobile SMS Mockup Simulator
 * Description: Renders notification streams inside a responsive mockup of a smartphone,
 * and allows triggering test simulations (e.g. mock medication reminders or bookings).
 */

'use client';

import React, { useEffect, useState } from 'react';
import { getNotifications, markAsRead, triggerSimulatedNotification } from '../../../services/notificationService';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';

export default function PatientNotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const res = await getNotifications();
      setNotifications(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load alert notifications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      const res = await markAsRead(id);
      if (res.success) {
        setNotifications(notifications.map(n => n._id === id ? { ...n, status: 'read' } : n));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Triggers simulated events for demonstrations
  const handleSimulate = async (type) => {
    try {
      let title = '';
      let message = '';
      
      if (type === 'medication') {
        title = 'Medication Alert';
        message = 'REMINDER: Please take your prescribed dosage of Cetirizine 10mg (1 tablet) at night. - HLApp';
      } else if (type === 'followup') {
        title = 'Follow-up Reminder';
        message = 'REMINDER: You have a scheduled follow-up consultation with Dr. Shaun Murphy tomorrow at 10:00 AM. - HLApp';
      } else {
        title = 'Appointment Alert';
        message = 'CONFIRMATION: Your consultation slot request has been successfully approved by the specialist. - HLApp';
      }

      const payload = {
        userId: user._id,
        title,
        message,
        type,
        isMobileSent: true
      };

      const res = await triggerSimulatedNotification(payload);
      if (res.success) {
        toast.success(`Simulated ${type} alert sent to device.`);
        loadNotifications();
      }
    } catch (error) {
      console.error(error);
      toast.error('Simulation trigger failed.');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Device Alert Simulator</h2>
        <p style={{ color: 'var(--text-muted)' }}>Simulate real-time mobile SMS alerts and review email dispatch templates</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '2.5rem',
        alignItems: 'flex-start'
      }}>
        
        {/* Simulator controls */}
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1.2rem', color: '#ffffff' }}>Simulation Console</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Trigger simulation events to see how SMS/Mobile alerts are received on the patient's device in real-time. This mimics background scheduler reminders.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button className="btn btn-primary" style={{ justifyContent: 'space-between', padding: '0.8rem 1.2rem' }} onClick={() => handleSimulate('medication')}>
              <span>Simulate Medication Reminder</span>
              <span>&rarr;</span>
            </button>
            <button className="btn btn-primary" style={{ justifyContent: 'space-between', padding: '0.8rem 1.2rem', backgroundColor: 'var(--secondary)' }} onClick={() => handleSimulate('followup')}>
              <span>Simulate Follow-up Reminder</span>
              <span>&rarr;</span>
            </button>
            <button className="btn btn-primary" style={{ justifyContent: 'space-between', padding: '0.8rem 1.2rem', backgroundColor: 'var(--status-pending)', color: '#000000' }} onClick={() => handleSimulate('appointment')}>
              <span>Simulate Appointment Booking Confirmation</span>
              <span>&rarr;</span>
            </button>
          </div>

          <div style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px dashed var(--border-color)',
            fontSize: '0.85rem',
            color: 'var(--text-muted)'
          }}>
            <h4 style={{ color: '#ffffff', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Real-time Delivery Note:</h4>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Email dispatches are logged directly in the Node.js console log.</li>
              <li>SMS alerts are simulated instantly in the phone mockup on the right.</li>
            </ul>
          </div>
        </div>

        {/* Smartphone mockup */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="mobile-simulator-wrapper">
            <div className="mobile-header">
              <span>9:41 AM</span>
              <div className="mobile-speaker"></div>
              <span>HLApp Alert</span>
            </div>
            
            <div className="mobile-simulator-screen">
              {loading ? (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', marginTop: '5rem' }}>
                  Loading device...
                </div>
              ) : notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div 
                    key={notif._id} 
                    className="sms-bubble" 
                    style={{
                      opacity: notif.status === 'read' ? 0.7 : 1,
                      borderLeft: notif.status === 'unread' ? '3px solid var(--primary-hover)' : '1px solid #334155'
                    }}
                    onClick={() => handleMarkAsRead(notif._id)}
                    title={notif.status === 'unread' ? 'Click to mark read' : ''}
                  >
                    <div style={{ fontWeight: '600', fontSize: '0.8rem', color: 'var(--primary-hover)', marginBottom: '0.2rem' }}>
                      {notif.title}
                    </div>
                    <div>{notif.message}</div>
                    <div className="sms-time">
                      {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {notif.status === 'unread' && <span style={{ color: 'var(--status-pending)', marginLeft: '0.5rem' }}>●</span>}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ color: '#475569', fontSize: '0.85rem', textAlign: 'center', marginTop: '10rem', fontStyle: 'italic' }}>
                  No messages in inbox
                </div>
              )}
            </div>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>
            Interactive Device Mockup
          </span>
        </div>

      </div>
    </div>
  );
}
