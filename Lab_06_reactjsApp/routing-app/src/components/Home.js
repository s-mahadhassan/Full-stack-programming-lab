import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page-wrapper home-page fade-in">
      <div className="hero-section">
        <span className="section-badge">Welcome to the Future</span>
        <h1 className="hero-title">Next-Gen Software Development</h1>
        <p className="hero-subtitle">
          Made by Mahad Hassan - 232053
        </p>
        <div className="hero-actions">
          <Link to="/products" className="hero-btn primary-btn">Explore Products</Link>
          <Link to="/about" className="hero-btn secondary-btn">Our Mission</Link>
        </div>
      </div>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>Encrypted Core</h3>
          <p>End-to-end protected database relays guaranteeing 100% integrity.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Ultra-Fast</h3>
          <p>Optimized compiled runtime execution speeds with zero network overhead.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🤝</div>
          <h3>Enterprise Ready</h3>
          <p>Tailored custom architecture solutions ready to scale dynamically.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;