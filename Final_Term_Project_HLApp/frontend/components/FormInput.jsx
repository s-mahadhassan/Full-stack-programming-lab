/**
 * Purpose: Reusable Form Input Field
 * Description: Renders text, password, number, email, and dates with standardized styling and label layouts.
 */

import React from 'react';

export default function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
  style = {}
}) {
  return (
    <div className="form-group" style={style}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label} {required && <span style={{ color: 'var(--status-rejected)' }}>*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        className="form-input"
      />
    </div>
  );
}
