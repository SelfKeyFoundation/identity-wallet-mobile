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

type AppProps = {
  isLoading: boolean,
  loadApp: () => any,
};

export function App(props: AppProps) {
  const { loadApp, isLoading } = props;

  useEffect(() => {
    loadApp();
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
