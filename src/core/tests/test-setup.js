import crypto from 'crypto';

setSystemImpl({
  getCrypto() {
    return crypto;
  }
})

import { registerModels } from '../db/register-models';
import * as TestKeychain from 'core/identity-vault/mock/keychain-mock';
import { setDatabaseImpl, setKeychainImpl} from 'core/identity-vault';
import { IdentityRealm } from 'core/identity-vault/identity-realm';
import fetch from 'node-fetch';
import Realm from 'realm';

import { setRealmImpl, initRealm, seedDb } from '../db/realm-service';
import { setupHDWallet } from '../modules/create-wallet/create-wallet-utils';
import models from '../models';


// Setup redux
// import 'core/redux/middlewares/register-redux-logger';
import 'core/redux/middlewares/register-redux-thunk';
import 'core/redux/middlewares/register-redux-promise';
import 'core/register-core-modules';
import { setSystemImpl } from '../system';

fetch = fetch;

setDatabaseImpl(IdentityRealm);
setKeychainImpl(TestKeychain);
setRealmImpl(Realm);
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

    await seedDb();

    try {
      await setupHDWallet({
        password: 'test',
        mnemonic: 'identify twenty rate region kind any ready sunset hungry gauge vicious convince',
      });
    } catch(err) {
      console.error(err);
    }
  }
}
