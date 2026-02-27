import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { getAiGuidance } from '../services/aiService';
import { ZODIAC_SIGNS } from '../data/zodiacSigns';
import Header from '../components/common/Header';
import ZodiacSelector from '../components/horoscope/ZodiacSelector';
import HoroscopeCard from '../components/horoscope/HoroscopeCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ShareButton from '../components/guidance/ShareButton';
import ScreenTransition from '../components/common/ScreenTransition';
import './HoroscopeScreen.css';

const HoroscopeScreen = () => {
  const { t, language } = useLanguage();
  const { user } = useUser();
  const [selectedSign, setSelectedSign] = useState(user.zodiacSign || null);
  const [horoscopeData, setHoroscopeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignSelect = async (signId) => {
    setSelectedSign(signId);
    setIsLoading(true);
    setHoroscopeData(null);

    const sign = ZODIAC_SIGNS.find((z) => z.id === signId);
    if (!sign) return;

    try {
      const today = new Date().toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });

      const prompt = `
        Generate a daily horoscope for ${sign.name} (${sign.element} sign) for today ${today}.
        The seeker's name is "${user.name || 'Seeker'}".

        Respond in this EXACT JSON format:
        {
          "reading": "A 3-4 sentence horoscope covering love, career, and personal energy. Be mystical and empowering.",
          "mood": "One word describing today's cosmic mood (e.g., Reflective, Energetic, Passionate)",
          "color": "A power color for today (e.g., Deep Purple, Ocean Blue)",
          "luckyNumber": "A lucky number between 1 and 99"
        }

        Be warm, symbolic, and never make absolute predictions.
      `;

      const userContext = {
        name: user.name || 'Seeker',
        zodiacSign: signId
      };

      const response = await getAiGuidance(prompt, language, userContext);

      let parsed;
      try {
        const jsonString = response.replace(/```json|```/g, '').trim();
        parsed = JSON.parse(jsonString);
      } catch (parseErr) {
        parsed = {
          reading: response,
          mood: 'Mystical',
          color: 'Cosmic Purple',
          luckyNumber: Math.floor(Math.random() * 99) + 1
        };
      }

      parsed.signName = sign.name;
      setHoroscopeData(parsed);
    } catch (error) {
      console.error('Horoscope error:', error);
      setHoroscopeData({
        signName: sign.name,
        reading: 'The stars are aligning for you today. Trust the journey and stay open to unexpected blessings. Your inner light guides the way forward.',
        mood: 'Hopeful',
        color: 'Golden',
        luckyNumber: 7
      });
    } finally {
      setIsLoading(false);
    }
  };

  const shareText = horoscopeData
    ? `🌟 ${horoscopeData.signName} Horoscope\n\n${horoscopeData.reading}\n\nMood: ${horoscopeData.mood}\nColor: ${horoscopeData.color}\nLucky #: ${horoscopeData.luckyNumber}`
    : '';

  return (
    <ScreenTransition animation="slide-left">
      <div className="horoscope-screen">
        <Header title={t.horoscope.title} />

        <div className="horoscope-content">
          <p className="horoscope-instruction">{t.horoscope.select_zodiac}</p>

          <ZodiacSelector
            selectedSign={selectedSign}
            onSelect={handleSignSelect}
          />

          {isLoading && (
            <div className="horoscope-loading">
              <LoadingSpinner text="Reading the stars..." />
            </div>
          )}

          {horoscopeData && !isLoading && (
            <>
              <HoroscopeCard data={horoscopeData} />

              <div className="horoscope-disclaimer">
                <p>🔮 For entertainment and self-reflection only.</p>
              </div>

              <ShareButton
                title={`${horoscopeData.signName} Horoscope 🌟`}
                text={shareText}
              />
            </>
          )}
        </div>
      </div>
    </ScreenTransition>
  );
};

export default HoroscopeScreen;
