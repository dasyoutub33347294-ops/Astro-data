import React, { useEffect, useState } from 'react';
import './Toast.css';

const Toast = ({ message, isVisible, type = 'info', onClose }) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
  }, [isVisible]);

  if (!show) return null;

  return (
    <div className={`toast-container ${type} ${show ? 'show' : ''}`}>
      <div className="toast-content">
        <span className="toast-icon">
          {type === 'success' ? '✨' : type === 'error' ? '⚠️' : '🔮'}
        </span>
        <span className="toast-message">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
