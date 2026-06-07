/**
 * Purpose: Authentication React Context
 * Description: Manages user login state, details, API validation checking, 
 * loading states, and exports the useAuth custom hook.
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await authService.getProfile();
        if (res.success) {
          setUser(res.user);
          setProfile(res.profile);
        } else {
          // invalid token
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Failed to verify token on load:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const res = await authService.login(email, password);
      if (res.success) {
        // Fetch full profile details immediately
        const profileRes = await authService.getProfile();
        setUser(profileRes.user);
        setProfile(profileRes.profile);
        
        // Redirect based on role
        if (profileRes.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else if (profileRes.user.role === 'doctor') {
          router.push('/doctor/dashboard');
        } else {
          router.push('/patient/dashboard');
        }
        return { success: true };
      }
      return { success: false, message: res.message || 'Login failed' };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.response?.data?.message || 'Invalid email or password'
      };
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData) => {
    setLoading(true);
    try {
      const res = await authService.register(userData);
      if (res.success) {
        const profileRes = await authService.getProfile();
        setUser(profileRes.user);
        setProfile(profileRes.profile);
        
        // Redirect based on role
        if (profileRes.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else if (profileRes.user.role === 'doctor') {
          router.push('/doctor/dashboard');
        } else {
          router.push('/patient/dashboard');
        }
        return { success: true };
      }
      return { success: false, message: res.message || 'Registration failed' };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setProfile(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        loginUser,
        registerUser,
        logoutUser,
        setProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export default AuthContext;
