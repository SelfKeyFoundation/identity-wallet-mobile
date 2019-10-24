import { DefaultTheme } from 'react-native-paper';
import { Theme } from './theme';

export const CustomPaperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Theme.colors.primary,
  },
  fonts: {
    regular: Theme.fonts.regular,
    medium: Theme.fonts.bold,
    light: Theme.fonts.light,
    thin: Theme.fonts.thin,
  },
};
