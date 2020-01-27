import { WalletBuilder } from '@selfkey/blockchain/util/wallet-builder';
import { getConfigs } from '@selfkey/configs';
import { createVault } from '../../identity-vault';
import { WalletModel, TokenModel, WalletTokenModel } from '../../models';

/**
 * This process will:
 * - Create identity vault
 * - Create wallet model in the public database, so that users can select it to be unlocked when loading the wallet
 *
 * @param {*} params
 */
export async function setupHDWallet({ mnemonic, password }) {
  const builder = await WalletBuilder.createFromMnemonic(mnemonic);

  const vault = await createVault({
    mnemonic: mnemonic,
    seed: builder.seed,
    rootPublicKey: builder.toJSON().xpub,
    password: password,
    securityPolicy: {
      password: true,
      faceId: false,
      fingerprint: false,
    },
  });

  const path = builder.getETHPath(0);
  const hdWallet = builder.createWallet(path);

  const primaryToken = await TokenModel.getInstance().findBySymbol(getConfigs().primaryToken);
  const tokens = [{
    id: WalletTokenModel.getInstance().generateId(),
    balance: '0',
    balanceInFiat: 0,
    hidden: false,
    tokenId: primaryToken.id
  }];

  const wallet = await WalletModel.getInstance().create({
    address: hdWallet.address,
    name: 'SelfKey Wallet',
    vaultId: vault.id,
    type: 'hd',
    path: path,
    tokens,
  });

  return {
    wallet,
    vault,
  }
}