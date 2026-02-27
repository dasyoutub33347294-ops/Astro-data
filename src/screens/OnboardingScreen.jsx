import React, { useState, useRef } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useLanguage } from '../context/LanguageContext';
import { ONBOARDING_SLIDES } from '../data/onboardingSlides';
import ScreenTransition from '../components/common/ScreenTransition';
import CosmicButton from '../components/common/CosmicButton';
import './OnboardingScreen.css';

const OnboardingScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { navigateTo } = useNavigation();
  const { t } = useLanguage();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slides = ONBOARDING_SLIDES.map((slide) => ({
    ...slide,
    title: t.onboarding[slide.titleKey.split('.')[1]] || slide.titleKey,
    desc: t.onboarding[slide.descKey.split('.')[1]] || slide.descKey
  }));

  const isLastSlide = currentSlide === slides.length - 1;

  const goNext = () => {
    if (isLastSlide) {
      navigateTo('PROFILE_SETUP');
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const skip = () => {
    navigateTo('PROFILE_SETUP');
  };

  // Swipe Handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goNext(); // Swipe Left = Next
      } else {
        goBack(); // Swipe Right = Back
      }
    }
  };

  return (
    <ScreenTransition animation="fade">
      <div
        className="onboarding-screen"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Skip Button */}
        <button className="skip-btn" onClick={skip}>
          Skip
        </button>

        {/* Slide Content */}
        <div className="onboarding-slide-wrapper">
          <div className="onboarding-slide animate-fade-in" key={currentSlide}>
            {/* Visual */}
            <div className="onboarding-visual">
              <div className="onboarding-icon-circle">
                {currentSlide === 0 && <span className="onboarding-emoji">🤚</span>}
                {currentSlide === 1 && <span className="onboarding-emoji">🃏</span>}
                {currentSlide === 2 && <span className="onboarding-emoji">🔮</span>}
              </div>
              {/* Decorative rings */}
              <div className="deco-ring ring-1"></div>
              <div className="deco-ring ring-2"></div>
            </div>

            {/* Text */}
            <h2 className="onboarding-title">{slides[currentSlide].title}</h2>
            <p className="onboarding-desc">{slides[currentSlide].desc}</p>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="dots-container">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`dot-indicator ${index === currentSlide ? 'active' : ''}`}
            />
          ))}
        </div>

        {/* Action Button */}
        <div className="onboarding-action">
          <CosmicButton
            fullWidth
            onClick={goNext}
          >
            {isLastSlide ? t.onboarding.btn_start : t.common.next}
          </CosmicButton>
        </div>
      </div>
    </ScreenTransition>
  );
};

export default OnboardingScreen;
