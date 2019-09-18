import Realm from 'realm';
import { initRealm, setRealmImpl } from '@selfkey/wallet-core/db/realm-service';

// For testing purposes, to be removed afterwards
import { WalletModel } from '@selfkey/wallet-core/db/models/WalletModel';

// inject react-native Realm
setRealmImpl(Realm);

export async function initDb() {
  await initRealm();

  const testModel = new WalletModel();

  await testModel.create({
    name: 'test',
    privateKey: 'key1',
    password: 'pass1',
  });

  const data = await testModel.getAll();
  console.log(data);
}