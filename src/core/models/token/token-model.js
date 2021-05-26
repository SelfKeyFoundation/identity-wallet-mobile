import { BaseModel } from '../common/base-model';

export class TokenModel extends BaseModel {
  static instance: TokenModel;

  static schema = {
    name: 'Token',
    primaryKey: 'id',
    properties: {
      id: 'int',
      decimal: 'int',
      address: 'string',
      icon: 'string?',
      name: 'string?',
      chainId: 'int?',
      isCustom: {
        type: 'bool',
        default: false,
      },
      symbol: 'string',
      createdAt: 'date',
      updatedAt: 'date',
    },
  }

  static getInstance() {
    if (!TokenModel.instance) {
      TokenModel.instance = new TokenModel();
    }

    return TokenModel.instance;
  }

  findBySymbol(symbol) {
    return this.findOne('symbol = $0', symbol);
  }

  findByAddress(address) {
    console.log('Find token by address: ' + address);
    // const result = ;
    // console.log('result', result);

    return this.findOne('address = $0', address);
  }

  constructor() {
    super(TokenModel.schema);
  }
}

