import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { getAiGuidance } from '../services/aiService';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '../services/storageService';
import Header from '../components/common/Header';
import GlassCard from '../components/common/GlassCard';
import GuidanceCard from '../components/guidance/GuidanceCard';
import ShareButton from '../components/guidance/ShareButton';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ScreenTransition from '../components/common/ScreenTransition';
import './DailyGuidanceScreen.css';

const DailyGuidanceScreen = () => {
  const { t, language } = useLanguage();
  const { user } = useUser();
  const [guidance, setGuidance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDailyGuidance();
  }, []);

  const fetchDailyGuidance = async () => {
    // Check cache first — only fetch once per day
    const cached = loadFromStorage(STORAGE_KEYS.DAILY_GUIDANCE);
    const today = new Date().toDateString();

    if (cached && cached.date === today && cached.language === language) {
      setGuidance(cached.data);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const prompt = `
        Generate a daily spiritual guidance for today (${today}).
        The seeker's name is "${user.name || 'Seeker'}" and their zodiac sign is "${user.zodiacSign || 'Unknown'}".

        Provide the response in this EXACT JSON format:
        {
          "energy": "A 2-sentence description of today's cosmic energy.",
          "emotionalFocus": "A 2-sentence emotional focus for the day.",
          "embrace": "One thing to embrace today (1 sentence).",
          "avoid": "One thing to avoid today (1 sentence).",
          "luckyElement": "A lucky element for today (e.g., color, number, crystal).",
          "affirmation": "A powerful one-line affirmation for the day.",
          "overview": "A 3-sentence overall spiritual overview of the day."
        }

        Be mystical, warm, empowering. No fear-based language.
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
        // Fallback if AI doesn't return valid JSON
        parsed = {
          energy: response.substring(0, 150),
          emotionalFocus: 'Focus on inner peace and clarity today.',
          embrace: 'Embrace opportunities with an open heart.',
          avoid: 'Avoid overthinking and self-doubt.',
          luckyElement: 'Amethyst Crystal',
          affirmation: 'I am aligned with the universe.',
          overview: response
        };
      }

      setGuidance(parsed);

      // Cache it
      saveToStorage(STORAGE_KEYS.DAILY_GUIDANCE, {
        date: today,
        language,
        data: parsed
      });
    } catch (error) {
      console.error('Daily guidance error:', error);
      setGuidance({
        energy: 'The cosmic energy flows gently today, inviting reflection.',
        emotionalFocus: 'Center yourself in gratitude and awareness.',
        embrace: 'Embrace stillness and creative expression.',
        avoid: 'Avoid rushing decisions or negative self-talk.',
        luckyElement: 'Moonstone',
        affirmation: 'I trust the journey of my soul.',
        overview: 'Today carries a gentle, reflective energy. Take time to connect with your inner self and trust the process.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <ScreenTransition animation="fade">
        <div className="guidance-screen">
          <Header title={t.home.feature_guidance} />
          <div className="guidance-loading">
            <LoadingSpinner text="Reading today's energy..." size="large" />
          </div>
        </div>
      </ScreenTransition>
    );
  }

  const shareText = `✨ My Daily Guidance\n\n🌌 Energy: ${guidance.energy}\n💜 Focus: ${guidance.emotionalFocus}\n✅ Embrace: ${guidance.embrace}\n❌ Avoid: ${guidance.avoid}\n🍀 Lucky: ${guidance.luckyElement}\n\n💫 "${guidance.affirmation}"`;

  return (
    <ScreenTransition animation="slide-up">
      <div className="guidance-screen">
        <Header title={t.home.feature_guidance} />

        <div className="guidance-content">
          {/* Date & Greeting */}
          <div className="guidance-date-section animate-fade-in">
            <h2 className="guidance-day">
              {new Date().toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </h2>
            <p className="guidance-for">Guidance for {user.name || 'Seeker'}</p>
          </div>

          {/* Affirmation Banner */}
          <div className="affirmation-banner animate-slide-up">
            <span className="affirmation-icon">💫</span>
            <p className="affirmation-text">"{guidance.affirmation}"</p>
          </div>

          {/* Energy */}
          <GuidanceCard
            title="Today's Energy"
            content={guidance.energy}
            type="general"
          />

          {/* Emotional Focus */}
          <GuidanceCard
            title="Emotional Focus"
            content={guidance.emotionalFocus}
            type="love"
          />

          {/* Embrace & Avoid */}
          <div className="embrace-avoid-row">
            <GlassCard className="embrace-card animate-slide-up">
              <span className="ea-icon">✅</span>
              <h4 className="ea-title">Embrace</h4>
              <p className="ea-text">{guidance.embrace}</p>
            </GlassCard>

            <GlassCard className="avoid-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <span className="ea-icon">🚫</span>
              <h4 className="ea-title">Avoid</h4>
              <p className="ea-text">{guidance.avoid}</p>
            </GlassCard>
          </div>

          {/* Lucky Element */}
          <GlassCard className="lucky-card animate-slide-up">
            <div className="lucky-content">
              <span className="lucky-icon">🍀</span>
              <div>
                <h4 className="lucky-title">Lucky Element</h4>
                <p className="lucky-value">{guidance.luckyElement}</p>
              </div>
            </div>
          </GlassCard>

          {/* Overview */}
          {guidance.overview && (
            <GlassCard className="overview-card animate-fade-in">
              <h3 className="overview-title">🌌 Cosmic Overview</h3>
              <p className="overview-text">{guidance.overview}</p>
            </GlassCard>
          )}

          {/* Disclaimer */}
          <div className="guidance-disclaimer">
            <p>🔮 For spiritual reflection and entertainment only.</p>
          </div>

          {/* Share */}
          <ShareButton
            title="My Daily Guidance ✨"
            text={shareText}
          />
        </div>
      </div>
    </ScreenTransition>
  );
};

export default DailyGuidanceScreen;
