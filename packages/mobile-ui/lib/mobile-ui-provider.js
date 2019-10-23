import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { CustomPaperTheme } from './paper-theme';

export const ThemeContext = React.createContext(CustomPaperTheme);

export const MobileUIProvider = (props) => {
  return (
    <PaperProvider>
      <ThemeContext.Provider value={CustomPaperTheme}>
        { props.children }
      </ThemeContext.Provider>
    </PaperProvider>
  );
};
