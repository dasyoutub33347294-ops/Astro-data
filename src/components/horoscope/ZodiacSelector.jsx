import React from 'react';
import { ZODIAC_SIGNS } from '../../data/zodiacSigns';
import './ZodiacSelector.css';

const ZodiacSelector = ({ selectedSign, onSelect }) => {
  return (
    <div className="zodiac-grid">
      {ZODIAC_SIGNS.map((sign, index) => (
        <button
          key={sign.id}
          className={`zodiac-item animate-fade-in ${selectedSign === sign.id ? 'active' : ''}`}
          style={{ animationDelay: `${index * 0.05}s` }}
          onClick={() => onSelect(sign.id)}
        >
          <div className="zodiac-symbol">{sign.symbol}</div>
          <span className="zodiac-name">{sign.name}</span>
          <span className="zodiac-dates">{sign.dates}</span>
        </button>
      ))}
    </div>
  );
};

export default ZodiacSelector;
