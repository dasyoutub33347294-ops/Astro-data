import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../hooks/useNavigation';
import { languageOptions } from '../i18n/index';
import ScreenTransition from '../components/common/ScreenTransition';
import './LanguageSelectionScreen.css';

const LanguageSelectionScreen = () => {
  const { language, changeLanguage } = useLanguage();
  const { navigateTo } = useNavigation();

  const handleSelect = (langCode) => {
    changeLanguage(langCode);
    navigateTo('ONBOARDING');
  };

  return (
    <ScreenTransition animation="fade">
      <div className="language-screen">
        {/* Logo */}
        <div className="lang-logo">
          <span>🌍</span>
        </div>

        <h1 className="lang-title">Choose Your Language</h1>
        <p className="lang-subtitle">Select your preferred language to begin</p>

        {/* Language Options */}
        <div className="language-list">
          {languageOptions.map((lang, index) => (
            <button
              key={lang.code}
              className={`language-option animate-slide-up ${language === lang.code ? 'active' : ''}`}
              style={{ animationDelay: `${index * 0.08}s` }}
              onClick={() => handleSelect(lang.code)}
            >
              <span className="lang-flag">{lang.flag}</span>
              <span className="lang-label">{lang.label}</span>
              {language === lang.code && (
                <span className="lang-check">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </ScreenTransition>
  );
};

export default LanguageSelectionScreen;
