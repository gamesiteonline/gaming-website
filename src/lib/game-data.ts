import { Game, PlatformStats, GenreStats } from '@/types';

// Platform mappings from the database
const PLATFORM_FILES = {
  'DOS': 'DOS_Games.json',
  'Sony PlayStation 1': 'PS1_PSX.json',
  'Sony PlayStation 2': 'PS2_PSP.json',
  'Sony PlayStation 3': 'PS3_PS4_Labels.json',
  'Microsoft Xbox 360': 'XBOX_360.json',
  'PC Dreamcast': 'PC_Dreamcast.json',
  'Mobile APKs/IPAs': 'Mobile_APKs_IPAs.json',
} as const;

const BASE_URL = 'https://raw.githubusercontent.com/gamesiteonline/game-database/master';

export async function fetchGamesFromGitHub(): Promise<Game[]> {
  const allGames: Game[] = [];

  for (const [platform, filename] of Object.entries(PLATFORM_FILES)) {
    try {
      const response = await fetch(`${BASE_URL}/${filename}`, {
        next: { revalidate: 3600 }, // Revalidate every hour
      });
      if (response.ok) {
        const games = await response.json();
        // Add platform info if not present
        const gamesWithPlatform = games.map((game: Game) => ({
          ...game,
          Platform: game.Platform || platform,
        }));
        allGames.push(...gamesWithPlatform);
      }
    } catch (error) {
      console.error(`Failed to fetch ${filename}:`, error);
    }
  }

  return allGames;
}

export async function fetchGameById(gameId: string): Promise<Game | null> {
  const allGames = await fetchGamesFromGitHub();
  return allGames.find(game => game.GameID === gameId) || null;
}

export function getUniquePlatforms(games: Game[]): PlatformStats[] {
  const platformMap = new Map<string, number>();
  games.forEach(game => {
    const platform = game.Platform;
    platformMap.set(platform, (platformMap.get(platform) || 0) + 1);
  });
  return Array.from(platformMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getUniqueGenres(games: Game[]): GenreStats[] {
  const genreMap = new Map<string, number>();
  games.forEach(game => {
    // Split genres by comma
    const genres = game.Genre.split(',').map(g => g.trim());
    genres.forEach(genre => {
      genreMap.set(genre, (genreMap.get(genre) || 0) + 1);
    });
  });
  return Array.from(genreMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function parseSizeToMB(sizeStr: string): number {
  const match = sizeStr.match(/^([\d.]+)\s*(KB|MB|GB)$/i);
  if (!match) return 0;
  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();
  switch (unit) {
    case 'KB': return value / 1024;
    case 'MB': return value;
    case 'GB': return value * 1024;
    default: return 0;
  }
}

export function filterGames(games: Game[], filters: {
  search?: string;
  platforms?: string[];
  genres?: string[];
  ratingMin?: number;
  ratingMax?: number;
  sizeMin?: number;
  sizeMax?: number;
}): Game[] {
  return games.filter(game => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const searchFields = [
        game.FileName,
        game.Description,
        game.Platform,
        game.Genre,
      ].join(' ').toLowerCase();
      if (!searchFields.includes(searchLower)) return false;
    }

    // Platform filter
    if (filters.platforms && filters.platforms.length > 0) {
      if (!filters.platforms.includes(game.Platform)) return false;
    }

    // Genre filter
    if (filters.genres && filters.genres.length > 0) {
      const gameGenres = game.Genre.split(',').map(g => g.trim());
      if (!filters.genres.some(g => gameGenres.includes(g))) return false;
    }

    // Rating filter
    const ratingMatch = game.Rating.match(/^([\d.]+)/);
    const rating = ratingMatch ? parseFloat(ratingMatch[1]) : 0;
    if (filters.ratingMin !== undefined && rating < filters.ratingMin) return false;
    if (filters.ratingMax !== undefined && rating > filters.ratingMax) return false;

    // Size filter
    const sizeMB = parseSizeToMB(game.Size);
    if (filters.sizeMin !== undefined && sizeMB < filters.sizeMin) return false;
    if (filters.sizeMax !== undefined && sizeMB > filters.sizeMax) return false;

    return true;
  });
}

export function sortGames(games: Game[], sortBy: 'name' | 'rating' | 'size' | 'platform', order: 'asc' | 'desc' = 'asc'): Game[] {
  return [...games].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'name':
        comparison = a.FileName.localeCompare(b.FileName);
        break;
      case 'rating': {
        const ratingA = parseFloat(a.Rating.match(/^([\d.]+)/)?.[1] || '0');
        const ratingB = parseFloat(b.Rating.match(/^([\d.]+)/)?.[1] || '0');
        comparison = ratingA - ratingB;
        break;
      }
      case 'size': {
        const sizeA = parseSizeToMB(a.Size);
        const sizeB = parseSizeToMB(b.Size);
        comparison = sizeA - sizeB;
        break;
      }
      case 'platform':
        comparison = a.Platform.localeCompare(b.Platform);
        break;
    }
    return order === 'asc' ? comparison : -comparison;
  });
}