import React from 'react';
import { View, Text } from 'react-native';
import { setRealmInstance } from './core/db/realm-service';
import { setDatabaseImpl, setKeychainImpl } from './core/identity-vault';
import { NavigationContainer } from './navigation';
import ReceiveTokensScreen from './screens/ReceiveTokensScreen';
import SendTokensScreen from './screens/SendTokensScreen';
import TermsOfServiceScreen from './screens/TermsOfServiceScreen';
import appModule from './core/modules/app';

import AllModels from './core/models';
import { useSelector } from 'react-redux';
import { ModalRoot } from './modals';

let vault = {};

global.platform = 'desktop';

function fetchVault() {
  const items = localStorage.getItem('vault');
  try {
    vault = JSON.parse(items) || {};
  } catch(err) {
    vault = {}
  }
}

fetchVault();

function syncVault() {
  localStorage.setItem('vault', JSON.stringify(vault));
}

setKeychainImpl({
  setItem(id, data) {
    vault[id] = data;

    syncVault();
  },
  getItem(id) {
    return vault[id];
  },
  removeItem(id) {
    delete vault[id];

    syncVault();
  }
});

const db = {

}

setDatabaseImpl({
  create({ vaultId, privateKey}) {
    console.log('create db', { vaultId, privateKey});
    return db;
  }
})

let realmItems = {};

function fetchRealmItems() {
  const items = localStorage.getItem('realmItems');
  try {
    realmItems = JSON.parse(items) || {};
  } catch(err) {
    realmItems = {}
  }
}


fetchRealmItems();

function syncRealmItems() {
  localStorage.setItem('realmItems', JSON.stringify(realmItems));
}

setRealmInstance({
  write(fn) {
    return fn();
  },
  create(schemaId, props, shouldUpsert) {
    if (!realmItems[schemaId]) {
      realmItems[schemaId] = [];
    }

    const items = realmItems[schemaId];

    const model = AllModels.find((m) => m.schema.name === schemaId);
    const primaryKey = model.schema.primaryKey;

    const existingItem = items.find((itm) => itm[primaryKey] === props[primaryKey]);

    if (existingItem) {
      realmItems[schemaId] = items.map(itm => {
        if (itm[primaryKey] === props[primaryKey]) {
          return {
            ...itm,
            ...props,
          }
        }

        return itm;
      })
    } else {
      items.push(props);
    }    

    syncRealmItems();

    return props;
  },
  objects(schemaId) {
    return realmItems[schemaId] || [];
  }
})


export default function App() {
  const {isLoading} = useSelector(appModule.selectors.getRoot);

  return (
    <View style={{ height: '100vh'}}>
      <NavigationContainer />
      <ReceiveTokensScreen />
      <SendTokensScreen />
      <ModalRoot />
      { !isLoading && <TermsOfServiceScreen />}
    </View>
  )
}