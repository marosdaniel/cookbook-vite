import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { IntlProvider } from 'react-intl';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';

import { client } from './utils/graphqlClientConfig.ts';
import { persistor, store } from './store';
import { theme } from './theme';
import App from './App.tsx';

const helmetContext = {};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IntlProvider locale="en-GB" messages={{}}>
            <MantineProvider theme={theme}>
              <Notifications limit={5} />
              <HelmetProvider context={helmetContext}>
                <ModalsProvider>
                  <App />
                </ModalsProvider>
              </HelmetProvider>
            </MantineProvider>
          </IntlProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
);
