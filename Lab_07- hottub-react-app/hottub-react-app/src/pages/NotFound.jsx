import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="w-100 p-5 bg-white border rounded text-center my-4 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '400px' }}>
      <div className="mb-4 text-danger">
        <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '80px' }}></i>
      </div>
      <h1 className="display-4 fw-bold text-dark mb-2">404</h1>
      <h3 className="fw-semibold text-muted mb-3">Spa Route Not Found</h3>
      <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '500px' }}>
        The luxury spa page you are looking for does not exist, has been removed, or is temporarily out of service. Let's return you back to our high pressure premium showroom!
      </p>
      <Link 
        to="/" 
        className="btn-red py-2 px-4 text-decoration-none fw-bold"
        style={{ letterSpacing: '0.5px' }}
      >
        RETURN TO SHOWROOM
      </Link>
    </div>
  );
}
