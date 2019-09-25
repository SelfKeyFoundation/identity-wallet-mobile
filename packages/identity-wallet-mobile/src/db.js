import Realm from 'realm';
import { initRealm, setRealmImpl } from '@selfkey/wallet-core/db/realm-service';
import { registerModels } from '@selfkey/wallet-core/db/register-models';
import { WalletModel } from '@selfkey/wallet-core/models';

registerModels();
setRealmImpl(Realm);

export async function initDb() {
  await initRealm({
    // For testing purposes
    // Migration system will be added yet
    deleteRealmIfMigrationNeeded: true,
  });

  // const testModel = new WalletModel();

  // await testModel.create({
  //   id: 22,
  //   name: 'test',
  //   address: 'some value',
  //   privateKey: 'key1',
  // });

  // const data = await testModel.findById(22);
  // console.log(data);
}