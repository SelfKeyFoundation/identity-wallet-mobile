import uuid from 'uuid/v4';
import { ContractAllowanceModel } from './contract-allowance-model';

const fixtures = [
  {
		contractAddress: 'testC',
		tokenAddress: 'testT',
    walletId: 1,
  },
	{
    contractAddress: 'testC2',
		tokenAddress: 'testT2',
		walletId: 2
  }
];


describe('core/db/models/ContractAllowanceModel', () => {
  const model = ContractAllowanceModel.getInstance();

  it('expect schema to be defined', () => {
    expect(ContractAllowanceModel.schema).toBeDefined();
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
