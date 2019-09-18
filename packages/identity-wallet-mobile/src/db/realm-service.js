import Realm from 'realm';
const models = [];
let realm;

export function registerModel(m) {
  models.push(m);
}

export function initRealm() {
  return Realm.open({schema: models.map(m => m.schema) })
    .then((instance) => {
      setRealm(instance);
      return instance;
    });
}

export function getRealm() {
  return realm;
}

// Could be used for mocking purpose
export function setRealm(instance) {
  realm = instance;
}