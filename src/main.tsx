import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, MantineProvider } from '@mantine/core';
import App from './App.tsx';
import '@mantine/core/styles.css';

// import { theme } from './theme';

const theme = createTheme({ fontFamily: 'Open Sans, sans-serif', primaryColor: 'cyan' });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
