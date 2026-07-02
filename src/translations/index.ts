import { en } from './en';
import { sw } from './sw';

export type Language = 'en' | 'sw';

export const translations: Record<Language, typeof en> = {
  en,
  sw,
};

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'sw', name: 'Kiswahili', nativeName: 'Kiswahili' },
] as const;

export function getTranslation(lang: Language) {
  return translations[lang] || translations.en;
}