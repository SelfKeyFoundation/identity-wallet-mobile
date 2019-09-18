import React from 'react';
import { View, Text, Button } from 'react-native';
import './setup-redux';
import './db/register-models';
import Navigation from './navigation';
import { createStoreProvider, connect } from '@selfkey/wallet-core/redux';
import modules from '@selfkey/wallet-core/modules';
import { initRealm } from './db/realm-service';
import { TestModel } from './db/TestModel';


async function initDb() {
  await initRealm();
  const testModel = new TestModel();

  await testModel.create({
    name: 'test',
    privateKey: 'key1',
    password: 'pass1',
  });

  const data = await testModel.getAll();
}

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
