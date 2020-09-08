import { BaseModel } from '../common/base-model';

export class WalletTokenModel extends BaseModel {
  static instance: WalletTokenModel;

  static schema = {
    name: 'WalletToken',
    primaryKey: 'id',
    properties: {
      id: 'int',
      balance: {
        type: 'string',
        default: '0'
      },
      balanceInFiat: {
        type: 'float',
        default: 0
      },
      hidden: {
        type: 'bool',
        default: false,
      },
      tokenId: 'int'
      // balance: string,
      // balanceInFiat: number,
      // hidden: booleanLiteral,
      // price: 0,
      // priceUSD: number,
      // recordState: number,
      // tokenId: number  
      // price: 'float',
      // priceUSD: 'float',
      // recordState: number,
      // tokenId: number  
    },
  }

  static getInstance() {
    if (!WalletTokenModel.instance) {
      WalletTokenModel.instance = new WalletTokenModel();
    }

    return WalletTokenModel.instance;
  }

  constructor() {
    super(WalletTokenModel.schema);
  }
}
