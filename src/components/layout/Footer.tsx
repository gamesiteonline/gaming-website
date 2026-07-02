'use client';

import { getTranslation, type Language } from '@/translations';

interface FooterProps {
  currentLanguage: Language;
}

export function Footer({ currentLanguage }: FooterProps) {
  const t = getTranslation(currentLanguage);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-brutal-border dark:border-brutal-border-dark bg-brutal-muted/30 dark:bg-brutal-mutedDark/30">
      <div className="brutal-container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="brutal-heading-4 text-brutal-primary">
              {t.siteTitle}
            </p>
            <p className="brutal-text-sm text-brutal-fg/60 dark:text-brutal-fgDark/60 mt-1">
              {t.footerText}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-2">
            <p className="brutal-text-sm text-brutal-fg/60 dark:text-brutal-fgDark/60">
              {t.madeWith} ❤️ {t.tanzania}
            </p>
            <p className="brutal-mono text-xs text-brutal-fg/40 dark:text-brutal-fgDark/40">
              © {currentYear} GAMESITEONLINE. All rights reserved.
            </p>
            <p className="brutal-mono text-xs text-brutal-fg/40 dark:text-brutal-fgDark/40">
              {t.owner}
            </p>
          </div>
        </div>

        <div className="brutal-divider my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
          <a
            href="https://whatsapp.com/channel/0029VbChyDUI1rcht5jajL3q"
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn-ghost text-sm px-3 py-1 hover:text-brutal-primary"
          >
            WhatsApp Channel
          </a>
          <a
            href="https://t.me/faliz_AI"
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn-ghost text-sm px-3 py-1 hover:text-brutal-secondary"
          >
            Telegram
          </a>
          <a
            href="mailto:gamesiteonlinetz@gmail.com"
            className="brutal-btn-ghost text-sm px-3 py-1 hover:text-brutal-accent"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}