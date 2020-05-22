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
}
