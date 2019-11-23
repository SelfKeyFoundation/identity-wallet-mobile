import type { VaultConstructor } from './types';

export class IdentityVault {
  constructor(props: VaultConstructor) {
    this.id = props.id;
    this.type = props.type;
    this.password = props.password;
    this.db = props.db;
  }
  // Create methods to manage identity

}
