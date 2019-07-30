// @flow
import ethUtil from 'ethereumjs-util';

class Wallet {
  constructor(privateKey: string) {
    const pubKey = ethUtil.privateToPublic(privateKey);
    const addr = ethUtil.publicToAddress(pubKey).toString('hex');

    this.privateKey = privateKey;
    this.address = ethUtil.toChecksumAddress(addr);
  }

  getPrivateKey(): string {
    return this.privateKey;
  }

  getAddress(): string {
    return this.address;
  }
}

export default Wallet;
