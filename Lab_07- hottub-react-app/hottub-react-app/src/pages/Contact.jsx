import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear validation error when editing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter an email address.';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please enter a message (at least 10 characters).';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 8000);
    }
  };

  return (
    <div className="w-100 p-5 bg-white border rounded text-start">
      {/* Breadcrumb */}
      <div className="small text-muted mb-4">
        <Link to="/" className="text-primary">Home</Link> &gt; Customer Support &gt; Contact Us
      </div>
      
      <h3 className="fw-bold mb-4 text-dark">Contact Us</h3>
      
      <div className="bg-light p-4 mb-5 border rounded">
        {/* Top Info */}
        <h6 className="fw-bold mb-1 text-dark">Contact Our Customer Support</h6>
        <p className="small text-muted mb-4">
          Have questions about pricing, physical parameters, custom jets, or electrical integrations? Please get in touch using the secure form below. Our technicians are ready to coordinate layout sheets.
        </p>
        
        <h6 className="fw-bold mb-1 text-dark">Online Sales & Customer Support</h6>
        <p className="mb-4">Call Us: <span className="fs-5 fw-bold text-danger">020 7898 9845</span></p>
        
        {/* Split details */}
        <div className="row border-bottom pb-4 mb-4 g-4">
          <div className="col-md-6 border-end">
            <h6 className="fw-bold mb-2 text-dark">Retail Store Location</h6>
            <p className="small text-muted mb-0">Hottub Store Loc</p>
            <p className="small text-muted mb-0">5000N. Ford avenue</p>
            <p className="small text-muted mb-0">New York, NY 20145</p>
            <p className="small text-muted mb-0">Tel: 888.123.1234</p>
          </div>
          <div className="col-md-6 ps-md-4">
            <h6 className="fw-bold mb-2 text-dark">Services & Support</h6>
            <p className="small text-muted mb-0">Hotspring Technical Division</p>
            <p className="small text-muted mb-0">5000N. Ford avenue</p>
            <p className="small text-muted mb-0">New York, NY 20145</p>
            <p className="small text-muted mb-0">Support hotline: 888.123.1234</p>
          </div>
        </div>
        
        {/* Contact Form structure */}
        <h6 className="fw-bold mb-4 text-dark text-uppercase">Send Us A Message</h6>
        
        {submitted && (
          <div className="alert alert-success mt-2 mb-4 text-center border-0" style={{ background: '#d4edda', color: '#155724' }}>
            <i className="fa-solid fa-circle-check me-2"></i>
            Thanks! We've successfully received your message and will get back to you within 24 hours.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
          <div className="row mb-3 align-items-start">
            <div className="col-sm-3 text-sm-end pt-1">
              <label htmlFor="name" className="fw-bold small text-dark">First name <span className="text-danger">*</span></label>
            </div>
            <div className="col-sm-9">
              <input 
                type="text" 
                className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`}
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="error-text text-start text-danger small mt-1">{errors.name}</div>}
            </div>
          </div>
          
          <div className="row mb-3 align-items-start">
            <div className="col-sm-3 text-sm-end pt-1">
              <label htmlFor="email" className="fw-bold small text-dark">Email <span className="text-danger">*</span></label>
            </div>
            <div className="col-sm-9">
              <input 
                type="text" 
                className={`form-control form-control-sm ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error-text text-start text-danger small mt-1">{errors.email}</div>}
            </div>
          </div>
          
          <div className="row mb-3 align-items-start">
            <div className="col-sm-3 text-sm-end pt-1">
              <label htmlFor="subject" className="fw-bold small text-dark">Subject</label>
            </div>
            <div className="col-sm-9">
              <input 
                type="text" 
                className="form-control form-control-sm" 
                id="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="row mb-4 align-items-start">
            <div className="col-sm-3 text-sm-end pt-1">
              <label htmlFor="message" className="fw-bold small text-dark">Your Message <span className="text-danger">*</span></label>
            </div>
            <div className="col-sm-9">
              <textarea 
                className={`form-control form-control-sm ${errors.message ? 'is-invalid' : ''}`}
                id="message" 
                rows="6"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && <div className="error-text text-start text-danger small mt-1">{errors.message}</div>}
            </div>
          </div>
          
          <div className="row">
            <div className="col-sm-9 offset-sm-3">
              <button type="submit" className="btn-red pt-2 pb-2 ps-4 pe-4 border-0">SUBMIT MESSAGE</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
