import React, { useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useToast } from '../hooks/useToast';
import { analyzePalmImage } from '../services/palmAnalysisService';
import { saveToStorage, STORAGE_KEYS, loadFromStorage } from '../services/storageService';
import Header from '../components/common/Header';
import HandSelector from '../components/palm/HandSelector';
import ScanGuide from '../components/palm/ScanGuide';
import ImageUploader from '../components/palm/ImageUploader';
import LoadingSpinner from '../components/common/LoadingSpinner';
import CosmicButton from '../components/common/CosmicButton';
import ScreenTransition from '../components/common/ScreenTransition';
import './PalmScanScreen.css';

const STEPS = {
  SELECT_HAND: 'SELECT_HAND',
  GUIDE: 'GUIDE',
  UPLOAD: 'UPLOAD',
  ANALYZING: 'ANALYZING'
};

const PalmScanScreen = () => {
  const [step, setStep] = useState(STEPS.SELECT_HAND);
  const [selectedHand, setSelectedHand] = useState(null);
  const [palmImage, setPalmImage] = useState(null);
  const { navigateTo } = useNavigation();
  const { t, language } = useLanguage();
  const { user, updateUser } = useUser();
  const { showToast } = useToast();

  const handleHandSelect = (hand) => {
    setSelectedHand(hand);
    setStep(STEPS.GUIDE);
  };

  const handleGuideComplete = () => {
    setStep(STEPS.UPLOAD);
  };

  const handleImageReady = (base64Image) => {
    setPalmImage(base64Image);
  };

  const handleAnalyze = async () => {
    if (!palmImage) {
      showToast('Please upload a palm image first', 'error');
      return;
    }

    setStep(STEPS.ANALYZING);

    try {
      const results = await analyzePalmImage(palmImage, language);

      if (results.error) {
        showToast(results.error, 'error');
        setStep(STEPS.UPLOAD);
        return;
      }

      // Save to history
      const historyEntry = {
        id: Date.now(),
        hand: selectedHand,
        date: new Date().toISOString(),
        results
      };

      const existingHistory = loadFromStorage(STORAGE_KEYS.PALM_HISTORY, []);
      existingHistory.unshift(historyEntry);
      saveToStorage(STORAGE_KEYS.PALM_HISTORY, existingHistory.slice(0, 10));

      // Store result in user context for PalmResultScreen
      updateUser({
        lastPalmResult: results,
        palmScanHistory: existingHistory.slice(0, 10)
      });

      navigateTo('PALM_RESULT');
    } catch (error) {
      console.error('Palm analysis failed:', error);
      showToast('Analysis failed. Please try again.', 'error');
      setStep(STEPS.UPLOAD);
    }
  };

  const renderStep = () => {
    switch (step) {
      case STEPS.SELECT_HAND:
        return <HandSelector onSelect={handleHandSelect} />;

      case STEPS.GUIDE:
        return (
          <ScanGuide
            hand={selectedHand}
            onContinue={handleGuideComplete}
          />
        );

      case STEPS.UPLOAD:
        return (
          <div className="upload-step">
            <ImageUploader onImageReady={handleImageReady} />
            {palmImage && (
              <div className="analyze-action animate-slide-up">
                <CosmicButton fullWidth onClick={handleAnalyze}>
                  {t.palm.analyzing.replace('...', '') || 'Analyze My Palm'}
                </CosmicButton>
              </div>
            )}
          </div>
        );

      case STEPS.ANALYZING:
        return (
          <div className="analyzing-step">
            <LoadingSpinner text={t.palm.analyzing} size="large" />
            <p className="analyzing-subtext">
              Our AI is reading the cosmic patterns in your palm...
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ScreenTransition animation="slide-left">
      <div className="palm-scan-screen">
        <Header title={t.palm.title} />

        {/* Progress Indicator */}
        <div className="palm-progress">
          {Object.values(STEPS).map((s, i) => (
            <div
              key={s}
              className={`progress-step ${Object.values(STEPS).indexOf(step) >= i ? 'active' : ''}`}
            >
              <div className="progress-dot" />
              {i < Object.values(STEPS).length - 1 && <div className="progress-line" />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="palm-step-content">
          {renderStep()}
        </div>
      </div>
    </ScreenTransition>
  );
};

export default PalmScanScreen;
