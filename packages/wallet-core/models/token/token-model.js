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

  constructor() {
    super(TokenModel.schema);
  }
}

