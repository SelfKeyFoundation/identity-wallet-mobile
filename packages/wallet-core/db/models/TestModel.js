import { BaseModel } from './BaseModel';

export class TestModel extends BaseModel {
  static schema = {
    name: 'Test',
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
