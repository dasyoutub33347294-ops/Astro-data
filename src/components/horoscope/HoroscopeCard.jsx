import React from 'react';
import './HoroscopeCard.css';

const HoroscopeCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="horoscope-card animate-slide-up">
      <div className="horoscope-header">
        <div className="horoscope-sign-badge">
          {data.signName}
        </div>
        <div className="horoscope-date">
          {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
        </div>
      </div>

      <div className="horoscope-main-text">
        <p>{data.reading}</p>
      </div>

      <div className="horoscope-stats">
        <div className="stat-item">
          <span className="stat-label">Mood</span>
          <span className="stat-value">{data.mood}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Color</span>
          <span className="stat-value" style={{ color: '#00f0ff' }}>{data.color}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Lucky No.</span>
          <span className="stat-value highlight">{data.luckyNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default HoroscopeCard;
