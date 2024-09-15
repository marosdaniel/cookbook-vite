export type TLanguageLocales = 'en_GB' | 'hu_HU' | 'es_ES' | 'de_DE';
export type TLanguageCodes = 'en-gb' | 'hu-hu' | 'es-es' | 'de-de';

export interface ILanguageOption {
  languageCode: TLanguageCodes;
  label: string;
  locale: TLanguageLocales;
  flag: string;
}

export interface MiscMessages {
  [key: string]: { id: string; defaultMessage: string };
}
