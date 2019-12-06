import uuid from 'uuid/v4';
import { WalletTokenModel } from './wallet-token-model';
import { TokenModel } from '../token/token-model';


describe('core/db/models/WalletToken', () => {
  const model = WalletTokenModel.getInstance();

  it('expect schema to be defined', () => {
    expect(WalletTokenModel.schema).toBeDefined();
  });

  it('expect to have realm instance', () => {
    expect(model.realm).toBeDefined();
  });

  describe('methods', () => {
    it('create wallet token', async () => {
      const token = TokenModel.getInstance().create({
        id: 1,
        decimal: 18,
        address: '<address>',
        icon: undefined,
        symbol: 'KI',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const walletToken = await model.create({
        id: 1,
        token,
      });

      expect(walletToken.token.id).toEqual(token.id);
    });
  });
});
