import type { VaultConstructor } from './types';
import { WalletBuilder } from '@selfkey/blockchain/util/wallet-builder';

export class IdentityVault {
  constructor(props: VaultConstructor) {
    this.id = props.id;
    this.password = props.password;
    this.mnemonic = props.mnemonic,
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
    return [{
      id: 'mnemonic',
      value: this.mnemonic,
    }, {
      id: 'securityPolicy',
      value: this.securityPolicy,
    }]
  }
}
