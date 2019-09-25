// @flow
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import './setup-redux';
// import Navigation from './navigation';
import { createStoreProvider } from '@selfkey/wallet-core/redux';
// import modules from '@selfkey/wallet-core/modules';
import SplashScreen from 'react-native-splash-screen';
import { initDb } from './db';
import { LoadingScreen } from './screens/loading-screen';

initDb();

const Provider = createStoreProvider();

type AppProps = {
  isLoading: boolean,
};

function App(props: AppProps) {
  const { isLoading } = props;

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider>
      { isLoading
        ? <LoadingScreen />
        : <div />
      }
    </Provider>
  );
}

// There is a issue to handle redux for loading screen
// it will be moved afterwards
const withMockState = (Wrapper) => (props: any) => {
  return <Wrapper isLoading={true} {...props} />;
};

// const mapStateToProps = (state) => {
//   return ({
//     isLoading: state.wallet.isLoading,
//   });
// };

// const mapActionsToProps = (dispatch) => ({
//   loadWallet: () => dispatch(modules.wallet.operations.loadWalletOperation()),
// });

// export default connect(mapStateToProps, mapActionsToProps)(App);

export default withMockState(App);
