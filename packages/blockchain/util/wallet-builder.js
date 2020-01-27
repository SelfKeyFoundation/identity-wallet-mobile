// @flow
import { mnemonicToSeed, generateMnemonic } from 'bip39';
import HDNode from 'hdkey';
import bs58 from 'bs58';
import { Wallet } from './wallet';

export class WalletBuilder {
  root: HDNode;

  constructor(root: HDNode, seed) {
    this.root = root;
    this.seed = seed;
  }

  static generateMnemonic(): string {
    return generateMnemonic();
  }

  static async createFromMnemonic(mnemonic: string): WalletBuilder {
    const seed = await mnemonicToSeed(mnemonic);
    const rootNode = HDNode.fromMasterSeed(seed);

    return new WalletBuilder(rootNode, seed.toString('hex'));
  }

  static createFromSeed(seed: string): WalletBuilder {
    const rootNode = HDNode.fromMasterSeed(Buffer.from(seed, 'hex'));
    return new WalletBuilder(rootNode, seed);
  }

  static createFromJSON(privateKey, publicKey): WalletBuilder {
    const rootNode = HDNode.fromJSON({
      xpriv: privateKey,
      xpub: publicKey,
    });

    return new WalletBuilder(rootNode);
  }

  toJSON() {
    return this.root.toJSON();
  }

  createWallet(path): Wallet {
    const addrNode = this.root.derive(path);
    const privateKey = addrNode.privateKey;

    return new Wallet(privateKey);
  }

  getETHPath(idx: number): string {
    return `m/44'/60'/${idx}'/0/0`;
  }
}
