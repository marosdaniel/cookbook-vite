import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { PersistGate } from 'redux-persist/integration/react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { client } from './utils/graphqlClientConfig.ts';
import { persistor, store } from './store';
import { theme } from './theme';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MantineProvider theme={theme}>
            <Notifications limit={5} />
            <App />
          </MantineProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
);
