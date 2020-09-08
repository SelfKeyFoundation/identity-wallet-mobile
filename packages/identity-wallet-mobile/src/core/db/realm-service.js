let Realm;
const models = [];
let realmInstance;
import migrations from './migrations';
import schemas from './schemas';
import { CURRENT_SCHEMA_VERSION, SCHEMA_NAME } from '../models';
import { seedDb } from './seed';

export { seedDb };

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

export async function initRealm(opts = {}) {
  if (getRealmInstance()) {
    return getRealmInstance();
  }

  // The first schema to update to is the current schema version
  // since the first schema in our array is at nextSchemaIndex:
  let nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath);

  // If Realm.schemaVersion() returned -1, it means this is a new Realm file
  // so no migration is needed.
  if (!opts.skipMigration && nextSchemaIndex !== -1) {
    while (nextSchemaIndex < schemas.length) {
      const { schema, schemaVersion } = schemas[nextSchemaIndex++];
      const migratedRealm = new Realm({
        schema,
        schemaVersion,
        migration: migrations && migrations[schemaVersion],
        ...opts,
      });
      migratedRealm.close();
    }
  }

  try {
    const instance = await Realm.open({
      schema: models.map(m => m.schema),
      schemaVersion: CURRENT_SCHEMA_VERSION,
      ...opts,
    });

    setRealmInstance(instance);

    return instance;
  } catch(err) {
    // TODO: Configure a logging system
    console.error(err);  
  }
}
