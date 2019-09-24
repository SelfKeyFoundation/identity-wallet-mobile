import { BaseModel } from './base-model';

export class TestModel extends BaseModel {
  static schema = {
    name: 'test',
    primaryKey: 'id',
    properties: {
      id: { type: 'int' },
      name: { type: 'string' },
    },
  }

  constructor() {
    super(TestModel.schema);
  }
}
