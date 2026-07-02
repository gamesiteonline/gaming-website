'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language } from '@/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: ReturnType<typeof import('@/translations').getTranslation>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('gamesite-language') as Language | null;
    if (saved && (saved === 'en' || saved === 'sw')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('gamesite-language', lang);
  };

  // Import translations dynamically to avoid SSR issues
  const [translations, setTranslations] = useState<Record<Language, any>>({ en: {}, sw: {} });

  useEffect(() => {
    import('@/translations').then(({ getTranslation }) => {
      setTranslations({
        en: getTranslation('en'),
        sw: getTranslation('sw'),
      });
    });
  }, []);

  const t = mounted ? translations[language] : translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}