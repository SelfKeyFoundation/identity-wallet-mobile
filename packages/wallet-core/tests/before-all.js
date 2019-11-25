import { setupHDWallet } from '../modules/create-wallet/create-wallet-utils';
import models from '../models';
import { initRealm } from '../db/realm-service';

let realm;

beforeAll(async () => {
  if (!realm) {
    realm = await initRealm({
      deleteRealmIfMigrationNeeded: true,
      skipMigration: true,
      // inMemory: true,
    });

    await realm.write(async () => {
      await models.map(model => {
        let allItems = realm.objects(model.schema.name);
        return realm.delete(allItems);
      });
    });

    try {
      await setupHDWallet({
        password: 'test',
        mnemonic: 'identify twenty rate region kind any ready sunset hungry gauge vicious convince',
      });
    } catch(err) {

     }

  }
});


