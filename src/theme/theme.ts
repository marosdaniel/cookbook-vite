import { Anchor, Checkbox, createTheme, MantineThemeOverride, TextInput } from '@mantine/core';

export const theme: MantineThemeOverride = createTheme({
  // fontFamily: 'Segoe UI',
  primaryColor: 'pink',
  colors: {
    'bright-pink': [
      '#F0BBDD',
      '#ED9BCF',
      '#EC7CC3',
      '#ED5DB8',
      '#F13EAF',
      '#F71FA7',
      '#FF00A1',
      '#E00890',
      '#C50E82',
      '#AD1374',
    ],
  },
  autoContrast: true,
  luminanceThreshold: 0.61,
  components: {
    Button: {
      defaultProps: {
        color: 'pink.7',
      },
    },
    Anchor: {
      defaultProps: {
        color: 'pink.7',
      },
    },
    TextInput: {
      defaultProps: {
        color: 'pink.7',
      },
    },
    PasswordInput: {
      defaultProps: {
        color: 'pink.7',
      },
    },
    Checkbox: {
      defaultProps: {
        color: 'pink.7',
      },
    },
  },
});
