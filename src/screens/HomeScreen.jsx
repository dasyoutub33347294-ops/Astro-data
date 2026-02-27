import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../hooks/useNavigation';
import { useToast } from '../hooks/useToast';
import FeatureGrid from '../components/home/FeatureGrid';
import Disclaimer from '../components/common/Disclaimer';
import ExitDialog from '../components/common/ExitDialog';
import ScreenTransition from '../components/common/ScreenTransition';
import './HomeScreen.css';

const HomeScreen = () => {
  const { user } = useUser();
  const { t } = useLanguage();
  const { navigateTo } = useNavigation();
  const { showToast } = useToast();

  const [showExitDialog, setShowExitDialog] = useState(false);
  const backPressCount = useRef(0);
  const backTimer = useRef(null);

  // Double back to exit logic
  useEffect(() => {
    const handlePopState = () => {
      backPressCount.current += 1;

      if (backPressCount.current === 1) {
        showToast('Press back again to exit', 'info', 2000);

        // Push state again so we can intercept next back
        window.history.pushState(null, '', window.location.pathname);

        backTimer.current = setTimeout(() => {
          backPressCount.current = 0;
        }, 2000);
      } else if (backPressCount.current >= 2) {
        clearTimeout(backTimer.current);
        setShowExitDialog(true);
      }
    };

    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      clearTimeout(backTimer.current);
    };
  }, []);

  const handleExitConfirm = () => {
    setShowExitDialog(false);
    window.close(); // May not work in all browsers
    // Fallback: navigate to a blank page
    window.location.href = 'about:blank';
  };

  const handleExitCancel = () => {
    setShowExitDialog(false);
    backPressCount.current = 0;
    window.history.pushState(null, '', window.location.pathname);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅';
    if (hour < 18) return '☀️';
    return '🌙';
  };

  return (
    <ScreenTransition animation="fade">
      <div className="home-screen">
        {/* Header */}
        <div className="home-header">
          <div className="home-greeting">
            <span className="greeting-emoji">{getGreeting()}</span>
            <div>
              <p className="greeting-text">{t.home.greeting}</p>
              <h1 className="greeting-name">{user.name || 'Seeker'}</h1>
            </div>
          </div>

          <button
            className="settings-btn"
            onClick={() => navigateTo('SETTINGS')}
            aria-label="Settings"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </button>
        </div>

        {/* AI Chat Quick Access */}
        <button
          className="ai-chat-banner animate-slide-up"
          onClick={() => navigateTo('AI_CHAT')}
        >
          <div className="ai-banner-left">
            <div className="ai-banner-icon">🔮</div>
            <div>
              <h3>{t.home.feature_chat}</h3>
              <p>Ask anything about your journey</p>
            </div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>

        {/* Feature Grid */}
        <div className="home-section">
          <h2 className="section-title">Explore</h2>
          <FeatureGrid />
        </div>

        {/* Disclaimer */}
        <Disclaimer />

        {/* Exit Dialog */}
        <ExitDialog
          isOpen={showExitDialog}
          onConfirm={handleExitConfirm}
          onCancel={handleExitCancel}
        />
      </div>
    </ScreenTransition>
  );
};

export default HomeScreen;
