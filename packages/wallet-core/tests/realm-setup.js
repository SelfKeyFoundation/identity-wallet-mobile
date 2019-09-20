import Realm from 'realm';
import { setRealmImpl, initRealm, getRealmInstance } from '../db/realm-service';
import { registerModels } from '../db/register-models';

setRealmImpl(Realm);
registerModels();

export function initTestRealm() {
  return initRealm({
    // inMemory: true,
  });
}

export function closeRealm() {
  return getRealmInstance().close();
}
