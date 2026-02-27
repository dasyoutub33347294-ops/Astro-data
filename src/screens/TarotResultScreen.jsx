import React from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/common/Header';
import GlassCard from '../components/common/GlassCard';
import CosmicButton from '../components/common/CosmicButton';
import ShareButton from '../components/guidance/ShareButton';
import ScreenTransition from '../components/common/ScreenTransition';
import './TarotResultScreen.css';

const TarotResultScreen = () => {
  const { navigateTo } = useNavigation();
  const { user } = useUser();
  const { t } = useLanguage();

  const result = user.lastTarotResult;

  if (!result) {
    return (
      <ScreenTransition animation="fade">
        <div className="tarot-result-screen">
          <Header title={t.tarot.title} />
          <div className="no-result-container">
            <span className="no-result-icon">🃏</span>
            <p className="no-result-text">No tarot reading available.</p>
            <CosmicButton onClick={() => navigateTo('TAROT')}>
              Draw Cards
            </CosmicButton>
          </div>
        </div>
      </ScreenTransition>
    );
  }

  const positions = ['Past', 'Present', 'Future'];

  const shareText = `🃏 My Tarot Reading (${result.category}):\n\nCards: ${result.cards.map((c, i) => `${positions[i]}: ${c.name}`).join(' | ')}\n\n${result.reading}`;

  return (
    <ScreenTransition animation="slide-up">
      <div className="tarot-result-screen">
        <Header title="Tarot Reading" />

        <div className="tarot-result-content">
          {/* Category Badge */}
          <div className="tarot-result-header animate-fade-in">
            <div className="tarot-category-badge">{result.category}</div>
            <p className="tarot-result-date">
              {new Date(result.date).toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          {/* Cards Display */}
          <div className="cards-spread">
            {result.cards.map((card, index) => (
              <div
                key={card.id}
                className="spread-card animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="spread-card-inner">
                  <div className="spread-position">{positions[index]}</div>
                  <div className="spread-numeral">{card.id}</div>
                  <h4 className="spread-name">{card.name}</h4>
                  <div className="spread-keywords">
                    {card.keywords.map((kw, i) => (
                      <span key={i} className="spread-kw">{kw}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full Reading */}
          <GlassCard className="reading-card animate-fade-in">
            <h3 className="reading-title">🔮 Your Reading</h3>
            <p className="reading-text">{result.reading}</p>
          </GlassCard>

          {/* Disclaimer */}
          <div className="tarot-disclaimer">
            <p>This reading is symbolic guidance for self-reflection purposes only.</p>
          </div>

          {/* Share */}
          <ShareButton
            title="My Tarot Reading 🃏"
            text={shareText}
          />

          {/* Actions */}
          <div className="tarot-result-actions">
            <CosmicButton variant="secondary" fullWidth onClick={() => navigateTo('TAROT')}>
              New Reading
            </CosmicButton>
            <CosmicButton fullWidth onClick={() => navigateTo('HOME')}>
              Back to Home
            </CosmicButton>
          </div>
        </div>
      </div>
    </ScreenTransition>
  );
};

export default TarotResultScreen;
