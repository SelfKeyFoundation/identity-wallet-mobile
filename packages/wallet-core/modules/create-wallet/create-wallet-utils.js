import { WalletBuilder } from '@selfkey/blockchain/util/wallet-builder';
import { createVault } from '../../identity-vault';
import { WalletModel } from '../../models';

/**
 * This process will:
 * - Create identity vault
 * - Create wallet model in the public database, so that users can select it to be unlocked when loading the wallet
 *
 * @param {*} params
 */
export async function setupHDWallet({ mnemonic, password }) {
  const builder = await WalletBuilder.createFromMnemonic(mnemonic);

  const { xpriv, xpub } = builder.toJSON();

  const vault = await createVault({
    privateKey: xpriv,
    publicKey: xpub,
    password: password,
    unlockPolicy: {
      password: true,
      faceId: false,
      fingerprint: false,
    },
  });

  const path = builder.getETHPath(0);
  const wallet = builder.createWallet(path);

  await WalletModel.getInstance().create({
    address: wallet.address,
    name: 'SelfKey Wallet',
    vaultId: vault.id,
    type: 'hd',
    path: path,
  });
}