import { PropsWithChildren, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { useGlobalState } from '../../store/Global';
import { LANGUAGE_OPTIONS, localeMap } from './consts';

const IntlProviderContainer = ({ children }: PropsWithChildren) => {
  const { locale } = useGlobalState();
  const [messages, setMessages] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const loadMessages = async (locale: string) => {
      const languageCode = localeMap[locale] || 'en_GB';

      try {
        const response = await fetch(`/i18/${languageCode}.json`);

        if (!response.ok) {
          throw new Error(`Failed to load ${languageCode}.json: ${response.status}`);
        }

        if (response.headers.get('content-type')?.includes('application/json')) {
          const data = await response.json();
          setMessages(data);
        } else {
          throw new Error(`Non-JSON response for ${languageCode}`);
        }
      } catch (error) {
        console.error('Error loading language file:', error);
        setMessages(null);
      }
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
