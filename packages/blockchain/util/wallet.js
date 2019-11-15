// @flow
import { privateToPublic, publicToAddress, toChecksumAddress } from 'ethereumjs-util';

export class Wallet {
  constructor(privateKey: string) {
    const pubKey = privateToPublic(privateKey);
    const addr = publicToAddress(pubKey).toString('hex');

    this.privateKey = privateKey;
    this.address = toChecksumAddress(addr);
  }
}
