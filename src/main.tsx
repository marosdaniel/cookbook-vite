import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';

import { client } from './utils/graphqlClientConfig.ts';
import { persistor, store } from './store';
import App from './App.tsx';
import IntlProviderContainer from './providers/IntlProviderContainer';
import MantineProviderContainer from './providers/MantineProviderContainer';

const helmetContext = {};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IntlProviderContainer>
            <MantineProviderContainer>
              <Notifications limit={5} />
              <HelmetProvider context={helmetContext}>
                <ModalsProvider>
                  <App />
                </ModalsProvider>
              </HelmetProvider>
            </MantineProviderContainer>
          </IntlProviderContainer>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
);
