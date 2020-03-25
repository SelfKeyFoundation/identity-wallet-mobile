// @flow
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from './navigation';
import { connect } from '@selfkey/wallet-core/redux';
import modules from '@selfkey/wallet-core/modules';
import TermsOfServiceScreen from './screens/TermsOfServiceScreen';
import ReceiveTokensScreen from './screens/ReceiveTokensScreen';
import SendTokensScreen from './screens/SendTokensScreen';
import { ModalRoot } from './modals';
import { MatomoTracker } from './MatomoTracker';

type AppProps = {
  isLoading: boolean,
  loadApp: () => any,
};

export function App(props: AppProps) {
  const { loadApp, isLoading } = props;

  useEffect(() => {
    loadApp();
    // const matomo = new MatomoTracker({
    //   url: 'http://192.168.0.111:8080/matomo.php',
    //   siteId: 1,
    // });
    // matomo.track({
    //   url: 'app://unlockWallet',
    //   action_name: 'pageView',
    //   // cvar: JSON.stringify({
    //   //   '1': ['deviceType', 'smartphone']
    //   // })
    // });
  }, []);

  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <NavigationContainer />
      <ReceiveTokensScreen />
      <SendTokensScreen />
      <ModalRoot />
      {
        !isLoading && (
          <TermsOfServiceScreen />
        )
      }
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return ({
    isLoading: state.app.isLoading,
  });
};

const mapActionsToProps = (dispatch) => ({
  loadApp: () => dispatch(modules.app.operations.loadAppOperation()),
});

export default connect(mapStateToProps, mapActionsToProps)(App);
