import { BaseModel } from '../common/base-model';

export class WalletModel extends BaseModel {
  static schema = {
    name: 'wallet',
    primaryKey: 'address',
    properties: {
      address: 'string',
      name: 'string',
      vaultId: 'string',
      /**
       * hd-wallet or private-key
       */
      type: 'string',
      /**
       * Path for HD wallets
       */
      path: 'string?',
    },
  }

  constructor() {
    super(WalletModel.schema);
  }

  findByAddress(address) {
		return this.findOne('address = $0', address.toLowerCase());
	}
}
