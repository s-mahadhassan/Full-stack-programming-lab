import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="counter-card">
      <div className="counter-display-wrapper">
        <span className="counter-label">Current Count</span>
        <h1 className={`counter-value ${count === 0 ? 'zero' : ''}`}>{count}</h1>
      </div>

      {count === 0 && (
        <p className="boundary-warning">Minimum limit of 0 reached</p>
      )}

      <div className="button-group">
        <button onClick={handleDecrement} className="btn btn-decrement" disabled={count === 0}>
          <span className="btn-icon">−</span> Decrement
        </button>
        <button onClick={handleReset} className="btn btn-reset">
          <span className="btn-icon">⟳</span> Reset
        </button>
        <button onClick={handleIncrement} className="btn btn-increment">
          <span className="btn-icon">+</span> Increment
        </button>
      </div>
    </div>
  );
};

export default Counter;