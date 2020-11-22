import crypto from 'crypto';

setSystemImpl({
  getCrypto() {
    return crypto;
  }
})

import { registerModels } from 'core/db/register-models';
import * as TestKeychain from 'core/identity-vault/mock/keychain-mock';
import { setDatabaseImpl, setKeychainImpl} from 'core/identity-vault';
import { IdentityRealm } from 'core/identity-vault/identity-realm';
import fetch from 'node-fetch';
import Realm from 'realm';

import { setRealmImpl, initRealm, seedDb } from 'core/db/realm-service';
import { setupHDWallet } from 'core/modules/create-wallet/create-wallet-utils';
import models from 'core/models';

// Setup redux
// import '@selfkey/wallet-core/redux/middlewares/register-redux-logger';
import 'core/redux/middlewares/register-redux-thunk';
import 'core/redux/middlewares/register-redux-promise';
import 'core/register-core-modules';
import { setSystemImpl } from 'core/system';
import { setEnv } from 'configs';

global.fetch = fetch;

setDatabaseImpl(IdentityRealm);
setKeychainImpl(TestKeychain);
setRealmImpl(Realm);
setEnv('dev');
registerModels();

let realm;

export async function initDatabase() {
  if (!realm) {
    realm = await initRealm({
      deleteRealmIfMigrationNeeded: true,
      skipMigration: true,
      // inMemory: true,
    });

    realm.write(() => {
      models.forEach(model => {
        realm.delete(realm.objects(model.schema.name));
      });
    });

    // await seedDb();

    // try {
    //   await setupHDWallet({
    //     password: 'test',
    //     mnemonic: 'identify twenty rate region kind any ready sunset hungry gauge vicious convince',
    //   });
    // } catch(err) {
    //   console.error(err);
    // }
  }
}
