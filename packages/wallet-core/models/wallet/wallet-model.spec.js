import uuid from 'uuid/v4';
import { WalletModel } from './wallet-model';

const fixtures = [{
  id: 1,
  name: 'Test wallet',
  address: uuid(),
  privateKey: uuid(),
}, {
  id: 2,
  name: 'Test wallet 2',
  address: uuid(),
  privateKey: uuid(),
}];

describe('core/db/models/WalletModel', () => {
  const model = new WalletModel();

  it('expect schema to be defined', () => {
    expect(WalletModel.schema).toBeDefined();
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
      const item = model.findByAddress(data.address);

      expect(item.id).toEqual(data.id);
      expect(item.address).toEqual(data.address);
    });
  });
});
