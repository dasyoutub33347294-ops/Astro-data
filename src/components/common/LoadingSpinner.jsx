import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ text, size = 'medium' }) => {
  return (
    <div className={`spinner-container ${size}`}>
      <div className="orbit-spinner">
        <div className="orbit"></div>
        <div className="orbit"></div>
        <div className="orbit"></div>
        <div className="center-dot"></div>
      </div>
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
