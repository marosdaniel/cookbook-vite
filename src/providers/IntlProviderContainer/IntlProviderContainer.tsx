import { PropsWithChildren, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { TLanguageLocales } from './types';
import { LANGUAGE_OPTIONS } from './consts';
import { useGlobalState } from '../../store/Global';

const IntlProviderContainer = ({ children }: PropsWithChildren) => {
  const { locale } = useGlobalState();
  const [messages, setMessages] = useState({});

  useEffect(() => {
    async function loadMessages(languageCode: TLanguageLocales) {
      const response = await fetch(`/i18/${languageCode}.json`);
      const data = await response.json();
      setMessages(data);
    }

    loadMessages(locale);
  }, [locale]);

  return (
    <IntlProvider
      locale={LANGUAGE_OPTIONS.find(option => option.locale === locale)?.languageCode ?? 'en-gb'}
      messages={messages}
    >
      {children}
    </IntlProvider>
  );
};

export default IntlProviderContainer;
