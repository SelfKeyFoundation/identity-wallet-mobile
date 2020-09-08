// @flow
export type UnlockPolicy = {
  password: boolean,
  faceId: boolean,
  fingerprint: false,
}

export type VaultConstructor = {
  type: 'hd' | 'private-key',
  privateKey: string,
  address: string,
  /**
   * Password to unlock the wallet
   */
  password: string,
  /**
   * Define how the wallet can be unlocked
   */
  unlockPolicy: UnlockPolicy,
}

export interface IdentityItem {
  id: string,
  data: string,
  buffer: any,
  mimeType: string,
}

export interface IdentityKeychain {
  getItem(id: string): Promise<any>;
  setItem(id: string, data: any): Promise<void>;
  removeItem(id: string): Promise<void>;
  getSupportedBiometryType(): any;
}

export interface IdentityDatabase {
  getItem(): Promise<IdentityItem>;
  setItem(item: IdentityItem): Promise<void>;
  create(): Promise<IdentityDatabase>;
}
