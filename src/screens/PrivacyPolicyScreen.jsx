import React from 'react';
import Header from '../components/common/Header';
import ScreenTransition from '../components/common/ScreenTransition';
import './PrivacyPolicyScreen.css';

const PrivacyPolicyScreen = () => {
  return (
    <ScreenTransition animation="slide-left">
      <div className="privacy-screen">
        <Header title="Privacy Policy" />

        <div className="privacy-content">
          <div className="privacy-section animate-fade-in">
            <h2>Privacy Policy</h2>
            <p className="last-updated">Last updated: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="privacy-section animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h3>1. Information We Collect</h3>
            <p>
              AI Palm Reader collects only the information you voluntarily provide:
            </p>
            <ul>
              <li><strong>Profile Data:</strong> Name, date of birth, time of birth, and gender — stored locally on your device only.</li>
              <li><strong>Palm Images:</strong> Photos you upload for palm reading are sent to our AI service for analysis and are NOT stored on any server.</li>
              <li><strong>Chat Messages:</strong> Messages sent to the AI guide are processed in real-time and are NOT stored permanently.</li>
            </ul>
          </div>

          <div className="privacy-section animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <h3>2. How We Use Your Information</h3>
            <p>
              Your data is used solely to personalize your spiritual guidance experience. We do not sell, rent, or share your personal information with third parties.
            </p>
          </div>

          <div className="privacy-section animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3>3. Data Storage</h3>
            <p>
              All personal data (name, birth details, reading history) is stored locally on your device using browser localStorage. No personal data is transmitted to or stored on external servers except during active AI analysis sessions.
            </p>
          </div>

          <div className="privacy-section animate-slide-up" style={{ animationDelay: '0.25s' }}>
            <h3>4. AI Processing</h3>
            <p>
              We use third-party AI models (via OpenRouter API) to process palm images and generate spiritual guidance. Images and text prompts are sent securely via HTTPS. We do not control the data retention policies of third-party AI providers. Please review OpenRouter's privacy policy for details.
            </p>
          </div>

          <div className="privacy-section animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3>5. Disclaimer</h3>
            <p>
              AI Palm Reader is designed for <strong>entertainment and self-reflection purposes only</strong>. Readings and guidance provided by this app:
            </p>
            <ul>
              <li>Are NOT medical advice</li>
              <li>Are NOT legal advice</li>
              <li>Are NOT financial advice</li>
              <li>Do NOT guarantee future events</li>
            </ul>
            <p>
              Users should not make important life decisions based solely on this app's output.
            </p>
          </div>

          <div className="privacy-section animate-slide-up" style={{ animationDelay: '0.35s' }}>
            <h3>6. Children's Privacy</h3>
            <p>
              This app is not intended for children under the age of 13. We do not knowingly collect data from children.
            </p>
          </div>

          <div className="privacy-section animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h3>7. Your Rights</h3>
            <p>
              You can delete all your data at any time by using the "Reset Profile" option in Settings. This permanently removes all locally stored information.
            </p>
          </div>

          <div className="privacy-section animate-slide-up" style={{ animationDelay: '0.45s' }}>
            <h3>8. Contact</h3>
            <p>
              For questions or concerns about this privacy policy, please contact us through the app's support channels.
            </p>
          </div>

          <div className="privacy-footer animate-fade-in">
            <p>🔮 AI Palm Reader — Your privacy is sacred to us.</p>
          </div>
        </div>
      </div>
    </ScreenTransition>
  );
};

export default PrivacyPolicyScreen;
