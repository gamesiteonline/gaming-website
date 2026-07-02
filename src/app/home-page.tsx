'use client';

import { useState, useEffect } from 'react';
import { Header, Footer, LanguageModal, ContactModal } from '@/components/layout';
import { GameGrid, GameFilters } from '@/components/games';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { fetchGamesFromGitHub, getUniquePlatforms, getUniqueGenres, filterGames, sortGames, type Game } from '@/lib/game-data';
import { getTranslation, type Language } from '@/translations';
import { Button } from '@/components/ui';

export function HomePage() {
  const { language, setLanguage, t } = useLanguage();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    platforms: [] as string[],
    genres: [] as string[],
    ratingMin: 0,
    ratingMax: 10,
    sizeMin: 0,
    sizeMax: 100000,
  });

  // Fetch games on mount
  useEffect(() => {
    let mounted = true;
    async function loadGames() {
      try {
        setIsLoading(true);
        const data = await fetchGamesFromGitHub();
        if (mounted) {
          setGames(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(t.error);
          console.error('Failed to load games:', err);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    loadGames();
    return () => { mounted = false; };
  }, [t.error]);

  // Compute unique platforms and genres
  const platforms = getUniquePlatforms(games);
  const genres = getUniqueGenres(games);

  // Apply filters
  const filteredGames = filterGames(games, filters);
  const sortedGames = sortGames(filteredGames, 'name', 'asc');

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
  };

  const handleDownload = (game: Game) => {
    window.open(game.DownloadLink, '_blank');
  };

  const handleCloseDetail = () => {
    setSelectedGame(null);
  };

  // Check if language was already selected
  useEffect(() => {
    const saved = localStorage.getItem('gamesite-language');
    if (!saved) {
      setShowLanguageModal(true);
    }
  }, []);

  if (error && games.length === 0) {
    return (
      <div className="min-h-screen brutal-container flex items-center justify-center p-8">
        <div className="brutal-card dark:brutal-card-dark p-8 text-center max-w-md">
          <svg className="w-16 h-16 mx-auto mb-4 text-brutal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="brutal-heading-3 mb-2">{t.error}</h2>
          <p className="brutal-text text-brutal-fg/60 dark:text-brutal-fgDark/60 mb-6">
            Failed to load game database. Please try again later.
          </p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            {t.retry}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header
        currentLanguage={language}
        onLanguageChange={setLanguage}
        onContactClick={() => setShowContactModal(true)}
      />

      <main className="pt-20 pb-16">
        <div className="brutal-container">
          {/* Hero Section */}
          <section className="brutal-section text-center">
            <h1 className="brutal-heading-1 mb-4 text-brutal-primary">
              {t.siteTitle}
            </h1>
            <p className="brutal-heading-3 text-brutal-fg/70 dark:text-brutal-fgDark/70 max-w-3xl mx-auto mb-8">
              {t.footerText}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" onClick={() => document.getElementById('games')?.scrollIntoView()}>
                Browse Games
              </Button>
              <Button variant="outline" size="lg" onClick={() => setShowContactModal(true)}>
                {t.contact}
              </Button>
            </div>
          </section>

          {/* Stats */}
          <section className="brutal-section" aria-label="Statistics">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="brutal-card-dark border-brutal-border-dark border-brutal p-6 text-center">
                <p className="brutal-heading-1 text-brutal-primary">{games.length.toLocaleString()}</p>
                <p className="brutal-text-sm text-brutal-fgDark/60">Total Games</p>
              </div>
              <div className="brutal-card-dark border-brutal-border-dark border-brutal p-6 text-center">
                <p className="brutal-heading-1 text-brutal-accent">{platforms.length}</p>
                <p className="brutal-text-sm text-brutal-fgDark/60">Platforms</p>
              </div>
              <div className="brutal-card-dark border-brutal-border-dark border-brutal p-6 text-center">
                <p className="brutal-heading-1 text-brutal-secondary">{genres.length}</p>
                <p className="brutal-text-sm text-brutal-fgDark/60">Genres</p>
              </div>
              <div className="brutal-card-dark border-brutal-border-dark border-brutal p-6 text-center">
                <p className="brutal-heading-1 text-brutal-primary">∞</p>
                <p className="brutal-text-sm text-brutal-fgDark/60">Possibilities</p>
              </div>
            </div>
          </section>

          {/* Games Section */}
          <section id="games" className="brutal-section" aria-labelledby="games-heading">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 id="games-heading" className="brutal-heading-2">
                {t.games || 'All Games'}
              </h2>
              <div className="flex items-center gap-2">
                <span className="brutal-badge-primary">
                  {sortedGames.length} {t.results}
                </span>
              </div>
            </div>

            {/* Filters */}
            <GameFilters
              filters={filters}
              onFiltersChange={setFilters}
              platforms={platforms}
              genres={genres}
              currentLanguage={language}
              totalGames={games.length}
              filteredCount={sortedGames.length}
            />

            {/* Game Grid */}
            <GameGrid
              games={sortedGames}
              currentLanguage={language}
              onGameClick={handleGameClick}
              isLoading={isLoading}
            />
          </section>
        </div>
      </main>

      <Footer currentLanguage={language} />

      {/* Modals */}
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

      {/* Game Detail Modal */}
      {selectedGame && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="game-detail-title">
          <div className="w-full max-w-6xl brutal-card dark:brutal-card-dark animate-in min-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-brutal-border dark:border-brutal-border-dark sticky top-0 bg-brutal-bg dark:bg-brutal-bgDark z-10">
              <h2 id="game-detail-title" className="brutal-heading-4">{selectedGame.FileName}</h2>
              <Button variant="ghost" size="sm" onClick={handleCloseDetail}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {/* Render game detail inline */}
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="aspect-[3/4] relative bg-brutal-muted dark:bg-brutal-mutedDark overflow-hidden">
                    <img
                      src={selectedGame.CoverArtLink}
                      alt={`${selectedGame.FileName} cover art`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="brutal-badge-accent text-sm font-brutal font-semibold border-brutal-border dark:border-brutal-border-dark border-brutal px-3 py-1 shadow-brutal-sm">
                        {selectedGame.Platform}
                      </span>
                      <span className="brutal-badge-primary text-sm font-brutal font-semibold px-3 py-1 shadow-brutal-sm">
                        {selectedGame.Rating}
                      </span>
                      <span className="brutal-badge-secondary text-sm font-brutal font-semibold px-3 py-1 shadow-brutal-sm">
                        {selectedGame.Size}
                      </span>
                      <span className="brutal-badge text-sm font-brutal font-semibold border-brutal-border dark:border-brutal-border-dark border-brutal px-3 py-1 shadow-brutal-sm">
                        {selectedGame.Extension}
                      </span>
                    </div>
                    <div>
                      <h3 className="brutal-heading-4 mb-2">{t.description}</h3>
                      <p className="brutal-text text-brutal-fg/80 dark:text-brutal-fgDark/80 whitespace-pre-wrap">
                        {selectedGame.Description}
                      </p>
                    </div>
                    <div>
                      <h3 className="brutal-heading-4 mb-2">{t.compatibility}</h3>
                      <p className="brutal-text text-brutal-fg/80 dark:text-brutal-fgDark/80 whitespace-pre-wrap">
                        {selectedGame.Compatibility}
                      </p>
                    </div>
                    <div>
                      <h3 className="brutal-heading-4 mb-2">{t.genre}</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedGame.Genre.split(',').map(g => g.trim()).map(genre => (
                          <span key={genre} className="brutal-badge text-sm font-brutal font-semibold border-brutal-border dark:border-brutal-border-dark border-brutal px-3 py-1 shadow-brutal-sm">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-6">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full brutal-btn-lg"
                      onClick={() => handleDownload(selectedGame)}
                    >
                      {t.downloadNow}
                    </Button>
                    <div className="brutal-card-dark border-brutal-border-dark border-brutal p-4 space-y-3">
                      <h3 className="brutal-heading-4 text-brutal-accent">{t.downloadProtocol}</h3>
                      <div className="brutal-badge-primary text-sm">
                        {t.telegramNotice}
                      </div>
                      <a
                        href="https://t.me/gamesiteonlinetz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block brutal-btn-secondary text-center"
                      >
                        Open Telegram Bot
                      </a>
                      <div className="brutal-divider" />
                      <p className="brutal-text-sm text-center">
                        {t.whatsappInvite}
                      </p>
                      <a
                        href="https://whatsapp.com/channel/0029VbChyDUI1rcht5jajL3q"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block brutal-btn-outline text-center"
                      >
                        Join WhatsApp Channel
                      </a>
                    </div>
                    <div className="pt-4 border-t border-brutal-border dark:border-brutal-border-dark">
                      <p className="brutal-text-sm text-brutal-fg/60 dark:text-brutal-fgDark/60 mb-2">
                        Direct Download:
                      </p>
                      <a
                        href={selectedGame.DownloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brutal-mono text-sm text-brutal-primary hover:text-brutal-primary/80 break-all block p-3 brutal-card-dark border-brutal-border-dark border-brutal"
                      >
                        {selectedGame.DownloadLink}
                      </a>
                    </div>
                    <div className="pt-4 border-t border-brutal-border dark:border-brutal-border-dark">
                      <p className="brutal-text-sm text-brutal-fg/60 dark:text-brutal-fgDark/60 mb-1">
                        Game ID:
                      </p>
                      <code className="brutal-mono text-brutal-fg/80 dark:text-brutal-fgDark/80">
                        {selectedGame.GameID}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}