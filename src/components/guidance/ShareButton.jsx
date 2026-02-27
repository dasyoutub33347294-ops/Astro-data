import React from 'react';
import { shareContent } from '../../utils/shareUtils';
import './ShareButton.css';

const ShareButton = ({ title, text }) => {
  const handleShare = async () => {
    await shareContent(title, text);
  };

  return (
    <button className="share-action-btn" onClick={handleShare}>
      <span className="share-icon">📤</span>
      <span className="share-label">Share Energy</span>
    </button>
  );
};

export default ShareButton;
