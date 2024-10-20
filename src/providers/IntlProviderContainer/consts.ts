import { ILanguageOption, TLanguageLocales } from './types';

export const LANGUAGE_OPTIONS: ILanguageOption[] = [
  {
    languageCode: 'en-gb',
    label: 'English',
    locale: 'en_GB',
    flag: '🇬🇧',
  },
  {
    languageCode: 'hu-hu',
    label: 'Hungarian',
    locale: 'hu_HU',
    flag: '🇭🇺',
  },
  {
    languageCode: 'es-es',
    label: 'Spanish',
    locale: 'es_ES',
    flag: '🇪🇸',
  },

  {
    languageCode: 'de-de',
    label: 'German',
    locale: 'de_DE',
    flag: '🇩🇪',
  },
];

export const localeMap: Record<string, TLanguageLocales> = {
  hu: 'hu_HU',
  en: 'en_GB',
  es: 'es_ES',
  de: 'de_DE',
};
