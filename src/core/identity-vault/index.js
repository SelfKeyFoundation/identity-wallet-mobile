// @flow
import { IdentityVault } from './vault';
import type { VaultConstructor } from './types';
import { System } from '../system';


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
  return System.getCrypto().createHash('sha256').update(value).digest('hex');
}

function getBiometricsVaultId(vaultId) {
  return `biometrics.${vaultId}`;
}

/**
 * Create vault
 * - Set items in the keychain
 * - Create encrypted realm
 *
 * @param {VaultConstructor} props
 */
export async function createVault(props: VaultConstructor) {
  const vaultId = createHash(props.rootPublicKey || props.address);
  const password = createHash(props.password);
  const dbKey = createHash(props.seed || props.privateKey);

  try {
    await getKeychain().removeItem(vaultId);
  } catch(err) {}

  try {
    await getKeychain().removeItem(getBiometricsVaultId(vaultId));
  } catch(err) {}

  const vaultProps = {
    id: vaultId,
    mnemonic: props.mnemonic,
    privateKey: props.privateKey,
    address: props.address,
    rootSeed: props.seed,
    privateKey: props.privateKey,
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

export async function getVault(vaultId) {
  return getKeychain().getItem(vaultId);
}
export async function getIdentityVault(vaultId) {
  const props = await getVault(vaultId);
  return new IdentityVault(props);
}

export function removeVault(vaultId) {
  return getKeychain().removeItem(vaultId);
}

async function prepareUnlockedVault(vaultId, props) {
  const dbKey = createHash(props.rootSeed || props.privateKey);
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


export async function unlockVaultWithBiometrics(vaultId) {
  const Keychain = getKeychain();
  const method = await Keychain.getSupportedBiometryType();
  const biometricsVaultId = getBiometricsVaultId(vaultId);
  let vaultProps = await Keychain.getItem(vaultId);
  let biometricProps = await Keychain.getItem(biometricsVaultId, {
    authenticationPrompt: {
      title: 'Unlock your SelfKey wallet'
    }
  });

  if (!biometricProps) {
    if (method === 'Fingerprint') {
      await Keychain.setItem(biometricsVaultId, {}, {
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
        authenticationType: Keychain.BIOMETRY_TYPE.FINGERPRINT,
        storage: Keychain.STORAGE_TYPE.RSA,
      });
    } else {
      await Keychain.setItem(biometricsVaultId, vaultProps, {
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE, 
      });
    }

    await Keychain.getItem(biometricsVaultId, {
      authenticationPrompt: {
        title: 'Unlock your SelfKey wallet'
      }
    });
  }

  return prepareUnlockedVault(vaultId, vaultProps);
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