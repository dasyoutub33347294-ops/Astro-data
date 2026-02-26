import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Import Global Styles
import './index.css';
import './styles/globals.css';
import './styles/animations.css';
import './styles/components.css';

// PWA Service Worker Registration
import { registerSW } from 'virtual:pwa-register';

// Auto-update SW logic
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New update available. Reload?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App is ready to work offline.");
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
