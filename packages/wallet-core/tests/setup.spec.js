import { unlockVault } from '../identity-vault';
import { WalletModel } from '../models';

describe('Test Setup', () => {
  let walletModel;
  let wallet;

  beforeAll(async () => {
    walletModel = new WalletModel();
    const wallets = walletModel.findAll();
    wallet = wallets[0];
  });

  it('Expect wallet to be created', async () => {
    expect(wallet).toBeDefined();
  });

  it('Expect vault to be created', async () => {
    const { vaultId } = wallet;
    const vault = await unlockVault(vaultId, 'test');
    expect(vault).toBeDefined();
  });

  it('Expect wallet to have default tokens', async () => {
    // expect(wallet.tokens).toHaveLength(1);
    // expect(wallet.tokens[0].symbol).toEqual('KEY');
  });
});
