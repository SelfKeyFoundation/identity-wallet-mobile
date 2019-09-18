let Realm;
const models = [];
let realmInstance;

/**
 * Mobile wallet will inject a mobile version
 * Desktop wallet could inject the nodejs version or some wrapper on top of SQLite
 */
export function getRealmImpl() {
  return Realm;
}

export function setRealmImpl(impl) {
  Realm = impl;
}

export function registerModel(m) {
  models.push(m);
}

export function getModels() {
  return models;
}

export function getRealmInstance() {
  return realmInstance;
}

export function setRealmInstance(instance) {
  realmInstance = instance;
}

export function initRealm(opts) {
  return Realm.open({
    schema: models.map(m => m.schema),
    ...opts,
  }).then((instance) => {
    setRealmInstance(instance);
    return instance;
  });
}
