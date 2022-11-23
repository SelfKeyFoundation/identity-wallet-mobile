// @flow
import React from 'react';
import './setup-redux';
import './inject-system';
// import './rn-identity-vault/index';
import './db';
import { createStoreProvider } from 'core/redux';
import { MobileUIProvider, Portal } from 'design-system';
// import { TermsOfService } from './components';
// import App from './App';
import App from './WebApp';
import { extendTheme, NativeBaseProvider } from 'native-base';


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
    <Provider>
      <NativeBaseProvider theme={theme}>
        <MobileUIProvider>
          <Portal.Host>
            <App />
          </Portal.Host>
        </MobileUIProvider>
      </NativeBaseProvider>
    </Provider>
  );
}

