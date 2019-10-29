import { DefaultTheme } from 'react-native-paper';
import { Theme } from './theme';

export const CustomPaperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Theme.colors.primary,
    primaryDisabled: Theme.colors.primaryDisabled,
    text: Theme.colors.white,
  },
  roundness: 4,
  fonts: {
    regular: Theme.fonts.regular,
    medium: Theme.fonts.bold,
    light: Theme.fonts.light,
    thin: Theme.fonts.thin,
  },
};
