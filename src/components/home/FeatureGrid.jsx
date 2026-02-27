import React from 'react';
import FeatureCard from './FeatureCard';
import { useNavigation } from '../../hooks/useNavigation';
import { useLanguage } from '../../context/LanguageContext';
import './FeatureGrid.css';

const FeatureGrid = () => {
  const { navigateTo } = useNavigation();
  const { t } = useLanguage();

  const features = [
    {
      id: 'palm',
      icon: '🤚',
      label: t.home.feature_palm,
      screen: 'PALM_SCAN',
      gradient: 'linear-gradient(135deg, #7b2cbf, #3c096c)',
      delay: 0
    },
    {
      id: 'tarot',
      icon: '🃏',
      label: t.home.feature_tarot,
      screen: 'TAROT',
      gradient: 'linear-gradient(135deg, #9d4edd, #5a189a)',
      delay: 1
    },
    {
      id: 'horoscope',
      icon: '🌟',
      label: t.home.feature_horoscope,
      screen: 'HOROSCOPE',
      gradient: 'linear-gradient(135deg, #3a0ca3, #240046)',
      delay: 2
    },
    {
      id: 'chat',
      icon: '🔮',
      label: t.home.feature_chat,
      screen: 'AI_CHAT',
      gradient: 'linear-gradient(135deg, #00b4d8, #0077b6)',
      delay: 3
    },
    {
      id: 'love',
      icon: '💜',
      label: t.home.feature_love,
      screen: 'LOVE_READING',
      gradient: 'linear-gradient(135deg, #e040fb, #7b1fa2)',
      delay: 4
    },
    {
      id: 'guidance',
      icon: '✨',
      label: t.home.feature_guidance,
      screen: 'DAILY_GUIDANCE',
      gradient: 'linear-gradient(135deg, #f9a825, #ff6f00)',
      delay: 5
    }
  ];

  return (
    <div className="feature-grid">
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          icon={feature.icon}
          label={feature.label}
          gradient={feature.gradient}
          delay={feature.delay}
          onClick={() => navigateTo(feature.screen)}
        />
      ))}
    </div>
  );
};

export default FeatureGrid;
