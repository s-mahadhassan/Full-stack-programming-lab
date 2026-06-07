/**
 * Purpose: Main Root Layout Component
 * Description: Registers SEO metadata, imports font families, wraps pages
 * in the AuthProvider state context, and registers Toastify containers.
 */

import { AuthProvider } from '../context/AuthContext';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'HLApp - Secure Healthcare Management System',
  description: 'Manage patient profiles, doctor assignments, medical prescriptions, and tracking appointment treatments in a secure system.',
  keywords: 'healthcare, medical system, patient records, doctor CRUD, next.js'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <AuthProvider>
          {children}
          <ToastContainer theme="dark" position="top-right" autoClose={3000} />
        </AuthProvider>
      </body>
    </html>
  );
}
