import React from 'react';
import { PALM_LINES } from '../../data/palmLines';
import './PalmLineResult.css';

const PalmLineResult = ({ results }) => {
  if (!results) return null;

  return (
    <div className="palm-results-container">
      {PALM_LINES.map((line, index) => {
        const resultText = results[line.id] || 'Reading not available.';
        return (
          <div
            key={line.id}
            className="palm-line-card animate-slide-up"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {/* Color indicator */}
            <div className="line-indicator" style={{ backgroundColor: line.color }}>
              <div className="line-dot" style={{ boxShadow: `0 0 10px ${line.color}` }}></div>
            </div>

            <div className="line-content">
              <div className="line-header">
                <h3 className="line-name" style={{ color: line.color }}>{line.name}</h3>
                <p className="line-desc-hint">{line.description}</p>
              </div>
              <p className="line-reading">{resultText}</p>
            </div>
          </div>
        );
      })}

      {/* Summary Section */}
      {results.summary && (
        <div className="palm-summary-card animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="summary-icon">🔮</div>
          <h3 className="summary-title">Cosmic Summary</h3>
          <p className="summary-text">{results.summary}</p>
        </div>
      )}
    </div>
  );
};

export default PalmLineResult;
