import { DefaultTheme } from 'react-native-paper';
import { Theme } from './theme';

export const CustomPaperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Theme.colors.uiPrimary,
  },
};
