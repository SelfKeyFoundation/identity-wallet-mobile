// // import { initRealm } from './realm-setup';
// import Realm from 'realm';
// import * as TestKeychain from '@selfkey/wallet-core/identity-vault/mock/keychain-mock';
// import { setupHDWallet } from '../modules/create-wallet/create-wallet-utils';
// import models from '../models';
// import { initRealm, setRealmImpl } from '../db/realm-service';
// import { setDatabaseImpl, setKeychainImpl} from '@selfkey/wallet-core/identity-vault';
// import { IdentityRealm } from '@selfkey/wallet-core/identity-vault/identity-realm';
// import { registerModels } from '../db/register-models';

// registerModels();
// setRealmImpl(Realm);
// setDatabaseImpl(IdentityRealm);
// setKeychainImpl(TestKeychain);


// module.exports = async () => {
//   console.log('setting up');
//   const realm  = await initRealm({
//     deleteRealmIfMigrationNeeded: true,
//     skipMigration: true,
//     inMemory: true,
//   });

//   await realm.write(() => {
//     models.map(model => {
//       let allItems = realm.objects(model.schema.name);
//       realm.delete(allItems);
//     });
//   });

//   await setupHDWallet({
//     password: 'test',
//     mnemonic: 'identify twenty rate region kind any ready sunset hungry gauge vicious convince',
//   });

//   console.log('#mzm global-setup', realm);

//   global.__realm__ = realm;
//   global.__keychain__ = TestKeychain;

//   return { realm, TestKeychain };
// };

module.exports = () => {};
