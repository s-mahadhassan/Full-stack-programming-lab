import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="page-wrapper contact-page fade-in">
      <div className="contact-header">
        <span className="section-badge">Get in Touch</span>
        <h1 className="page-title">Contact Support</h1>
        <p className="page-subtitle">Send your feedback, comments or architectural requests directly to our relays.</p>
      </div>

      <div className="contact-container">
        {submitted ? (
          <div className="success-submission-card">
            <div className="success-checkmark">✓</div>
            <h2>Message Dispatched!</h2>
            <p>Thank you <strong>{formData.name}</strong>. Our developer support team has received your logs at <strong>{formData.email}</strong> and will connect with you within 24 hours.</p>
            <button 
              className="reset-form-btn" 
              onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="contact-form">
            <div className="form-input-group">
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter your name..."
                required 
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="you@example.com"
                required 
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="message">Detailed Inquiry</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="How can we assist you with our systems..."
                rows="5"
                required 
              />
            </div>

            <button type="submit" className="submit-form-btn">
              Dispatch Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;