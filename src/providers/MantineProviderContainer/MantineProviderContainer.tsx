import { MantineProvider } from '@mantine/core';
import React, { PropsWithChildren } from 'react';
import { useGlobalState } from '../../store/Global';
import { darkTheme, theme } from '../../theme';

const MantineProviderContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { isDarkMode } = useGlobalState();

  return (
    <MantineProvider theme={!isDarkMode ? theme : darkTheme} defaultColorScheme={!isDarkMode ? 'light' : 'dark'}>
      {children}
    </MantineProvider>
  );
};

export default MantineProviderContainer;
