import { PropsWithChildren, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { useGlobalState } from '../../store/Global';
import { TLanguageLocales } from './types';
import { LANGUAGE_OPTIONS } from './consts';

const IntlProviderContainer = ({ children }: PropsWithChildren) => {
  const { locale } = useGlobalState();
  const [messages, setMessages] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const loadMessages = async (languageCode: TLanguageLocales) => {
      const response = await fetch(`/i18/${languageCode}.json`);
      const data = await response.json();
      setMessages(data);
    };

    loadMessages(locale);
  }, [locale]);

  const languageCode = LANGUAGE_OPTIONS.find(option => option.locale === locale)?.languageCode ?? 'en-gb';

  if (!messages) {
    return null;
  }

  return (
    <IntlProvider locale={languageCode} messages={messages}>
      {children}
    </IntlProvider>
  );
};

export default IntlProviderContainer;
