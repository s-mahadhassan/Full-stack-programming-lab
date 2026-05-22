import React, { useState } from 'react';

const Actions = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [bgClass, setBgClass] = useState('default-theme');
  const [hoveredButton, setHoveredButton] = useState(null);

  const themes = ['default-theme', 'aurora-theme', 'sunset-theme', 'nebula-theme'];

  const toggleMessage = () => {
    setShowMessage(prev => !prev);
  };

  const rotateTheme = () => {
    const currentIndex = themes.indexOf(bgClass);
    const nextIndex = (currentIndex + 1) % themes.length;
    setBgClass(themes[nextIndex]);
  };

  const triggerNativeAlert = () => {
    alert("🚀 Web API Triggered: This is a secure native browser alert dialog!");
  };

  const getHoverStyle = (btnId) => {
    return hoveredButton === btnId 
      ? { color: '#0f172a', fontWeight: '800' } 
      : { color: '#f8fafc', fontWeight: '600' };
  };

  return (
    <div className={`interaction-workspace ${bgClass}`}>
      <div className="dynamic-container">
        <h2 className="section-title">Event Operations Hub</h2>

        <div className="button-matrix">
          <button 
            className="action-btn message-btn"
            onClick={toggleMessage}
            onMouseOver={() => setHoveredButton(1)}
            onMouseLeave={() => setHoveredButton(null)}
            style={getHoverStyle(1)}
          >
            Toggle Message Block
          </button>

          <button 
            className="action-btn theme-btn"
            onClick={rotateTheme}
            onMouseOver={() => setHoveredButton(2)}
            onMouseLeave={() => setHoveredButton(null)}
            style={getHoverStyle(2)}
          >
            Rotate Theme Context
          </button>

          <button 
            className="action-btn alert-btn"
            onClick={triggerNativeAlert}
            onMouseOver={() => setHoveredButton(3)}
            onMouseLeave={() => setHoveredButton(null)}
            style={getHoverStyle(3)}
          >
            Trigger Native Alert
          </button>
        </div>

        {showMessage && (
          <div className="message-block-alert fade-in">
            <div className="alert-icon">✨</div>
            <div className="alert-text">
              <h4>Dynamic Panel Rendered</h4>
              <p>State controlled event listener executed beautifully. Toggled smoothly using conditional rendering logic.</p>
            </div>
          </div>
        )}

        <div className="current-theme-status">
          Active Theme Style: <span>{bgClass.replace('-theme', '').toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default Actions;