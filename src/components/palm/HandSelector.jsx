import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './HandSelector.css';

const HandSelector = ({ onSelect }) => {
  const [selected, setSelected] = useState(null);
  const { t } = useLanguage();

  const handleSelect = (hand) => {
    setSelected(hand);
    if (onSelect) {
      onSelect(hand);
    }
  };

  return (
    <div className="hand-selector-container">
      <h2 className="hand-selector-title">{t.palm.title}</h2>
      <p className="hand-selector-subtitle">{t.palm.instructions}</p>

      <div className="hand-options">
        {/* Left Hand */}
        <button
          className={`hand-option ${selected === 'left' ? 'active' : ''}`}
          onClick={() => handleSelect('left')}
        >
          <div className="hand-visual left-hand">
            <svg viewBox="0 0 120 160" className="hand-svg">
              {/* Palm base */}
              <ellipse cx="60" cy="100" rx="40" ry="50" fill="rgba(255,255,255,0.08)" stroke="rgba(224,170,255,0.5)" strokeWidth="1.5"/>
              {/* Fingers */}
              <rect x="22" y="30" width="12" height="50" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(224,170,255,0.4)" strokeWidth="1"/>
              <rect x="38" y="15" width="12" height="60" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(224,170,255,0.4)" strokeWidth="1"/>
              <rect x="54" y="10" width="12" height="65" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(224,170,255,0.4)" strokeWidth="1"/>
              <rect x="70" y="18" width="12" height="55" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(224,170,255,0.4)" strokeWidth="1"/>
              <rect x="86" y="35" width="12" height="40" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(224,170,255,0.4)" strokeWidth="1"/>
              {/* Palm lines */}
              <path d="M35 85 Q55 75 85 88" stroke="#ff4d6d" strokeWidth="1" fill="none" opacity="0.6"/>
              <path d="M30 100 Q55 90 80 95" stroke="#4cc9f0" strokeWidth="1" fill="none" opacity="0.6"/>
              <path d="M40 115 Q50 95 45 70" stroke="#38b000" strokeWidth="1" fill="none" opacity="0.6"/>
              {/* Glow dot */}
              <circle cx="55" cy="90" r="4" fill="#00f0ff" opacity="0.8">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
          <span className="hand-label">{t.palm.btn_scan_left}</span>
        </button>

        {/* Right Hand */}
        <button
          className={`hand-option ${selected === 'right' ? 'active' : ''}`}
          onClick={() => handleSelect('right')}
        >
          <div className="hand-visual right-hand">
            <svg viewBox="0 0 120 160" className="hand-svg" style={{ transform: 'scaleX(-1)' }}>
              {/* Same SVG mirrored */}
              <ellipse cx="60" cy="100" rx="40" ry="50" fill="rgba(255,255,255,0.08)" stroke="rgba(224,170,255,0.5)" strokeWidth="1.5"/>
              <rect x="22" y="30" width="12" height="50" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(224,170,255,0.4)" strokeWidth="1"/>
              <rect x="38" y="15" width="12" height="60" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(224,170,255,0.4)" strokeWidth="1"/>
              <rect x="54" y="10" width="12" height="65" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(224,170,255,0.4)" strokeWidth="1"/>
              <rect x="70" y="18" width="12" height="55" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(224,170,255,0.4)" strokeWidth="1"/>
              <rect x="86" y="35" width="12" height="40" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(224,170,255,0.4)" strokeWidth="1"/>
              <path d="M35 85 Q55 75 85 88" stroke="#ff4d6d" strokeWidth="1" fill="none" opacity="0.6"/>
              <path d="M30 100 Q55 90 80 95" stroke="#4cc9f0" strokeWidth="1" fill="none" opacity="0.6"/>
              <path d="M40 115 Q50 95 45 70" stroke="#38b000" strokeWidth="1" fill="none" opacity="0.6"/>
              <circle cx="55" cy="90" r="4" fill="#00f0ff" opacity="0.8">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
          <span className="hand-label">{t.palm.btn_scan_right}</span>
        </button>
      </div>
    </div>
  );
};

export default HandSelector;
