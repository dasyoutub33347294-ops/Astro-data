import React from 'react';
import './CosmicButton.css';

const CosmicButton = ({ 
  children, 
  onClick, 
  variant = 'primary', // primary, secondary, outline
  fullWidth = false,
  disabled = false,
  className = ''
}) => {
  return (
    <button
      className={`cosmic-btn ${variant} ${fullWidth ? 'full-width' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="btn-content">{children}</span>
      {variant === 'primary' && <div className="btn-glow"></div>}
    </button>
  );
};

export default CosmicButton;
