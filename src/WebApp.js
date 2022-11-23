import React from 'react';
import { View, Text } from 'react-native';
import { setRealmInstance } from './core/db/realm-service';
import { setDatabaseImpl, setKeychainImpl } from './core/identity-vault';
import { NavigationContainer } from './navigation';

const vault = {};

setKeychainImpl({
  setItem(id, data) {
    vault[id] = data;
  },
  getItem(id) {
    return vault[id];
  },
  removeItem(id) {
    delete vault[id];
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


const realmItems = {};

setRealmInstance({
  write(fn) {
    return fn();
  },
  create(schemaId, props) {
    if (!realmItems[schemaId]) {
      realmItems[schemaId] = [];
    }

    realmItems[schemaId].push(props);

    return props;
  },
  objects(schemaId) {
    return realmItems[schemaId] || [];
  }
})


export default function App() {

  return (
    <View style={{ height: '100vh'}}>
      <NavigationContainer />
    </View>
  )
}