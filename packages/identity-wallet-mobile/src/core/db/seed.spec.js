import { TokenModel } from '../models';
import tokensData from '../assets/data/eth-tokens.json';

describe('core/db/models/WalletToken', () => {
  // Seed is executed in the global setup

  it('expect to load eth tokens', async () => {
    const dbTokens = await TokenModel.getInstance().findAll();

    expect(dbTokens.length).toEqual(tokensData.length);
    expect(dbTokens[0].address).toEqual(tokensData[0].address);
    expect(dbTokens[0].symbol).toEqual(tokensData[0].symbol);
    expect(dbTokens[0].decimal).toEqual(tokensData[0].decimal);
  });
});
