import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('cedr_lang') || 'en';
  });

  const toggleLanguage = () => {
    setLang((prev) => {
      const next = prev === 'en' ? 'bn' : 'en';
      localStorage.setItem('cedr_lang', next);
      return next;
    });
  };

  const setLanguage = (selectedLang) => {
    setLang(selectedLang);
    localStorage.setItem('cedr_lang', selectedLang);
  };

  // Helper function to pick correct bilingual field
  const t = (enText, bnText) => {
    if (lang === 'bn' && bnText && bnText.trim().length > 0) {
      return bnText;
    }
    return enText || '';
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
