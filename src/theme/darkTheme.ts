import { createTheme, MantineThemeOverride } from '@mantine/core';
import { theme } from './theme';

export const darkTheme: MantineThemeOverride = createTheme({
  ...theme,
  components: {
    NavLink: {
      defaultProps: {
        c: 'gray.4',
      },
    },
    Title: {
      defaultProps: {
        c: 'gray.2',
      },
    },
    Text: {
      defaultProps: {
        c: 'gray.2',
      },
    },
  },
});
