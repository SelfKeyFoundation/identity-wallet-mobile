// @flow
import { IdentityVault } from './vault';
import type { VaultConstructor } from './types';
import { System } from '../system';

const crypto = System.getCrypto();

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

function createHash(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

/**
 * Create vault
 * - Set items in the keychain
 * - Create encrypted realm
 *
 * @param {VaultConstructor} props
 */
export async function createVault(props: VaultConstructor) {
  const vaultId = createHash(props.rootPublicKey);
  const password = createHash(props.password);
  const dbKey = createHash(props.seed);

  const vaultProps = {
    id: vaultId,
    mnemonic: props.mnemonic,
    rootSeed: props.seed,
    password: password,
    securityPolicy: props.securityPolicy,
  };

  await getKeychain().setItem(vaultId, vaultProps);

  const identityDb = await getDatabase().create({ vaultId, privateKey: dbKey });
  const vault = new IdentityVault({
    ...vaultProps,
    db: identityDb,
  });

  return vault;
}

export async function vaultExists(vaultId) {
  const vault = await getKeychain().getItem(vaultId);
  return !!vault;
}

export function removeVault(vaultId) {
  return getKeychain().removeItem(vaultId);
}

async function prepareUnlockedVault(vaultId, props) {
  const dbKey = createHash(props.rootSeed);  
  const identityDb = await getDatabase().create({ vaultId, privateKey: dbKey });

  const vault = new IdentityVault({
    ...props,
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
  const props = await getKeychain().getItem(vaultId);
  const passwordHash = createHash(password);

  if (props.password !== passwordHash) {
    throw {
      message: 'wrong_password',
    };
  }

  return prepareUnlockedVault(vaultId, props);
}

export async function unlockVaultWithMnemonic(vaultId, mnemonic) {
   const props = await getKeychain().getItem(vaultId);

   if (props.mnemonic !== mnemonic) {
     throw {
       message: 'wrong_mnemonic',
     };
   }
 
   return prepareUnlockedVault(vaultId, props);
}

export async function updatePassword(vaultId, currentPassword, newPassword, options = {}) {
  const props = await getKeychain().getItem(vaultId);
  const passwordHash = options.currentPasswordHash ? options.currentPasswordHash : createHash(currentPassword);

  if (props.password !== passwordHash) {
    throw {
      message: 'wrong_password',
    };
  }

  await getKeychain().setItem(vaultId, {
    ...props,
    password: createHash(newPassword),
  });
}