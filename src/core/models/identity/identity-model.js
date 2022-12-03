import { BaseModel } from '../common/base-model';

export class IdentityModel extends BaseModel {
  static instance: IdentityModel;

  static schema = {
    name: 'Identity',
    primaryKey: 'id',
    properties: {
      id: 'int',
      walletId: 'string',
      name: 'string?',
      // type: 'string'
      profilePicture: 'string?',
      isSetupFinished: {
        type: 'bool',
        default: false,
      },
      did: 'string?'
      // id: { type: 'integer' },
      // walletId: { type: 'integer' },z
      // parentId: { type: ['integer', null] },
      // rootIdentity: { type: 'boolean', default: true },
      // name: { type: 'string' },
      // type: { type: 'string' },
      // profilePicture: { type: 'binary' },
      // did: { type: 'string' },
      // isSetupFinished: { type: 'boolean', default: false },
    },
  };

  static getInstance() {
    if (!IdentityModel.instance) {
      IdentityModel.instance = new IdentityModel();
    }

    return IdentityModel.instance;
  }

  constructor() {
    super(IdentityModel.schema);
  }

  findAllByWalletId(walletId) {
    return this.find(item => item.walletId === walletId, walletId); 
  }
}
