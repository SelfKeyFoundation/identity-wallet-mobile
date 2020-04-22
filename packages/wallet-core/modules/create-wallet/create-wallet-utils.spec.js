import { getTop20Tokens, setupHDWallet, addTop20Tokens } from './create-wallet-utils';
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

  describe('insertTop20Tokens', () => {
    let wallet;

    beforeAll(async () => {
      const result = await setupHDWallet({
        mnemonic: 'test',
        password: 'test',
        addTop20: false,
      });

      wallet = result.wallet;
    })

    it('expect to create wallet without top20 tokens', () => {
      expect(wallet.tokens).toHaveLength(1);
    });

    it('expect to add top20 tokens into existing wallet', async () => {
      const updatedWallet = await addTop20Tokens(wallet);

      expect(updatedWallet.tokens).toHaveLength(21);
    })
  });
});
