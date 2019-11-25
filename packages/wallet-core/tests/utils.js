// import { initRealm, getRealmInstance } from '../db/realm-service';
// import { setupHDWallet } from '../modules/create-wallet/create-wallet-utils';
// import models from '../models';

export async function initTestRealm() {
  // const realm = await initRealm({
  //   deleteRealmIfMigrationNeeded: true,
  //   skipMigration: true,
  //   inMemory: true,
  // });

  // await realm.write(() => {
  //   models.map(model => {
  //     let allItems = realm.objects(model.schema.name);
  //     realm.delete(allItems);
  //   });
  // });

  // return new Promise((res) => setTimeout(res, 10));
}

export function closeRealm() {
  // return getRealmInstance().close();
}

export async function initIdentityVault() {
  // await initTestRealm();
  // await setupHDWallet({
  //   password: 'test',
  //   mnemonic: 'identify twenty rate region kind any ready sunset hungry gauge vicious convince',
  // });
}
