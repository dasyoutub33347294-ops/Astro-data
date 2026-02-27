import React from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/common/Header';
import PalmLineResult from '../components/palm/PalmLineResult';
import CosmicButton from '../components/common/CosmicButton';
import ShareButton from '../components/guidance/ShareButton';
import ScreenTransition from '../components/common/ScreenTransition';
import './PalmResultScreen.css';

const PalmResultScreen = () => {
  const { navigateTo } = useNavigation();
  const { user } = useUser();
  const { t } = useLanguage();

  const results = user.lastPalmResult;

  const handleNewScan = () => {
    navigateTo('PALM_SCAN');
  };

  const handleGoHome = () => {
    navigateTo('HOME');
  };

  if (!results) {
    return (
      <ScreenTransition animation="fade">
        <div className="palm-result-screen">
          <Header title={t.palm.title} />
          <div className="no-result-container">
            <span className="no-result-icon">🤚</span>
            <p className="no-result-text">No palm reading available yet.</p>
            <CosmicButton onClick={handleNewScan}>Scan Your Palm</CosmicButton>
          </div>
        </div>
      </ScreenTransition>
    );
  }

  // Build share text from results
  const shareText = `🔮 My Palm Reading:\n\n❤️ Heart Line: ${results.heartLine}\n🧠 Head Line: ${results.headLine}\n🌿 Life Line: ${results.lifeLine}\n⭐ Fate Line: ${results.fateLine}\n\n✨ ${results.summary || ''}`;

  return (
    <ScreenTransition animation="slide-up">
      <div className="palm-result-screen">
        <Header title="Palm Reading" />

        <div className="result-content">
          {/* Title Section */}
          <div className="result-header-section animate-fade-in">
            <div className="result-badge">
              <span>🤚</span>
            </div>
            <h2 className="result-main-title">Your Palm Analysis</h2>
            <p className="result-date">
              {new Date().toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          {/* Palm Line Results */}
          <PalmLineResult results={results} />

          {/* Disclaimer */}
          <div className="palm-disclaimer animate-fade-in">
            <p>🔮 This reading is for spiritual reflection and entertainment purposes only.</p>
          </div>

          {/* Share */}
          <ShareButton
            title="My Palm Reading 🔮"
            text={shareText}
          />

          {/* Actions */}
          <div className="result-actions animate-slide-up">
            <CosmicButton variant="secondary" fullWidth onClick={handleNewScan}>
              New Scan
            </CosmicButton>
            <CosmicButton fullWidth onClick={handleGoHome}>
              Back to Home
            </CosmicButton>
          </div>
        </div>
      </div>
    </ScreenTransition>
  );
};

export default PalmResultScreen;
