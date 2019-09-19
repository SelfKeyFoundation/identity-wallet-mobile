let Realm;
const models = [];
let realmInstance;
import migrations from './migrations';
import schemas from './schemas';

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

export function initRealm(opts = {}) {
  // The first schema to update to is the current schema version
  // since the first schema in our array is at nextSchemaIndex:
  let nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath);

  // If Realm.schemaVersion() returned -1, it means this is a new Realm file
  // so no migration is needed.
  if (nextSchemaIndex !== -1) {
    while (nextSchemaIndex < schemas.length) {
      const { schema, schemaVersion } = schemas[nextSchemaIndex++];
      const migratedRealm = new Realm({
        schema,
        schemaVersion,
        migration: migrations[schemaVersion],
      });
      migratedRealm.close();
    }
  }

  return Realm.open({
    schema: models.map(m => m.schema),
    ...opts,
  }).then((instance) => {
    setRealmInstance(instance);
    return instance;
  });
}
