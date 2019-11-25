import uuid from 'uuid/v4';
import { WalletModel } from './wallet-model';
// import { initTestRealm } from '../../tests/utils';

// beforeAll(initTestRealm);

const fixtures = [{
  vaultId: '<vault-id>',
  name: 'Test wallet',
  address: uuid(),
  type: 'hd',
  path: '',
}, {
  vaultId: '<vault-id>',
  name: 'Test wallet 2',
  address: uuid(),
  type: 'hd',
  path: '',
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
