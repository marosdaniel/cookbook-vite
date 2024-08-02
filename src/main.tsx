import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { PersistGate } from 'redux-persist/integration/react';
import { MantineProvider } from '@mantine/core';
import { client } from './utils/graphqlClientConfig.ts';
import '@mantine/core/styles.css';
import { persistor, store } from './store';
import { theme } from './theme';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MantineProvider theme={theme}>
            <App />
          </MantineProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
);
