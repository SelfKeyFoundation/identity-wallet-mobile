import { WalletBuilder } from './wallet-builder';

describe('Wallet Builder', () => {
  it('Expect to create wallet', async () => {
    const mnemonic = WalletBuilder.generateMnemonic();
    const builder = await WalletBuilder.createFromMnemonic(mnemonic);
    const wallet = builder.createWallet(0);

    expect(wallet.address).toBeDefined();
    expect(wallet.privateKey).toBeDefined();
  });

  it('Expect to create wallet from private key', async () => {
    const mnemonic = WalletBuilder.generateMnemonic();
    const builder = await WalletBuilder.createFromMnemonic(mnemonic);
    const { xpriv, xpub } = builder.toJSON();
    const newBuilder = await WalletBuilder.createFromJSON({ xpriv, xpub });

    expect(newBuilder.root.privateKey).toEqual(builder.root.privateKey);
    expect(newBuilder.root.publicKey).toEqual(builder.root.publicKey);
  });
});
