// @flow
import bip39 from 'bip39';
import HDNode from 'hdkey';
import Wallet from './wallet';

class WalletBuilder {
  root: HDNode;
  seed: Buffer;

  constructor(seed: Buffer) {
    this.seed = seed;
    this.root = HDNode.fromMasterSeed(seed);
  }

  async create(mnemonic: string): WalletBuilder {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    return new WalletBuilder(seed);
  }

  createWallet(idx: number): Wallet {
    const addrNode = root.derive(`m/44'/60'/${idx}'/0/0`);
    const privateKey = addrNode._privateKey;
    return new Wallet(privateKey);
  }
}

export default WalletBuilder;
