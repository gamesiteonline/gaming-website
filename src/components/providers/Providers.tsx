'use client';

import { LanguageProvider } from '@/components/providers/LanguageProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LanguageModal } from '@/components/layout/LanguageModal';
import { ContactModal } from '@/components/layout/ContactModal';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useState, useEffect } from 'react';

function ProvidersContent({ children }: { children: React.ReactNode }) {
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('gamesite-language');
    if (!saved && !localStorage.getItem('gamesite-language-shown')) {
      setShowLanguageModal(true);
      localStorage.setItem('gamesite-language-shown', 'true');
    }
  }, []);

  const handleLanguageSelect = (lang: 'en' | 'sw') => {
    setLanguage(lang);
    setShowLanguageModal(false);
  };

  return (
    <>
      <Header
        currentLanguage={language}
        onLanguageChange={setLanguage}
        onContactClick={() => setShowContactModal(true)}
      />
      <main className="pt-20 sm:pt-24 min-h-screen">
        <div id="main-content" className="brutal-container">
          {mounted && <div className="animate-in">{children}</div>}
        </div>
      </main>
      <Footer currentLanguage={language} />
      
      {mounted && (
        <LanguageModal
          isOpen={showLanguageModal}
          onClose={() => setShowLanguageModal(false)}
          onSelectLanguage={handleLanguageSelect}
        />
      )}

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        currentLanguage={language}
      />
    </>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ProvidersContent>{children}</ProvidersContent>
    </LanguageProvider>
  );
}