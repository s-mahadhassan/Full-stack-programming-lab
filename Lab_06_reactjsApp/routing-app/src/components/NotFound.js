import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page-wrapper not-found-page fade-in">
      <div className="error-card">
        <h1 className="error-code">404</h1>
        <div className="error-divider"></div>
        <h2 className="error-title">Target Routed Path Missing</h2>
        <p className="error-text">
          The requested system node could not be resolved. It may have been relocated, offline, or temporary down.
        </p>
        <Link to="/" className="error-btn">
          Return to Safety
        </Link>
      </div>
    </div>
  );
};

export default NotFound;