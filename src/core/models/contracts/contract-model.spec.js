import uuid from 'uuid/v4';
import { ContractModel } from './contract-model';

const fixtures = [
  {
		name: 'test',
		address: 'test'
	},
	{
    name: 'test2',
    address: 'test2',
  }
];


describe('core/db/models/ContractModel', () => {
  const model = ContractModel.getInstance();

  it('expect schema to be defined', () => {
    expect(ContractModel.schema).toBeDefined();
  });

  it('expect to have realm instance', () => {
    expect(model.realm).toBeDefined();
  });

  describe('methods', () => {
    beforeEach(() => {
      model.removeAll();
      fixtures.map(model.create.bind(model));
    });

    it('findAll', () => {
      const items = model.findAll();
      expect(items.length).toEqual(fixtures.length);
    });
  });
});
