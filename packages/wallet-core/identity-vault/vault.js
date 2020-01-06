import type { VaultConstructor } from './types';
import { WalletBuilder } from '@selfkey/blockchain/util/wallet-builder';

export class IdentityVault {
  constructor(props: VaultConstructor) {
    this.id = props.publicKey;
    this.password = props.password;
    this.db = props.db;
    this.privateKey = props.privateKey;
    this.publicKey = props.publicKey;
    this.securityPolicy = props.securityPolicy;
  }
  // Create methods to manage identity

  getETHWalletKeys(idx) {
    const builder = WalletBuilder.createFromJSON(this.privateKey, this.publicKey);
    const path = builder.getETHPath(idx);
    const wallet = builder.createWallet(path);

    return {
      privateKey: wallet.privateKey.toString(),
      publicKey: wallet.address.toString(),
    }
  }
}
