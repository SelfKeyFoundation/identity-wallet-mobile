import { BaseModel } from './BaseModel';

export class WalletModel extends BaseModel {
  static schema = {
    name: 'test',
    properties: {
      name: 'string',
      privateKey: 'string',
      password: 'string',
    },
  }

  constructor() {
    super(WalletModel.schema);
  }
}
