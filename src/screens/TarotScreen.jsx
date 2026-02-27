import React, { useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useToast } from '../hooks/useToast';
import { getAiGuidance } from '../services/aiService';
import { TAROT_DECK } from '../data/tarotDeck';
import { saveToStorage, STORAGE_KEYS, loadFromStorage } from '../services/storageService';
import Header from '../components/common/Header';
import TarotCategorySelector from '../components/tarot/TarotCategorySelector';
import TarotCardReveal from '../components/tarot/TarotCardReveal';
import CosmicButton from '../components/common/CosmicButton';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ScreenTransition from '../components/common/ScreenTransition';
import './TarotScreen.css';

const TarotScreen = () => {
  const [category, setCategory] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState('category'); // category | pick | reveal | loading

  const { navigateTo } = useNavigation();
  const { t, language } = useLanguage();
  const { user, updateUser } = useUser();
  const { showToast } = useToast();

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    // Pick 3 random cards from the deck
    const shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5);
    setSelectedCards(shuffled.slice(0, 3));
    setStep('pick');
  };

  const handleCardReveal = async (card) => {
    if (currentCardIndex < 2) {
      // Wait then show next card
      setTimeout(() => {
        setCurrentCardIndex((prev) => prev + 1);
      }, 1500);
    } else {
      // All 3 cards revealed — Generate detailed reading
      setStep('loading');
      setIsGenerating(true);

      try {
        const cardNames = selectedCards.map((c) => c.name).join(', ');
        const prompt = `
          The seeker drew these 3 Tarot cards for a "${category}" reading: ${cardNames}.
          
          Card 1 (Past): ${selectedCards[0].name} - ${selectedCards[0].meaning}
          Card 2 (Present): ${selectedCards[1].name} - ${selectedCards[1].meaning}
          Card 3 (Future): ${selectedCards[2].name} - ${selectedCards[2].meaning}
          
          Provide a deeply spiritual, 4-paragraph tarot reading that weaves these three cards together.
          Focus on the "${category}" aspect of the seeker's life.
          Include symbolic imagery and empowering language.
          End with an actionable spiritual suggestion.
        `;

        const userContext = {
          name: user.name || 'Seeker',
          zodiacSign: user.zodiacSign || 'Unknown'
        };

        const aiReading = await getAiGuidance(prompt, language, userContext);

        // Save to history
        const readingEntry = {
          id: Date.now(),
          category,
          cards: selectedCards,
          reading: aiReading,
          date: new Date().toISOString()
        };

        const history = loadFromStorage(STORAGE_KEYS.TAROT_HISTORY, []);
        history.unshift(readingEntry);
        saveToStorage(STORAGE_KEYS.TAROT_HISTORY, history.slice(0, 10));

        updateUser({
          lastTarotResult: readingEntry,
          tarotHistory: history.slice(0, 10)
        });

        navigateTo('TAROT_RESULT');
      } catch (error) {
        console.error('Tarot reading error:', error);
        showToast('Failed to generate reading. Please try again.', 'error');
        setStep('pick');
        setIsGenerating(false);
      }
    }
  };

  return (
    <ScreenTransition animation="slide-left">
      <div className="tarot-screen">
        <Header title={t.tarot.title} />

        <div className="tarot-content">
          {step === 'category' && (
            <TarotCategorySelector onSelect={handleCategorySelect} />
          )}

          {step === 'pick' && (
            <div className="tarot-pick-section">
              <p className="pick-instruction">
                Card {currentCardIndex + 1} of 3 — {
                  currentCardIndex === 0 ? 'Past' :
                  currentCardIndex === 1 ? 'Present' : 'Future'
                }
              </p>

              <TarotCardReveal
                key={currentCardIndex}
                card={selectedCards[currentCardIndex]}
                onReveal={handleCardReveal}
              />

              {/* Card Counter */}
              <div className="card-counter">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`counter-dot ${i <= currentCardIndex ? 'revealed' : ''}`}
                  />
                ))}
              </div>
            </div>
          )}

          {step === 'loading' && (
            <div className="tarot-loading">
              <LoadingSpinner text="The cards are speaking..." size="large" />
              <p className="tarot-loading-sub">
                Weaving the cosmic threads of your {category} reading...
              </p>
            </div>
          )}
        </div>
      </div>
    </ScreenTransition>
  );
};

export default TarotScreen;
