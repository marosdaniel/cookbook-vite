import { TLanguageLocales } from '../providers/IntlProviderContainer/types';

export const getBrowserLocale = (): TLanguageLocales => {
  const defaultLocale = 'hu_HU';
  const browserLanguage = navigator.language || navigator.languages[0];
  return (browserLanguage.replace('-', '_') as TLanguageLocales) || defaultLocale;
};
