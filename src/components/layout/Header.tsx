'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { getTranslation, type Language } from '@/translations';

const BANNER_URL = 'https://github.com/gamesiteonline/gamesiteonline/blob/main/image/1782870111467.png?raw=true';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onContactClick: () => void;
}

export function Header({ currentLanguage, onLanguageChange, onContactClick }: HeaderProps) {
  const t = getTranslation(currentLanguage);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageSwitch = useCallback(() => {
    onLanguageChange(currentLanguage === 'en' ? 'sw' : 'en');
  }, [currentLanguage, onLanguageChange]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 border-b border-brutal-border dark:border-brutal-border-dark',
        'bg-brutal-bg/95 dark:bg-brutal-bgDark/95 backdrop-blur-sm',
        'transition-all duration-200',
        scrolled && 'shadow-brutal-lg'
      )}
    >
      <div className="brutal-container">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo/Banner */}
          <div className="flex items-center justify-center flex-1">
            <a href="/" className="flex items-center gap-3" aria-label={t.siteTitle}>
              <img
                src={BANNER_URL}
                alt={t.siteTitle}
                className="h-12 w-auto max-w-[200px] object-contain"
                loading="lazy"
              />
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Switcher */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLanguageSwitch}
              className="hidden sm:flex"
              aria-label={`Switch to ${currentLanguage === 'en' ? 'Kiswahili' : 'English'}`}
            >
              {currentLanguage === 'en' ? 'KI' : 'EN'}
            </Button>

            {/* Contact Button */}
            <Button variant="secondary" size="sm" onClick={onContactClick} className="hidden md:flex">
              {t.contact}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={onContactClick}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Owner attribution */}
        <div className="border-t border-brutal-border dark:border-brutal-border-dark py-2">
          <p className="brutal-text-sm text-center text-brutal-fg/60 dark:text-brutal-fgDark/60">
            {t.owner}
          </p>
        </div>
      </div>
    </header>
  );
}