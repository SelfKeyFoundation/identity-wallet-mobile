import { BaseModel } from './BaseModel';

export class WalletModel extends BaseModel {
  static schema = {
    name: 'Wallet',
    primaryKey: 'id',
    properties: {
      id: { type: 'int' },
      name: { type: 'string' },
      publicKey: { type: 'string' },
      privateKey: { type: 'string' },
    },
  }

  constructor() {
    super(WalletModel.schema);
  }
}
