import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { getAiGuidance } from '../services/aiService';
import Header from '../components/common/Header';
import GlassCard from '../components/common/GlassCard';
import CosmicButton from '../components/common/CosmicButton';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ShareButton from '../components/guidance/ShareButton';
import ScreenTransition from '../components/common/ScreenTransition';
import './LoveReadingScreen.css';

const LoveReadingScreen = () => {
  const { t, language } = useLanguage();
  const { user } = useUser();
  const [partnerSign, setPartnerSign] = useState('');
  const [reading, setReading] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const zodiacOptions = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const handleGenerate = async () => {
    if (!partnerSign) return;

    setIsLoading(true);
    setReading(null);

    try {
      const prompt = `
        Generate a love compatibility reading between:
        - Person 1: ${user.name || 'Seeker'}, Zodiac: ${user.zodiacSign || 'Unknown'}
        - Person 2: Zodiac: ${partnerSign}

        Provide the response in this EXACT JSON format:
        {
          "overallCompatibility": "A percentage between 60-98%",
          "emotionalBond": "2 sentences about emotional connection.",
          "communicationStyle": "2 sentences about how they communicate.",
          "passionLevel": "2 sentences about romantic passion.",
          "challenges": "2 sentences about potential challenges (empowering, not negative).",
          "advice": "A 2-sentence spiritual advice for this pairing.",
          "cosmicVerdict": "One powerful sentence summarizing the cosmic connection."
        }

        Be warm, mystical, and supportive. Never be negative or discouraging.
      `;

      const userContext = {
        name: user.name || 'Seeker',
        zodiacSign: user.zodiacSign || 'Unknown'
      };

      const response = await getAiGuidance(prompt, language, userContext);

      let parsed;
      try {
        const jsonString = response.replace(/```json|```/g, '').trim();
        parsed = JSON.parse(jsonString);
      } catch (parseErr) {
        parsed = {
          overallCompatibility: '78%',
          emotionalBond: response.substring(0, 100),
          communicationStyle: 'Your communication styles complement each other beautifully.',
          passionLevel: 'There is a deep spiritual connection between these signs.',
          challenges: 'Growth comes through patience and understanding differences.',
          advice: 'Trust the journey and communicate from the heart.',
          cosmicVerdict: response.substring(0, 80)
        };
      }

      setReading(parsed);
    } catch (error) {
      console.error('Love reading error:', error);
      setReading({
        overallCompatibility: '75%',
        emotionalBond: 'A gentle and nurturing emotional connection awaits.',
        communicationStyle: 'Open hearts lead to open conversations.',
        passionLevel: 'The spark between these souls is warm and steady.',
        challenges: 'Every relationship has lessons. Embrace them with grace.',
        advice: 'Listen to each other with the ears of your soul.',
        cosmicVerdict: 'The universe sees potential in this beautiful pairing.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const shareText = reading
    ? `💜 Love Reading: ${user.zodiacSign || '?'} + ${partnerSign}\n\n💕 Compatibility: ${reading.overallCompatibility}\n❤️ ${reading.emotionalBond}\n🔥 ${reading.passionLevel}\n✨ ${reading.cosmicVerdict}`
    : '';

  return (
    <ScreenTransition animation="slide-left">
      <div className="love-reading-screen">
        <Header title={t.home.feature_love} />

        <div className="love-content">
          {/* Header Visual */}
          <div className="love-visual animate-fade-in">
            <div className="love-hearts">
              <span className="heart-1">💜</span>
              <span className="heart-2">💙</span>
            </div>
            <h2 className="love-title">Love Compatibility</h2>
            <p className="love-subtitle">Discover your cosmic connection</p>
          </div>

          {/* Your Sign */}
          <GlassCard className="your-sign-card animate-slide-up">
            <div className="sign-display">
              <span className="sign-label">Your Sign</span>
              <span className="sign-value">{user.zodiacSign || 'Unknown'}</span>
            </div>
          </GlassCard>

          {/* Partner Sign Selector */}
          <div className="partner-section animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <label className="partner-label">Partner's Sign</label>
            <div className="partner-grid">
              {zodiacOptions.map((sign) => (
                <button
                  key={sign}
                  className={`partner-option ${partnerSign === sign ? 'active' : ''}`}
                  onClick={() => setPartnerSign(sign)}
                >
                  {sign}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          {!reading && !isLoading && (
            <div className="love-action animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CosmicButton
                fullWidth
                onClick={handleGenerate}
                disabled={!partnerSign}
              >
                Reveal Connection
              </CosmicButton>
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="love-loading">
              <LoadingSpinner text="Aligning your stars..." />
            </div>
          )}

          {/* Results */}
          {reading && !isLoading && (
            <div className="love-results animate-fade-in">
              {/* Compatibility Score */}
              <div className="compatibility-score">
                <div className="score-circle">
                  <span className="score-number">{reading.overallCompatibility}</span>
                </div>
                <p className="score-label">Cosmic Compatibility</p>
              </div>

              {/* Details */}
              <GlassCard>
                <h4 className="love-section-title">❤️ Emotional Bond</h4>
                <p className="love-section-text">{reading.emotionalBond}</p>
              </GlassCard>

              <GlassCard>
                <h4 className="love-section-title">💬 Communication</h4>
                <p className="love-section-text">{reading.communicationStyle}</p>
              </GlassCard>

              <GlassCard>
                <h4 className="love-section-title">🔥 Passion</h4>
                <p className="love-section-text">{reading.passionLevel}</p>
              </GlassCard>

              <GlassCard>
                <h4 className="love-section-title">🌱 Growth Areas</h4>
                <p className="love-section-text">{reading.challenges}</p>
              </GlassCard>

              <GlassCard>
                <h4 className="love-section-title">💫 Cosmic Advice</h4>
                <p className="love-section-text">{reading.advice}</p>
              </GlassCard>

              {/* Verdict */}
              <div className="cosmic-verdict">
                <span className="verdict-icon">🌟</span>
                <p className="verdict-text">"{reading.cosmicVerdict}"</p>
              </div>

              <div className="love-disclaimer">
                <p>🔮 For spiritual reflection and entertainment only.</p>
              </div>

              <ShareButton
                title="Love Compatibility 💜"
                text={shareText}
              />

              <div className="love-retry">
                <CosmicButton variant="secondary" fullWidth onClick={() => { setReading(null); setPartnerSign(''); }}>
                  Try Another Pairing
                </CosmicButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </ScreenTransition>
  );
};

export default LoveReadingScreen;
