import { registerModels } from '../db/register-models';
import * as TestKeychain from '@selfkey/wallet-core/identity-vault/mock/keychain-mock';
import { setDatabaseImpl, setKeychainImpl} from '@selfkey/wallet-core/identity-vault';
import { IdentityRealm } from '@selfkey/wallet-core/identity-vault/identity-realm';
import fetch from 'node-fetch';
import Realm from 'realm';
import { setRealmImpl, initRealm, seedDb } from '../db/realm-service';
import { setupHDWallet } from '../modules/create-wallet/create-wallet-utils';
import models from '../models';
// Setup redux
// import '@selfkey/wallet-core/redux/middlewares/register-redux-logger';
import '@selfkey/wallet-core/redux/middlewares/register-redux-thunk';
import '@selfkey/wallet-core/redux/middlewares/register-redux-promise';
import '@selfkey/wallet-core/register-core-modules';

global.fetch = fetch;

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
