import uuid from 'uuid/v4';
import { TokenModel } from './token-model';

const fixtures = [{
  id: 1,
  decimal: 18,
  address: '<address>',
  icon: undefined,
  // isCustom: true,
  symbol: 'KI',
  createdAt: new Date(),
  updatedAt: new Date(),
}];

describe('core/db/models/WalletModel', () => {
  const model = TokenModel.getInstance();

  it('expect schema to be defined', () => {
    expect(TokenModel.schema).toBeDefined();
  });

  it('expect to have realm instance', () => {
    expect(model.realm).toBeDefined();
  });

  describe('methods', () => {
    beforeEach(() => {
      model.removeAll();
      fixtures.map(model.create.bind(model));
    });

    it('findByAddress', () => {
      const data = fixtures[0];
      const item = model.findById(data.id);

      expect(item.id).toEqual(data.id);
      expect(item.address).toEqual(data.address);
      expect(item.isCustom).toEqual(false);
    });
  });
});
