import { BaseModel } from '../common/base-model';

export class WalletModel extends BaseModel {
  static instance: WalletModel;

  static schema = {
    name: 'Wallet',
    primaryKey: 'address',
    properties: {
      address: 'string',
      name: 'string',
      balance: {
        type: 'string?',
        default: '0',
      },
      unlockCount: {
        type: 'int?',
        default: 0,
      },
      txHistoryLastSyncedBlock: {
        type: 'int?',
        default: 0,
      },
      vaultId: 'string',
      /**
       * hd-wallet or private-key
       */
      type: 'string',
      /**
       * Path for HD wallets
       */
      path: 'string?',
      tokens: {
        type: 'WalletToken[]',
        default: []
      },
      // termsAccepted: 'bool?',
    },
  }

  static getInstance() {
    if (!WalletModel.instance) {
      WalletModel.instance = new WalletModel();
    }

    return WalletModel.instance;
  }

  constructor() {
    super(WalletModel.schema);
  }

  findByAddress(address) {
		return this.findOne('address = $0', address);
  }

  updateByAddress(address, data) {
    return this.realm.write(() => {
      return this.realm.create(this.schema.name, {
        ...data,
        address,
      }, true);
    });
  }
}
