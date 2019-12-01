import type { VaultConstructor } from './types';

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

}
