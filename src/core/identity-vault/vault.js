import type { VaultConstructor } from './types';
import { WalletBuilder } from 'blockchain/util/wallet-builder';

export class IdentityVault {
  constructor(props: VaultConstructor) {
    this.id = props.id;
    this.password = props.password;
    this.mnemonic = props.mnemonic;
    this.privateKey = props.privateKey;
    this.address = props.address;
    this.rootSeed = props.rootSeed;
    this.securityPolicy = props.securityPolicy;
    this.db = props.db;
  }

  getETHWalletKeys(idx) {
    const builder = WalletBuilder.createFromSeed(this.rootSeed)
    const path = builder.getETHPath(idx);
    const wallet = builder.createWallet(path);

    return {
      privateKey: wallet.privateKey.toString(),
      publicKey: wallet.address.toString(),
    }
  }

  getKeyStoreItems() {
    if (this.mnemonic) {
      return [{
        id: 'mnemonic',
        value: this.mnemonic,
      }, {
        id: 'securityPolicy',
        value: this.securityPolicy,
      }];
    }

    return [{
      id: 'privateKey',
      value: this.privateKey,
    }, {
      id: 'address',
      value: this.address,
    }, {
      id: 'securityPolicy',
      value: this.securityPolicy,
    }]
  }
}
