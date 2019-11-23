import { unlockVault } from '../identity-vault';
import { WalletModel } from '../models';
import { initIdentityVault } from './utils';

describe('Test Setup', () => {
  let walletModel;
  let wallet;

  beforeAll(async () => {
    await initIdentityVault();
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

    console.log(vault);
  });
});
