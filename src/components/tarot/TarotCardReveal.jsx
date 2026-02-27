import React, { useState } from 'react';
import './TarotCardReveal.css';

const TarotCardReveal = ({ card, onReveal }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleFlip = () => {
    if (isFlipped) return; // Only flip once

    setIsFlipped(true);

    // Wait for flip animation to complete, then trigger AI reading
    setTimeout(() => {
      setIsRevealed(true);
      if (onReveal) {
        onReveal(card);
      }
    }, 800);
  };

  if (!card) return null;

  return (
    <div className="tarot-reveal-container">
      <div
        className={`tarot-card-wrapper ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
      >
        {/* Card Front (Back of card — face down) */}
        <div className="tarot-card-face card-back">
          <div className="card-back-design">
            <div className="card-back-border">
              <div className="card-back-pattern">
                <svg viewBox="0 0 100 140" className="card-pattern-svg">
                  {/* Mystical pattern */}
                  <circle cx="50" cy="70" r="35" fill="none" stroke="rgba(123,44,191,0.6)" strokeWidth="1"/>
                  <circle cx="50" cy="70" r="25" fill="none" stroke="rgba(0,240,255,0.4)" strokeWidth="0.5"/>
                  <circle cx="50" cy="70" r="15" fill="none" stroke="rgba(224,170,255,0.3)" strokeWidth="0.5"/>
                  {/* Star */}
                  <polygon points="50,40 54,58 72,58 58,68 62,86 50,76 38,86 42,68 28,58 46,58"
                    fill="none" stroke="rgba(255,215,0,0.5)" strokeWidth="0.8"/>
                  {/* Corner decorations */}
                  <path d="M10 10 Q15 20 10 30" stroke="rgba(123,44,191,0.4)" strokeWidth="0.5" fill="none"/>
                  <path d="M90 10 Q85 20 90 30" stroke="rgba(123,44,191,0.4)" strokeWidth="0.5" fill="none"/>
                  <path d="M10 130 Q15 120 10 110" stroke="rgba(123,44,191,0.4)" strokeWidth="0.5" fill="none"/>
                  <path d="M90 130 Q85 120 90 110" stroke="rgba(123,44,191,0.4)" strokeWidth="0.5" fill="none"/>
                </svg>
              </div>
            </div>
            <p className="tap-hint">✨ Tap to Reveal ✨</p>
          </div>
        </div>

        {/* Card Back (Front of card — face up) */}
        <div className="tarot-card-face card-front">
          <div className="card-front-content">
            <div className="card-numeral">{card.id}</div>
            <h3 className="card-name">{card.name}</h3>
            <div className="card-keywords">
              {card.keywords && card.keywords.map((kw, i) => (
                <span key={i} className="keyword-tag">{kw}</span>
              ))}
            </div>
            <p className="card-meaning">{card.meaning}</p>
          </div>
        </div>
      </div>

      {/* Glow Effect on Reveal */}
      {isFlipped && <div className="reveal-glow"></div>}
    </div>
  );
};

export default TarotCardReveal;
