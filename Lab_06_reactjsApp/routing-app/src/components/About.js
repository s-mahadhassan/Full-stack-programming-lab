import React from 'react';

const About = () => {
  return (
    <div className="page-wrapper about-page fade-in">
      <div className="about-header">
        <span className="section-badge">Our Legacy</span>
        <h1 className="page-title">Who We Are</h1>
        <p className="page-subtitle">We merge cutting-edge technology and human intuition to design flawless systems.</p>
      </div>

      <div className="about-grid">
        <div className="about-block">
          <h3>Core Objective</h3>
          <p>
            Established in 2020, CoreTech serves as a premium architectural firm committed to developing high-performance React frontends, robust servers, and clean designs that simplify workspace complexities.
          </p>
        </div>
        <div className="about-block">
          <h3>Vision statement</h3>
          <p>
            To establish a seamless standard where frontend interaction structures work perfectly in synchronization with data models, removing delays and establishing fluid, real-time reactive rendering interfaces globally.
          </p>
        </div>
      </div>

      <div className="stats-strip">
        <div className="stat-item">
          <h4>25M+</h4>
          <span>Global Users</span>
        </div>
        <div className="stat-item">
          <h4>99.9%</h4>
          <span>Guaranteed Uptime</span>
        </div>
        <div className="stat-item">
          <h4>150+</h4>
          <span>Expert Engineers</span>
        </div>
      </div>
    </div>
  );
};

export default About;