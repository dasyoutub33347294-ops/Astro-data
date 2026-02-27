import React from 'react';
import './GuidanceCard.css';

const GuidanceCard = ({ title, content, type = 'general' }) => {
  return (
    <div className={`guidance-card ${type} animate-fade-in`}>
      <div className="guidance-icon-header">
        {type === 'love' ? '❤️' : type === 'career' ? '💼' : '✨'}
      </div>
      <h3 className="guidance-title">{title}</h3>
      <p className="guidance-content">{content}</p>
    </div>
  );
};

export default GuidanceCard;
