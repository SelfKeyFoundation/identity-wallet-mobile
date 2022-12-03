// @flow
import React from 'react';
import './setup-redux';
import './inject-system';
// import './rn-identity-vault/index';
import './db';
import { createStoreProvider } from 'core/redux';
import { MobileUIProvider } from 'design-system';
// import { TermsOfService } from './components';
// import App from './App';
import App from './WebApp';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { Provider as PaperProvider } from 'react-native-paper';

const Provider = createStoreProvider();

type RootProps = {
  children: any,
};

const theme = extendTheme({
  components: {
    Button: {
      // variants: {
      //   rounded: ({
      //     colorScheme
      //   }) => {
      //     return {
      //       bg: `${colorScheme}.500`,
      //       rounded: "full"
      //     };
      //   }
      // }
      defaultProps: {
        // colorScheme: colors,
      },
    }
  }
});


export function Root(props: RootProps) {
  console.log('Loading root');

  return (
    <NativeBaseProvider theme={theme}>
      <Provider>
        <MobileUIProvider>
          <App />
        </MobileUIProvider>
      </Provider>
    </NativeBaseProvider>
  );
}

