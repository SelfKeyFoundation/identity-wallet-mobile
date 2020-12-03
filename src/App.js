// @flow
import React, { useEffect } from 'react';
import { Linking, StatusBar } from 'react-native';
import { NavigationContainer } from './navigation';
import { connect } from 'core/redux';
import modules from 'core/modules';
import TermsOfServiceScreen from './screens/TermsOfServiceScreen';
import ReceiveTokensScreen from './screens/ReceiveTokensScreen';
import SendTokensScreen from './screens/SendTokensScreen';
import { ModalRoot } from './modals';
import { WalletTracker } from './WalletTracker';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ConfirmConnectionModal } from 'screens/walletConnect/ConfirmConnectionModal';
import { ConfirmTransactionModal } from 'screens/walletConnect/ConfirmTransactionModal';

import './core/test2';
import { walletConnectActions, walletConnectOperations } from 'screens/walletConnect/walletConnectSlice';

type AppProps = {
  isLoading: boolean,
  loadApp: () => any,
};

export function App(props: AppProps) {
  const dispatch = useDispatch();
  const snackMessage = useSelector(modules.app.selectors.getSnackMessage)
  const { loadApp, isLoading } = props;

  useEffect(() => {
    WalletTracker.trackEvent({
      action: 'loaded',
      category: 'app',
      level: 'machine'
    });

    loadApp();
    
    setTimeout(() => {
      dispatch(modules.app.operations.loadFeatureFlagsOperation());
    }, 1000);

    const handleOpenURL = ({ url }) => {
      if (!url) {
        return;
      }

      if (url.indexOf('selfkey://wc?uri=') === 0) {
        const uri = url.replace('selfkey://wc?uri=', '');
        dispatch(walletConnectOperations.handleUri(uri));
      }
    }

    Linking.addEventListener('url', handleOpenURL);
    Linking.getInitialURL().then((url) => url && handleOpenURL({ url }));

    // handleOpenURL({
    //   url:
    //   'selfkey://wc?uri=wc:47c7a890-bfbd-482c-9aa7-e7852f8f322f@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=01c62203bf0d842f7b658c36619f74cd8549438608c514ae8103434c43065bec',
    // });
  }, []);

  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <NavigationContainer />
      <ReceiveTokensScreen />
      <SendTokensScreen />
      <ConfirmConnectionModal />
      <ConfirmTransactionModal />
      <ModalRoot />
      {
        !isLoading && (
          <TermsOfServiceScreen />
        )
      }
      <Snackbar
        visible={!!snackMessage}
        onDismiss={() => dispatch(modules.app.actions.setSnackMessage(null))}
        duration={1000}
      >
        { snackMessage }
      </Snackbar>
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
