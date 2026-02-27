import React from 'react';
import './ExitDialog.css';

const ExitDialog = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="exit-overlay">
      <div className="exit-modal">
        <h3>Leave the Cosmic Realm?</h3>
        <p>Your spiritual journey is not yet complete. Are you sure you wish to exit?</p>
        <div className="exit-actions">
          <button className="btn-cancel" onClick={onCancel}>Stay</button>
          <button className="btn-confirm" onClick={onConfirm}>Exit</button>
        </div>
      </div>
    </div>
  );
};

export default ExitDialog;
