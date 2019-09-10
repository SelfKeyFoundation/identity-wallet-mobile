import React from 'react';
import { View, Text, Button } from 'react-native';
import './setup-redux';
import Navigation from './navigation';
import { createStoreProvider, connect } from '@selfkey/wallet-core/redux';
import { loadWallet } from '@selfkey/wallet-core/modules/wallet/actions';

const Provider = createStoreProvider();

const mapStateToProps = (state) => {
  return ({
    isLoading: state.wallet.isLoading,
  });
};

const mapActionsToProps = (dispatch) => ({
  setLoading: () => dispatch(loadWallet()),
});

const AppStatus = connect(mapStateToProps, mapActionsToProps)((props) => {
  return (
    <View>
      <Text>Is app { props.isLoading ? 'loading' : 'ready' }</Text>
      <Button onPress={props.setLoading} title="Set loading"/>
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
