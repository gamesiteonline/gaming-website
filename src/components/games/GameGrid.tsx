'use client';

import { Game, GameFilters } from '@/types';
import { GameCard } from './GameCard';
import { GameFilters as GameFiltersComponent } from './GameFilters';
import { useState, useMemo, useCallback } from 'react';
import { getTranslation, type Language } from '@/translations';
import { filterGames, sortGames, getUniquePlatforms, getUniqueGenres } from '@/lib/game-data';
import { Button, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface GameGridProps {
  games: Game[];
  currentLanguage: Language;
  onGameClick: (game: Game) => void;
}

export function GameGrid({ games, currentLanguage, onGameClick }: GameGridProps) {
  const t = getTranslation(currentLanguage);
  const [filters, setFilters] = useState<GameFilters>({
    search: '',
    platforms: [],
    genres: [],
    ratingMin: 0,
    ratingMax: 10,
    sizeMin: 0,
    sizeMax: 100000,
  });
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'size' | 'platform'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Get unique platforms and genres from games
  const platforms = useMemo(() => getUniquePlatforms(games), [games]);
  const genres = useMemo(() => getUniqueGenres(games), [games]);

  // Apply filters
  const filteredGames = useMemo(() => {
    return filterGames(games, filters);
  }, [games, filters]);

  // Apply sorting
  const sortedGames = useMemo(() => {
    return sortGames(filteredGames, sortBy, sortOrder);
  }, [filteredGames, sortBy, sortOrder]);

  const handleFilterChange = useCallback((newFilters: Partial<GameFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const handleSortChange = useCallback((field: 'name' | 'rating' | 'size' | 'platform') => {
    setSortBy(prev => {
      if (prev === field) {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortOrder('asc');
      }
      return field;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      platforms: [],
      genres: [],
      ratingMin: 0,
      ratingMax: 10,
      sizeMin: 0,
      sizeMax: 100000,
    });
  }, []);

  const hasActiveFilters = 
    filters.search ||
    filters.platforms.length > 0 ||
    filters.genres.length > 0 ||
    filters.ratingMin > 0 ||
    filters.ratingMax < 10 ||
    filters.sizeMin > 0 ||
    filters.sizeMax < 100000;

  return (
    <div className="space-y-6 animate-in">
      {/* Filters */}
      <GameFiltersComponent
        filters={filters}
        onFiltersChange={handleFilterChange}
        platforms={platforms}
        genres={genres}
        currentLanguage={currentLanguage}
        totalGames={games.length}
        filteredCount={sortedGames.length}
      />

      {/* Sort Controls */}
      <div className="flex flex-wrap items-center gap-4 p-4 brutal-card dark:brutal-card-dark border-brutal-border dark:border-brutal-border-dark border-brutal">
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

        <span className="brutal-text-sm text-brutal-fg/60 dark:text-brutal-fgDark/60 ml-auto">
          {sortedGames.length} {t.results}
        </span>
      </div>

      {/* Games Grid */}
      {sortedGames.length > 0 ? (
        <div className="brutal-grid">
          {sortedGames.map((game, index) => (
            <GameCard
              key={game.GameID}
              game={game}
              currentLanguage={currentLanguage}
              onClick={onGameClick}
              className="stagger-" + ((index % 6) + 1) as any
            />
          ))}
        </div>
      ) : (
        <div className="brutal-card dark:brutal-card-dark border-brutal-border dark:border-brutal-border-dark border-brutal p-12 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-brutal-fg/30 dark:text-brutal-fgDark/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="brutal-heading-3 mb-2">{t.noResults}</h3>
          <p className="brutal-text text-brutal-fg/60 dark:text-brutal-fgDark/60 mb-6">
            {t.noGamesFound}
          </p>
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearFilters}>
              {t.clearFilters}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}