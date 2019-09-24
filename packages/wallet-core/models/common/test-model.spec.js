import { TestModel } from './test-model';

describe('wallet-code/db/models/TestModel', () => {
  it('it expect TestModel to have schema defined', () => {
    expect(TestModel.schema).toBeDefined();
  });

  it('expect TestModel to have realm instance', () => {
    const instance = new TestModel();
    expect(instance.realm).toBeDefined();
  });
});
