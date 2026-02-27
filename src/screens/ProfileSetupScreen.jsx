import React, { useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { getZodiacSign } from '../utils/dateUtils';
import ScreenTransition from '../components/common/ScreenTransition';
import CosmicButton from '../components/common/CosmicButton';
import './ProfileSetupScreen.css';

const ProfileSetupScreen = () => {
  const { navigateTo } = useNavigation();
  const { updateUser } = useUser();
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [gender, setGender] = useState('');

  const genderOptions = [
    { id: 'male', label: 'Male', icon: '♂️' },
    { id: 'female', label: 'Female', icon: '♀️' },
    { id: 'other', label: 'Other', icon: '⚧️' }
  ];

  const handleSubmit = () => {
    if (!name.trim() || !birthDate) return;

    const dateParts = birthDate.split('-');
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);
    const zodiac = getZodiacSign(day, month);

    updateUser({
      name: name.trim(),
      birthDate,
      birthTime,
      gender,
      zodiacSign: zodiac,
      isOnboarded: true
    });

    navigateTo('HOME');
  };

  const isValid = name.trim().length > 0 && birthDate;

  return (
    <ScreenTransition animation="slide-up">
      <div className="profile-screen">
        <div className="profile-header-section">
          <div className="profile-icon-wrapper">
            <span>✨</span>
          </div>
          <h1 className="profile-title">{t.profile.title}</h1>
          <p className="profile-subtitle">Tell us about yourself for a personalized experience</p>
        </div>

        <div className="profile-form">
          {/* Name */}
          <div className="form-group animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <label className="form-label">{t.profile.name_label}</label>
            <input
              type="text"
              className="input-cosmic"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={30}
            />
          </div>

          {/* Date of Birth */}
          <div className="form-group animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <label className="form-label">{t.profile.dob_label}</label>
            <input
              type="date"
              className="input-cosmic"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          {/* Time of Birth */}
          <div className="form-group animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <label className="form-label">{t.profile.tob_label}</label>
            <input
              type="time"
              className="input-cosmic"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
            />
          </div>

          {/* Gender */}
          <div className="form-group animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <label className="form-label">{t.profile.gender_label}</label>
            <div className="gender-options">
              {genderOptions.map((opt) => (
                <button
                  key={opt.id}
                  className={`gender-btn ${gender === opt.id ? 'active' : ''}`}
                  onClick={() => setGender(opt.id)}
                >
                  <span className="gender-icon">{opt.icon}</span>
                  <span className="gender-label">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="profile-submit animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <CosmicButton
              fullWidth
              onClick={handleSubmit}
              disabled={!isValid}
            >
              {t.profile.btn_create}
            </CosmicButton>
          </div>
        </div>
      </div>
    </ScreenTransition>
  );
};

export default ProfileSetupScreen;
