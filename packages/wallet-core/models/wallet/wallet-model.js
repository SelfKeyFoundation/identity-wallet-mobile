import { BaseModel } from '../common/base-model';

export class WalletModel extends BaseModel {
  static schema = {
    name: 'wallet',
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

  findByPublicKey(publicKey) {
		return this.findOne('publicKey = $0', publicKey.toLowerCase());
	}
}
