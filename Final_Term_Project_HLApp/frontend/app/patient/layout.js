/**
 * Purpose: Patient Layout Protection & Skeleton
 * Description: Restricts all subroutes to 'patient' role, and mounts Sidebar + Header layouts.
 */

'use client';

import RouteGuard from '../../middleware/routeGuard';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { ToastContainer } from 'react-toastify';

export default function PatientLayout({ children }) {
  return (
    <RouteGuard allowedRoles={['patient']}>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Header />
          <div style={{ flex: 1 }}>
            {children}
          </div>
        </main>
      </div>
    </RouteGuard>
  );
}
