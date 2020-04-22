import { getTop20Tokens } from './create-wallet-utils';
import top20Tokens from '../../assets/data/top-20-tokens.json';
import { TokenModel } from '../../models';

describe('Create Wallet Utils', () => {
  describe(('getTop20Tokens'), () => {
    let tokens;

    beforeAll(async () => {
      tokens = await getTop20Tokens();
    });

    it('expect to return 20 tokens', () => {
      expect(tokens).toHaveLength(20);
    });

    it('expect to return tokenIds', () => {
      tokens.forEach((token) => {
        expect(token.tokenId).toBeDefined();
      });
    });

    it('expect to create tokens on db', async () => {
      for (const token of tokens) {
        const dbToken = await TokenModel.getInstance().findById(token.tokenId);
        const assetToken = top20Tokens.find((item) => item.symbol === dbToken.symbol);

        expect(dbToken).toBeDefined();
        expect(assetToken).toBeDefined();

        // Make sure that db token addresses are up to date.
        expect(assetToken.address).toEqual(dbToken.address);
      }
    });
  });
});
