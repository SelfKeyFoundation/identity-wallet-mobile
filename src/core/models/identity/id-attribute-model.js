import { BaseModel } from '../common/base-model';

export class IdAttributeModel extends BaseModel {
  static instance: IdAttributeModel;

  static schema = {
    name: 'IdAttribute',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      identityId: 'int',
      // What?
      typeId: 'int',
      data: 'string',
      env: 'string?'
      // id: { type: 'integer' },
      // url: { type: 'string' },
      // defaultRepositoryId: { type: 'integer' },
      // content: { type: 'object' },
      // expires: { type: 'integer' },
      // env: { type: 'string', enum: ['production', 'development'], default: env }
    },
  };

  static getInstance() {
    if (!IdAttributeModel.instance) {
      IdAttributeModel.instance = new IdAttributeModel();
    }

    return IdAttributeModel.instance;
  }

  constructor() {
    super(IdAttributeModel.schema);
  }

  findAllByIdentityId(identityId) {
		return this.find(item => item.identityId === identityId, identityId);
  }

  applyCustomMapping(item) {
    // item.data = typeof item.data === 'string' ? JSON.parse(item.data) : item.data || {};
    return item;
  }

  beforeCreate(item) {
    // if (typeof item.data === 'object') {
    //   item.data = JSON.stringify(item.data);
    // }

    item.createdAt = new Date();
    item.updatedAt = item.createdAt;

    return item;
  }

  beforeUpdate(item) {
    // if (typeof item.data === 'object') {
    //   item.data = JSON.stringify(item.data);
    // }

    item.updatedAt = new Date();

    return item;
	}
}
