// @flow
import { privateToPublic, publicToAddress, toChecksumAddress } from 'ethereumjs-util';

export class Wallet {
  constructor(privateKey: string) {
    const pubKey = privateToPublic(privateKey);
    const addr = publicToAddress(pubKey).toString('hex');

    this.privateKey = toChecksumAddress(privateKey.toString('hex'));
    this.address = toChecksumAddress(addr);
  }
}
