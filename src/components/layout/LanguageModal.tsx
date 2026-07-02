'use client';

import { useEffect, useCallback } from 'react';
import { Modal, Button } from '@/components/ui';
import { getTranslation, languages, type Language } from '@/translations';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLanguage: (lang: Language) => void;
}

export function LanguageModal({ isOpen, onClose, onSelectLanguage }: LanguageModalProps) {
  const t = getTranslation('en'); // Use English for the modal itself since it's the language selector

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === '1') onSelectLanguage('en');
    if (event.key === '2') onSelectLanguage('sw');
  }, [onSelectLanguage]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      showCloseButton={false}
      closeOnOverlayClick={false}
      className="max-w-md"
    >
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 brutal-card dark:brutal-card-dark border-brutal-border dark:border-brutal-border-dark border-brutal shadow-brutal flex items-center justify-center">
          <svg className="w-8 h-8 text-brutal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </div>

        <h2 className="brutal-heading-3 mb-2">{t.selectLanguage}</h2>
        <p className="brutal-text text-brutal-fg/60 dark:text-brutal-fgDark/60 mb-6">
          Choose your preferred language / Chagua lugha yako inayopendekezwa
        </p>

        <div className="grid grid-cols-2 gap-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelectLanguage(lang.code)}
              className="brutal-card dark:brutal-card-dark border-brutal-border dark:border-brutal-border-dark border-brutal p-6 text-left shadow-brutal hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-100 group"
            >
              <div className="flex items-center gap-3">
                <span className="brutal-badge-primary text-lg px-4 py-2">
                  {lang.code.toUpperCase()}
                </span>
                <div>
                  <p className="brutal-heading-4">{lang.nativeName}</p>
                  <p className="brutal-text-sm text-brutal-fg/60 dark:text-brutal-fgDark/60">{lang.name}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-6 brutal-text-sm text-brutal-fg/40 dark:text-brutal-fgDark/40">
          Press 1 for English, 2 for Kiswahili
        </p>
      </div>
    </Modal>
  );
}