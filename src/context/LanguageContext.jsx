import React, { createContext, useState, useContext, useEffect } from 'react';
import { en } from '../i18n/en';
import { hi } from '../i18n/hi';
import { es } from '../i18n/es';
import { fr } from '../i18n/fr';
import { it } from '../i18n/it';
import { ko } from '../i18n/ko';

const LanguageContext = createContext();

const translations = {
  en, hi, es, fr, it, ko
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [t, setT] = useState(en);

  useEffect(() => {
    // Load saved language or default to 'en'
    const savedLang = localStorage.getItem('app_language');
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
      setT(translations[savedLang]);
    }
  }, []);

  const changeLanguage = (langCode) => {
    if (translations[langCode]) {
      setLanguage(langCode);
      setT(translations[langCode]);
      localStorage.setItem('app_language', langCode);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
