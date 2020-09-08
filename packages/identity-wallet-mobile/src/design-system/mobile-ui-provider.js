import React, { useContext } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { CustomPaperTheme } from './paper-theme';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { Theme } from './theme';

export const PaperThemeContext = React.createContext(CustomPaperTheme);
export const ThemeContext = React.createContext(Theme);

export const withPaperTheme = WrappedComponent => props => {
  const theme = useContext(PaperThemeContext);
  return <WrappedComponent {...props} theme={theme} />;
};

export const withTheme = WrappedComponent => props => {
  const theme = useContext(Theme);
  return <WrappedComponent {...props} theme={theme} />;
};

export const MobileUIProvider = (props) => {
  return (
    <PaperProvider>
      <StyledThemeProvider theme={Theme}>
        <ThemeContext.Provider value={Theme}>
          <PaperThemeContext.Provider value={CustomPaperTheme}>
            { props.children }
          </PaperThemeContext.Provider>
        </ThemeContext.Provider>
      </StyledThemeProvider>
    </PaperProvider>
  );
};
