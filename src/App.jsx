import React, { Suspense } from 'react';
import { UserProvider } from './context/UserContext';
import { LanguageProvider } from './context/LanguageContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { ToastProvider } from './hooks/useToast';
import LoadingSpinner from './components/common/LoadingSpinner';

// Screen Imports (Lazy Loaded for Performance)
const SplashScreen = React.lazy(() => import('./screens/SplashScreen'));
const LanguageSelectionScreen = React.lazy(() => import('./screens/LanguageSelectionScreen'));
const OnboardingScreen = React.lazy(() => import('./screens/OnboardingScreen'));
const ProfileSetupScreen = React.lazy(() => import('./screens/ProfileSetupScreen'));
const HomeScreen = React.lazy(() => import('./screens/HomeScreen'));
const PalmScanScreen = React.lazy(() => import('./screens/PalmScanScreen'));
const PalmResultScreen = React.lazy(() => import('./screens/PalmResultScreen'));
const AiChatScreen = React.lazy(() => import('./screens/AiChatScreen'));
const TarotScreen = React.lazy(() => import('./screens/TarotScreen'));
const TarotResultScreen = React.lazy(() => import('./screens/TarotResultScreen'));
const DailyGuidanceScreen = React.lazy(() => import('./screens/DailyGuidanceScreen'));
const HoroscopeScreen = React.lazy(() => import('./screens/HoroscopeScreen'));
const LoveReadingScreen = React.lazy(() => import('./screens/LoveReadingScreen'));
const SettingsScreen = React.lazy(() => import('./screens/SettingsScreen'));
const PrivacyPolicyScreen = React.lazy(() => import('./screens/PrivacyPolicyScreen'));

import './App.css';

/**
 * Main Content Switcher based on Navigation Context
 */
const AppContent = () => {
  const { currentScreen } = useNavigation();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'SPLASH': return <SplashScreen />;
      case 'LANGUAGE_SELECT': return <LanguageSelectionScreen />;
      case 'ONBOARDING': return <OnboardingScreen />;
      case 'PROFILE_SETUP': return <ProfileSetupScreen />;
      case 'HOME': return <HomeScreen />;
      case 'PALM_SCAN': return <PalmScanScreen />;
      case 'PALM_RESULT': return <PalmResultScreen />;
      case 'AI_CHAT': return <AiChatScreen />;
      case 'TAROT': return <TarotScreen />;
      case 'TAROT_RESULT': return <TarotResultScreen />;
      case 'DAILY_GUIDANCE': return <DailyGuidanceScreen />;
      case 'HOROSCOPE': return <HoroscopeScreen />;
      case 'LOVE_READING': return <LoveReadingScreen />;
      case 'SETTINGS': return <SettingsScreen />;
      case 'PRIVACY_POLICY': return <PrivacyPolicyScreen />;
      default: return <SplashScreen />;
    }
  };

  return (
    <div className="app-container">
      <Suspense fallback={<div className="full-screen-loader"><LoadingSpinner size="large" /></div>}>
        {renderScreen()}
      </Suspense>
    </div>
  );
};

/**
 * Root App Component with Providers
 */
function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <NavigationProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </NavigationProvider>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
