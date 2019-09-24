import { BaseModel } from '../common/base-model';

export class WalletModel extends BaseModel {
  static schema = {
    name: 'wallet',
    primaryKey: 'id',
    properties: {
      id: { type: 'int' },
      name: { type: 'string' },
      address: { type: 'string' },
      privateKey: { type: 'string' },
    },
  }

  constructor() {
    super(WalletModel.schema);
  }

  findByAddress(address) {
		return this.findOne('address = $0', address.toLowerCase());
	}
}
