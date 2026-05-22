import React, { useState } from 'react';

const UserForm = () => {
  const [inputs, setInputs] = useState({ name: '', email: '' });
  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.name.trim() || !inputs.email.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: inputs.name,
      email: inputs.email
    };

    setSubmittedData(prev => [newEntry, ...prev]);
    setInputs({ name: '', email: '' });
  };

  return (
    <div className="form-workspace">
      <form onSubmit={handleSubmit} className="premium-form">
        <h2 className="workspace-title">Registration</h2>
        
        <div className="input-group">
          <input
            type="text"
            id="name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            placeholder=" "
            required
            autoComplete="off"
          />
          <label htmlFor="name">Full Name</label>
          <div className="focus-border"></div>
        </div>

        <div className="input-group">
          <input
            type="email"
            id="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            placeholder=" "
            required
            autoComplete="off"
          />
          <label htmlFor="email">Email Address</label>
          <div className="focus-border"></div>
        </div>

        <button type="submit" className="btn-submit">
          Submit Details
        </button>
      </form>

      <div className="submitted-data-section">
        <h3 className="section-title">Submitted Data</h3>
        
        {submittedData.length === 0 ? (
          <div className="empty-state">
            <p>No records found. Submit the form above to add details.</p>
          </div>
        ) : (
          <div className="records-list">
            {submittedData.map((data) => (
              <div key={data.id} className="record-card">
                <div className="record-avatar">
                  {data.name.charAt(0).toUpperCase()}
                </div>
                <div className="record-details">
                  <span className="record-name">{data.name}</span>
                  <span className="record-email">{data.email}</span>
                </div>
                <div className="record-timestamp">
                  {new Date(data.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserForm;