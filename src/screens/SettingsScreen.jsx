import React, { useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useToast } from '../hooks/useToast';
import { languageOptions } from '../i18n/index';
import { shareContent } from '../utils/shareUtils';
import Header from '../components/common/Header';
import GlassCard from '../components/common/GlassCard';
import ScreenTransition from '../components/common/ScreenTransition';
import './SettingsScreen.css';

const SettingsScreen = () => {
  const { navigateTo } = useNavigation();
  const { t, language, changeLanguage } = useLanguage();
  const { user, clearUserData } = useUser();
  const { showToast } = useToast();
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setShowLangPicker(false);
    showToast('Language updated!', 'success');
  };

  const handleShareApp = async () => {
    await shareContent(
      '🔮 AI Palm Reader',
      'Check out this amazing AI Palm Reader & Astrology app! Get your palm read, tarot cards drawn, and daily horoscope.',
      window.location.origin
    );
  };

  const handleRateApp = () => {
    showToast('Thank you for your support! ⭐', 'success');
  };

  const handleReset = () => {
    clearUserData();
    localStorage.clear();
    showToast('Profile reset successfully.', 'success');
    setTimeout(() => {
      navigateTo('SPLASH');
    }, 1000);
  };

  const currentLang = languageOptions.find((l) => l.code === language);

  return (
    <ScreenTransition animation="slide-left">
      <div className="settings-screen">
        <Header title={t.settings.title} />

        <div className="settings-content">
          {/* User Info Card */}
          <GlassCard className="user-info-card animate-fade-in">
            <div className="user-info-row">
              <div className="user-avatar-settings">
                <span>✨</span>
              </div>
              <div className="user-info-text">
                <h3>{user.name || 'Seeker'}</h3>
                <p>{user.zodiacSign ? `${user.zodiacSign} • ${user.birthDate || ''}` : 'Cosmic Traveler'}</p>
              </div>
            </div>
          </GlassCard>

          {/* Settings List */}
          <div className="settings-list">
            {/* Language */}
            <button
              className="settings-item animate-slide-up"
              style={{ animationDelay: '0.05s' }}
              onClick={() => setShowLangPicker(!showLangPicker)}
            >
              <div className="settings-item-left">
                <span className="settings-icon">🌍</span>
                <span className="settings-label">{t.settings.language}</span>
              </div>
              <div className="settings-item-right">
                <span className="settings-value">{currentLang?.flag} {currentLang?.label}</span>
                <span className="settings-arrow">›</span>
              </div>
            </button>

            {/* Language Picker Dropdown */}
            {showLangPicker && (
              <div className="lang-picker-dropdown animate-fade-in">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    className={`lang-picker-item ${language === lang.code ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                    {language === lang.code && <span className="lang-check">✓</span>}
                  </button>
                ))}
              </div>
            )}

            {/* Share App */}
            <button
              className="settings-item animate-slide-up"
              style={{ animationDelay: '0.1s' }}
              onClick={handleShareApp}
            >
              <div className="settings-item-left">
                <span className="settings-icon">📤</span>
                <span className="settings-label">{t.settings.share_app}</span>
              </div>
              <span className="settings-arrow">›</span>
            </button>

            {/* Rate App */}
            <button
              className="settings-item animate-slide-up"
              style={{ animationDelay: '0.15s' }}
              onClick={handleRateApp}
            >
              <div className="settings-item-left">
                <span className="settings-icon">⭐</span>
                <span className="settings-label">{t.settings.rate}</span>
              </div>
              <span className="settings-arrow">›</span>
            </button>

            {/* Privacy Policy */}
            <button
              className="settings-item animate-slide-up"
              style={{ animationDelay: '0.2s' }}
              onClick={() => navigateTo('PRIVACY_POLICY')}
            >
              <div className="settings-item-left">
                <span className="settings-icon">🔒</span>
                <span className="settings-label">{t.settings.privacy}</span>
              </div>
              <span className="settings-arrow">›</span>
            </button>

            {/* Reset Profile */}
            <button
              className="settings-item danger animate-slide-up"
              style={{ animationDelay: '0.25s' }}
              onClick={() => setShowResetConfirm(true)}
            >
              <div className="settings-item-left">
                <span className="settings-icon">🗑️</span>
                <span className="settings-label">{t.settings.reset}</span>
              </div>
              <span className="settings-arrow">›</span>
            </button>
          </div>

          {/* Reset Confirmation */}
          {showResetConfirm && (
            <div className="reset-confirm-overlay">
              <div className="reset-confirm-modal animate-fade-in">
                <h3>Reset Profile?</h3>
                <p>This will erase all your data, readings, and preferences. This cannot be undone.</p>
                <div className="reset-actions">
                  <button className="btn-cancel" onClick={() => setShowResetConfirm(false)}>Cancel</button>
                  <button className="btn-danger" onClick={handleReset}>Reset</button>
                </div>
              </div>
            </div>
          )}

          {/* App Version */}
          <div className="app-version">
            <p>AI Palm Reader v1.0.0</p>
            <p>Made with ✨ cosmic energy</p>
          </div>
        </div>
      </div>
    </ScreenTransition>
  );
};

export default SettingsScreen;
