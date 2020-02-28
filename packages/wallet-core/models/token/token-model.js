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
    return this.findOne('address = $0', address);
  }

  constructor() {
    super(TokenModel.schema);
  }
}

