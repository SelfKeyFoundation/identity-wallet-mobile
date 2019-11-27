// TODO: This is a copy from database impl for react native
// Need to unify it, the realm impl should be place into the wallet-core package
// For now this is not possible due to issues to import it from wallet-mobile package

/**
 * @flow
 *
 * Cross-platform implementation
 *
 */
import Realm from 'realm';

const IdentitySchema = {
  name: 'Identity',
  properties: {
    name:  'string',
    data: 'string',
    mimeType: 'string',
  },
};

export class IdentityRealm {
  realm: Realm;
  vaultId: string;

  constructor({ vaultId, realm }) {
    this.vaultId = vaultId;
    this.realm = realm;
  }

  static async create({ vaultId, privateKey }) {
    const realm = await Realm.open({
      path: `vault-${vaultId}`,
      schema: [IdentitySchema],
      // TODO: Setup encryptionKey using SHA-256 from secret key
      // encryptionKey: secret,
    });

    return new IdentityRealm({ vaultId, realm });
  }

  close() {
    this.realm.close();
  }

  setItem(item: any) {
    return this.realm.write(() => {
      let foundItem = this.getItem(item.name);
      if (!foundItem) {
        this.realm.create('Identity', item);
      } else {
        Object.keys(item).forEach((key) => {
          foundItem[key] = item[key];
        });
      }
    });
  }

  getItem(name: string) {
    return this.realm.objects('Identity').filtered(`name = "${name}"`);
  }

  /**
   *
   * @param {*} name 
   */
  removeItem(name: string) {
    return this.realm.write(() => {
      const identity = this.getItem(name);
      return this.realm.delete(identity);
    });
  }

  /**
   * Exposes realm, so that you can perform better searches
   *
   */
  getRealm(): Realm {
    return this.realm;
  }
}
