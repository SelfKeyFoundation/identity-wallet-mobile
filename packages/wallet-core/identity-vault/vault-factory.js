// @flow
import { IdentityVault } from './vault';
import type { IdentityKeychain, IdentityDatabase, VaultConstructor } from './types';

type VaultFactoryConstructor = {
  keychain: IdentityKeychain,
  DatabaseImpl: Class<IdentityDatabase>,
}

export class VaultFactory {
  keychain: IdentityKeychain;
  DatabaseImpl: Class<IdentityDatabase>;

  constructor(props: VaultFactoryConstructor) {
    this.keychain = props.keychain;
    this.DatabaseImpl = props.DatabaseImpl;
  }

  /**
   * Create vault
   * - Set items in the keychain
   * - Create encrypted realm
   *
   * @param {VaultConstructor} props
   */
  async createVault(props: VaultConstructor) {
    const vaultId = '<need to generate id>';

    await this.keychain.setItem(vaultId, {
      type: props.type,
      privateKey: props.privateKey,
      password: props.password,
      unlockPolicy: props.unlockPolicy,
    });

    const identityDb = await this.DatabaseImpl.create({ vaultId, privateKey: props.privateKey });

    const vault = new IdentityVault({
      ...props,
      database: identityDb,
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
  async unlockVault(vaultId, password) {
    const props: VaultConstructor = await this.keychain.getItem(vaultId);

    if (props.password !== password) {
      throw {
        message: 'Password dosn\'t match',
      };
    }

    const identityDb = await this.database.create({ vaultId, privateKey: props.privateKey });

    const vault = new IdentityVault({
      ...props,
      database: identityDb,
    });

    return vault;
  }
}
