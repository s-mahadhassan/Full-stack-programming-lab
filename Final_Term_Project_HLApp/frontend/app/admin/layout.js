/**
 * Purpose: Admin Layout Protection & Skeleton
 * Description: Restricts all subroutes to 'admin' role, and mounts Sidebar + Header layouts.
 */

'use client';

import RouteGuard from '../../middleware/routeGuard';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { ToastContainer } from 'react-toastify';

export default function AdminLayout({ children }) {
  return (
    <RouteGuard allowedRoles={['admin']}>
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
