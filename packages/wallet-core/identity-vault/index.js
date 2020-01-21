// @flow
import { IdentityVault } from './vault';
import type { VaultConstructor } from './types';


// Realm should work for both desktop and mobile
// Desktop application can inject a SQLite Implementation as well
let database;
let keychain;

export function setDatabaseImpl(db) {
  database = db;
}

export function setKeychainImpl(kc) {
  keychain = kc;
}

function getKeychain() {
  if (!keychain) {
    throw 'Keychain is not defined, please use the setKeychainImpl method to fix it';
  }

  return keychain;
}

function getDatabase() {
  if (!database) {
    throw 'Database is not defined, please use the setDatabaseImpl method to fix it';
  }

  return database;
}

/**
 * Create vault
 * - Set items in the keychain
 * - Create encrypted realm
 *
 * @param {VaultConstructor} props
 */
export async function createVault(props: VaultConstructor) {
  const vaultId = props.publicKey;

  await getKeychain().setItem(vaultId, {
    id: vaultId,
    mnemonic: props.mnemonic,
    privateKey: props.privateKey,
    publicKey: props.publicKey,
    // TODO: create hash from password
    password: props.password,
    unlockPolicy: props.unlockPolicy,
  });

  const identityDb = await getDatabase().create({ vaultId, privateKey: props.privateKey });

  const vault = new IdentityVault({
    ...props,
    id: vaultId,
    db: identityDb,
  });

  return vault;
}

/**
 * Given a vaultId and credentials, attempt to unlock the vault
 *
 * @param {*} vaultId
 * @param {*} password
 * @returns {IdentityVault} instance of the identity vault
 */
export async function unlockVault(vaultId, password) {
  // TODO: create hash from password
  const props = await getKeychain().getItem(vaultId);

  if (props.password !== password) {
    throw {
      message: 'Password dosn\'t match',
    };
  }

  const identityDb = await getDatabase().create({ vaultId, privateKey: props.privateKey });

  const vault = new IdentityVault({
    ...props,
    db: identityDb,
  });

  return vault;
}