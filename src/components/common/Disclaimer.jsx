import React, { useState } from 'react';
import './Disclaimer.css';

const Disclaimer = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="disclaimer-banner">
      <p>
        <strong>Note:</strong> For entertainment purposes only. Not medical or legal advice.
      </p>
      <button onClick={() => setVisible(false)} className="close-btn">×</button>
    </div>
  );
};

export default Disclaimer;
