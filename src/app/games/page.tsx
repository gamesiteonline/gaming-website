'use client';

import { useState, useMemo } from 'react';
import { Game, PlatformStats, GenreStats } from '@/types';
import { Header, Footer, LanguageModal, ContactModal } from '@/components/layout';
import { GameGrid, GameFilters } from '@/components/games';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { getTranslation, type Language } from '@/translations';
import { filterGames, sortGames } from '@/lib/game-data';
import { Providers } from '@/components/providers';

interface GamesPageClientProps {
  initialGames: Game[];
  initialPlatforms: PlatformStats[];
  initialGenres: GenreStats[];
}

export function GamesPageClient({ 
  initialGames, 
  initialPlatforms, 
  initialGenres 
}: GamesPageClientProps) {
  const { language, setLanguage, t } = useLanguage();
  const [games] = useState(initialGames);
  const [platforms] = useState(initialPlatforms);
  const [genres] = useState(initialGenres);
  const [filters, setFilters] = useState({
    search: '',
    platforms: [] as string[],
    genres: [] as string[],
    ratingMin: 0,
    ratingMax: 10,
    sizeMin: 0,
    sizeMax: 100000,
  });
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'size' | 'platform'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // Apply filters
  const filteredGames = useMemo(() => filterGames(games, filters), [games, filters]);
  // Apply sorting
  const sortedGames = useMemo(() => sortGames(filteredGames, sortBy, sortOrder), [filteredGames, sortBy, sortOrder]);

  const handleSortChange = (field: 'name' | 'rating' | 'size' | 'platform') => {
    setSortBy(prev => {
      if (prev === field) {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortOrder('asc');
      }
      return field;
    });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      platforms: [],
      genres: [],
      ratingMin: 0,
      ratingMax: 10,
      sizeMin: 0,
      sizeMax: 100000,
    });
  };

  const hasActiveFilters = 
    filters.search ||
    filters.platforms.length > 0 ||
    filters.genres.length > 0 ||
    filters.ratingMin > 0 ||
    filters.ratingMax < 10 ||
    filters.sizeMin > 0 ||
    filters.sizeMax < 100000;

  return (
    <div className="min-h-screen">
      <Header
        currentLanguage={language}
        onLanguageChange={setLanguage}
        onContactClick={() => setShowContactModal(true)}
      />

      <main className="pt-20 pb-16">
        <div className="brutal-container">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="brutal-heading-2">{t.games || 'All Games'}</h1>
            <div className="flex items-center gap-2">
              <span className="brutal-badge-primary">
                {sortedGames.length} / {games.length} {t.results}
              </span>
            </div>
          </div>

          <div className="brutal-card dark:brutal-card-dark p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className="brutal-text-sm font-semibold">{t.search}:</span>
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value as any)}
                  className="brutal-input py-2 px-3 text-sm w-auto"
                >
                  <option value="name">{t.search} by Name</option>
                  <option value="rating">{t.search} by Rating</option>
                  <option value="size">{t.search} by Size</option>
                  <option value="platform">{t.search} by Platform</option>
                </select>
                <button
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="brutal-btn-ghost p-2"
                  aria-label={sortOrder === 'asc' ? 'Sort descending' : 'Sort ascending'}
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  {t.clearFilters}
                </Button>
              )}
            </div>
          </div>

          <GameFilters
            filters={filters}
            onFiltersChange={setFilters}
            platforms={platforms}
            genres={genres}
            currentLanguage={language}
            totalGames={games.length}
            filteredCount={sortedGames.length}
          />

          <GameGrid
            games={sortedGames}
            currentLanguage={language}
            onGameClick={() => {}}
            isLoading={false}
          />
        </div>
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

export default function GamesPage() {
  return (
    <Providers>
      <GamesPageClient 
        initialGames={[]} 
        initialPlatforms={[]} 
        initialGenres={[]} 
      />
    </Providers>
  );
}