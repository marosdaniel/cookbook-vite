import { TLanguageLocales } from '../../providers/IntlProviderContainer/types';

export interface IGlobalState {
  locale: TLanguageLocales;
  isDarkMode: boolean;
}
