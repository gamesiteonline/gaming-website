'use client';

import { useState, useCallback } from 'react';
import { GameFilters, PlatformStats, GenreStats } from '@/types';
import { Input, Select, Button, Badge } from '@/components/ui';
import { getTranslation, type Language } from '@/translations';
import { cn } from '@/lib/utils';

interface GameFiltersProps {
  filters: GameFilters;
  onFiltersChange: (filters: GameFilters) => void;
  platforms: PlatformStats[];
  genres: GenreStats[];
  currentLanguage: Language;
  totalGames: number;
  filteredCount: number;
}

export function GameFilters({
  filters,
  onFiltersChange,
  platforms,
  genres,
  currentLanguage,
  totalGames,
  filteredCount,
}: GameFiltersProps) {
  const t = getTranslation(currentLanguage);
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = useCallback(<T extends keyof GameFilters>(key: T, value: GameFilters[T]) => {
    onFiltersChange({ ...filters, [key]: value });
  }, [filters, onFiltersChange]);

  const clearAllFilters = useCallback(() => {
    onFiltersChange({
      search: '',
      platforms: [],
      genres: [],
      ratingMin: 0,
      ratingMax: 10,
      sizeMin: 0,
      sizeMax: 100000,
    });
  }, [onFiltersChange]);

  const hasActiveFilters = 
    filters.search ||
    filters.platforms.length > 0 ||
    filters.genres.length > 0 ||
    filters.ratingMin > 0 ||
    filters.ratingMax < 10 ||
    filters.sizeMin > 0 ||
    filters.sizeMax < 100000;

  return (
    <div className="brutal-card dark:brutal-card-dark p-4 mb-6 animate-in">
      {/* Results Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="brutal-heading-4">
            {filteredCount} / {totalGames} {t.results}
          </span>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              {t.clearFilters}
            </Button>
          )}
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <Input
          label={t.search}
          placeholder={t.searchPlaceholder}
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="w-full"
        />
      </div>

      {/* Filter Toggles */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={isExpanded ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="whitespace-nowrap"
        >
          {t.filters} {isExpanded ? '▲' : '▼'}
        </Button>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-4 animate-in">
          <div className="brutal-divider" />

          {/* Platform Filter */}
          <div>
            <label className="brutal-label">{t.filterByPlatform}</label>
            <Select
              options={[
                { value: '', label: t.allPlatforms },
                ...platforms.map(p => ({ value: p.name, label: `${p.name} (${p.count})` })),
              ]}
              value={filters.platforms[0] || ''}
              onChange={(e) => updateFilter('platforms', e.target.value ? [e.target.value] : [])}
              placeholder={t.allPlatforms}
            />
          </div>

          {/* Genre Filter */}
          <div>
            <label className="brutal-label">{t.filterByGenre}</label>
            <Select
              options={[
                { value: '', label: t.allGenres },
                ...genres.slice(0, 20).map(g => ({ value: g.name, label: `${g.name} (${g.count})` })),
              ]}
              value={filters.genres[0] || ''}
              onChange={(e) => updateFilter('genres', e.target.value ? [e.target.value] : [])}
              placeholder={t.allGenres}
            />
          </div>

          {/* Rating Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="brutal-label">{t.filterByRating} (Min)</label>
              <Select
                options={[
                  { value: '0', label: '0+' },
                  { value: '5', label: '5+' },
                  { value: '6', label: '6+' },
                  { value: '7', label: '7+' },
                  { value: '8', label: '8+' },
                  { value: '9', label: '9+' },
                ]}
                value={filters.ratingMin.toString()}
                onChange={(e) => updateFilter('ratingMin', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="brutal-label">{t.filterByRating} (Max)</label>
              <Select
                options={[
                  { value: '10', label: '10' },
                  { value: '9', label: '9' },
                  { value: '8', label: '8' },
                  { value: '7', label: '7' },
                  { value: '6', label: '6' },
                  { value: '5', label: '5' },
                ]}
                value={filters.ratingMax.toString()}
                onChange={(e) => updateFilter('ratingMax', parseFloat(e.target.value))}
              />
            </div>
          </div>

          {/* Size Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="brutal-label">{t.filterBySize} (Min MB)</label>
              <Input
                type="number"
                min="0"
                value={filters.sizeMin}
                onChange={(e) => updateFilter('sizeMin', parseInt(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
            <div>
              <label className="brutal-label">{t.filterBySize} (Max MB)</label>
              <Input
                type="number"
                min="0"
                value={filters.sizeMax}
                onChange={(e) => updateFilter('sizeMax', parseInt(e.target.value) || 100000)}
                placeholder="100000"
              />
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="primary" onClick={() => updateFilter('search', '')} className="cursor-pointer">
              {t.search}: "{filters.search}" ×
            </Badge>
          )}
          {filters.platforms.map(p => (
            <Badge key={p} variant="secondary" onClick={() => updateFilter('platforms', filters.platforms.filter(x => x !== p))} className="cursor-pointer">
              {t.platform}: {p} ×
            </Badge>
          ))}
          {filters.genres.map(g => (
            <Badge key={g} variant="accent" onClick={() => updateFilter('genres', filters.genres.filter(x => x !== g))} className="cursor-pointer">
              {t.genre}: {g} ×
            </Badge>
          ))}
          {(filters.ratingMin > 0 || filters.ratingMax < 10) && (
            <Badge variant="primary">
              {t.rating}: {filters.ratingMin}-{filters.ratingMax}
            </Badge>
          )}
          {(filters.sizeMin > 0 || filters.sizeMax < 100000) && (
            <Badge variant="secondary">
              {t.size}: {filters.sizeMin}-{filters.sizeMax} MB
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}