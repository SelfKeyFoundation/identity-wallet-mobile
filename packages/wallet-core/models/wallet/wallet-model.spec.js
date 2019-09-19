import uuid from 'uuid/v4';
import { WalletModel } from './wallet-model';

const fixtures = [{
  id: 1,
  name: 'Test wallet',
  publicKey: uuid(),
  privateKey: uuid(),
}, {
  id: 2,
  name: 'Test wallet 2',
  publicKey: uuid(),
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

    it('findByPublicKey', () => {
      const data = fixtures[0];
      const item = model.findByPublicKey(data.publicKey);

      expect(item.id).toEqual(data.id);
      expect(item.publicKey).toEqual(data.publicKey);
    });
  });
});
