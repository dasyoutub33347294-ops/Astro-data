import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './ScanGuide.css';

const ScanGuide = ({ hand = 'right', onContinue }) => {
  const { t } = useLanguage();

  return (
    <div className="scan-guide-container animate-fade-in">
      {/* Guide Visual */}
      <div className="scan-guide-visual">
        <div className="scan-frame">
          <svg viewBox="0 0 200 260" className="guide-hand-svg">
            {/* Scan frame corners */}
            <path d="M10 40 L10 10 L40 10" stroke="#00f0ff" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M160 10 L190 10 L190 40" stroke="#00f0ff" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M190 220 L190 250 L160 250" stroke="#00f0ff" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M40 250 L10 250 L10 220" stroke="#00f0ff" strokeWidth="3" fill="none" strokeLinecap="round"/>

            {/* Hand outline */}
            <g transform={hand === 'left' ? 'scale(-1,1) translate(-200,0)' : ''}>
              <ellipse cx="100" cy="160" rx="55" ry="70" fill="rgba(255,255,255,0.04)" stroke="rgba(224,170,255,0.3)" strokeWidth="1.5" strokeDasharray="5,5"/>
              {/* Fingers */}
              <rect x="40" y="55" width="16" height="65" rx="8" fill="none" stroke="rgba(224,170,255,0.25)" strokeWidth="1" strokeDasharray="4,4"/>
              <rect x="60" y="35" width="16" height="80" rx="8" fill="none" stroke="rgba(224,170,255,0.25)" strokeWidth="1" strokeDasharray="4,4"/>
              <rect x="82" y="28" width="16" height="85" rx="8" fill="none" stroke="rgba(224,170,255,0.25)" strokeWidth="1" strokeDasharray="4,4"/>
              <rect x="104" y="38" width="16" height="75" rx="8" fill="none" stroke="rgba(224,170,255,0.25)" strokeWidth="1" strokeDasharray="4,4"/>
              <rect x="126" y="60" width="16" height="55" rx="8" fill="none" stroke="rgba(224,170,255,0.25)" strokeWidth="1" strokeDasharray="4,4"/>
            </g>

            {/* Scanning line animation */}
            <line x1="20" y1="0" x2="180" y2="0" stroke="#00f0ff" strokeWidth="2" opacity="0.7">
              <animateTransform attributeName="transform" type="translate" values="0,30;0,240;0,30" dur="3s" repeatCount="indefinite"/>
            </line>
          </svg>
        </div>
      </div>

      {/* Tips */}
      <div className="scan-tips">
        <div className="tip-item">
          <span className="tip-icon">💡</span>
          <span className="tip-text">Use bright, even lighting</span>
        </div>
        <div className="tip-item">
          <span className="tip-icon">🤚</span>
          <span className="tip-text">Open your palm fully</span>
        </div>
        <div className="tip-item">
          <span className="tip-icon">📸</span>
          <span className="tip-text">Keep your hand steady</span>
        </div>
      </div>

      {/* Continue Button */}
      <button className="scan-continue-btn" onClick={onContinue}>
        <span>{t.common.continue}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
};

export default ScanGuide;
