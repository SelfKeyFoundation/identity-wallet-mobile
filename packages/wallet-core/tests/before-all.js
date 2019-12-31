import { setupHDWallet } from '../modules/create-wallet/create-wallet-utils';
import models from '../models';
import { initRealm, seedDb } from '../db/realm-service';

let realm;

beforeAll(async () => {
  jest.setTimeout(30000);

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
});


