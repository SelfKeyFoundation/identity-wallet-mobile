import React from 'react';
import { View, Text, Button } from 'react-native';
import './setup-redux';
import Navigation from './navigation';
import { createStoreProvider, connect } from '@selfkey/wallet-core/redux';
import modules from '@selfkey/wallet-core/modules';
import { initDb } from './db';

initDb();

const Provider = createStoreProvider();

const mapStateToProps = (state) => {
  return ({
    isLoading: state.wallet.isLoading,
  });
};

const mapActionsToProps = (dispatch) => ({
  loadWallet: () => dispatch(modules.wallet.operations.loadWalletOperation()),
});

const AppStatus = connect(mapStateToProps, mapActionsToProps)((props) => {
  return (
    <View>
      <Text>Is app { props.isLoading ? 'loading' : 'ready' }</Text>
      <Button onPress={props.loadWallet} title="Load wallet"/>
    </View>
  );
});

function App(props) {
  return (
    <Provider>
      <AppStatus />
      <Navigation />
    </Provider>
  );
}

export default App;
