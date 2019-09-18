import { TestModel } from './TestModel';

describe('Models: TestModel', () => {
  it('expect schema to be defined', () => {
    expect(TestModel.schema).toBeDefined();
  });

  it('expect schema to have a name', () => {
    expect(TestModel.schema.name).toBeDefined();
  });

  it('expect schema to be defined in base model', () => {
    const model = new TestModel();
    expect(model.schema).toBeDefined();
  });
});
