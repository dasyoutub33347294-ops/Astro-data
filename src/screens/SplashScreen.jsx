import React, { useEffect, useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useUser } from '../context/UserContext';
import { loadFromStorage, STORAGE_KEYS } from '../services/storageService';
import './SplashScreen.css';

const SplashScreen = () => {
  const { navigateTo } = useNavigation();
  const { user, isLoading } = useUser();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      setFadeOut(true);

      setTimeout(() => {
        const savedLang = loadFromStorage(STORAGE_KEYS.APP_LANGUAGE);

        if (user.isOnboarded) {
          navigateTo('HOME');
        } else if (savedLang) {
          navigateTo('ONBOARDING');
        } else {
          navigateTo('LANGUAGE_SELECT');
        }
      }, 600);
    }, 2800);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      {/* Background Stars */}
      <div className="stars-container">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1}s`
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div className="splash-logo-container">
        <div className="splash-logo-ring ring-outer">
          <div className="splash-logo-ring ring-inner">
            <div className="splash-logo-core">
              <span className="splash-icon">🤚</span>
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="splash-title">Palm Reader</h1>
      <p className="splash-subtitle">Unlock Your Destiny</p>

      {/* Loading Dots */}
      <div className="splash-loader">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default SplashScreen;
