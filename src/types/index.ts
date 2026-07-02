export type Language = 'en' | 'sw';

export interface Game {
  GameID: string;
  FileName: string;
  Extension: string;
  Platform: string;
  Genre: string;
  Rating: string;
  Description: string;
  Compatibility: string;
  Size: string;
  DownloadLink: string;
  CoverArtLink: string;
}

export interface GameFilters {
  search: string;
  platforms: string[];
  genres: string[];
  ratingMin: number;
  ratingMax: number;
  sizeMin: number; // in MB
  sizeMax: number; // in MB
}

export interface PlatformStats {
  name: string;
  count: number;
}

export interface GenreStats {
  name: string;
  count: number;
}

export interface ContactOption {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  href?: string;
}

export interface TranslationKeys {
  // Language Selection
  selectLanguage: string;
  english: string;
  kiswahili: string;
  continue: string;

  // Header
  siteTitle: string;
  siteSubtitle: string;
  owner: string;

  // Navigation
  home: string;
  games: string;
  contact: string;
  search: string;

  // Game Filters
  filterByPlatform: string;
  filterByGenre: string;
  filterByRating: string;
  filterBySize: string;
  allPlatforms: string;
  allGenres: string;
  clearFilters: string;
  noGamesFound: string;
  gamesFound: string;

  // Game Card
  platform: string;
  genre: string;
  rating: string;
  size: string;
  download: string;
  viewDetails: string;

  // Game Detail
  gameDetails: string;
  description: string;
  compatibility: string;
  downloadNow: string;
  downloadProtocol: string;
  telegramNotice: string;
  whatsappInvite: string;
  backToGames: string;

  // Contact Modal
  contactUs: string;
  contactOptions: string;
  whatsapp: string;
  whatsappDesc: string;
  sms: string;
  smsDesc: string;
  email: string;
  emailDesc: string;
  telegram: string;
  telegramDesc: string;
  phoneNumber: string;
  copyPhone: string;
  copied: string;

  // Footer
  footerText: string;
  madeWith: string;
  tanzania: string;

  // Common
  loading: string;
  error: string;
  retry: string;
}