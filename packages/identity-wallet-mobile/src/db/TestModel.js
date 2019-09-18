import { BaseModel } from './BaseModel';

export class TestModel extends BaseModel {
  static schema = {
    name: 'test',
    properties: {
      name: 'string',
      privateKey: 'string',
      password: 'string',
    },
  }

  constructor() {
    super(TestModel.schema);
  }
}
