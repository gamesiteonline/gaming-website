'use client';

import { Game } from '@/types';
import { Header, Footer, LanguageModal, ContactModal } from '@/components/layout';
import { GameDetail } from '@/components/games';
import { useLanguage, Providers } from '@/components/providers';
import { getTranslation, type Language } from '@/translations';
import { useState } from 'react';

interface GameDetailPageClientProps {
  game: Game;
}

export function GameDetailPageClient({ game }: GameDetailPageClientProps) {
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleDownload = (game: Game) => {
    // Open download link in new tab
    window.open(game.DownloadLink, '_blank');
    // Also open Telegram bot
    setTimeout(() => {
      window.open('https://t.me/gamesiteonlinetz', '_blank');
    }, 500);
  };

  return (
    <div className="min-h-screen">
      <Header
        currentLanguage={language}
        onLanguageChange={setLanguage}
        onContactClick={() => setShowContactModal(true)}
      />

      <main className="pt-20">
        <GameDetail
          game={game}
          currentLanguage={language}
          onBack={() => window.history.back()}
          onDownload={handleDownload}
        />
      </main>

      <Footer currentLanguage={language} />

      <LanguageModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        onSelectLanguage={(lang) => {
          setLanguage(lang);
          setShowLanguageModal(false);
        }}
      />

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        currentLanguage={language}
      />
    </div>
  );
}

export default function GameDetailPage({ game }: { game: Game }) {
  return (
    <Providers>
      <GameDetailPageClient game={game} />
    </Providers>
  );
}