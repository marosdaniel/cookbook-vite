import { MantineProvider } from '@mantine/core';
import React, { PropsWithChildren } from 'react';
import { theme } from '../../theme';
import { useGlobalState } from '../../store/Global';

const MantineProviderContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { isDarkMode } = useGlobalState();

  return (
    <MantineProvider theme={theme} defaultColorScheme={!isDarkMode ? 'light' : 'dark'}>
      {children}
    </MantineProvider>
  );
};

export default MantineProviderContainer;
