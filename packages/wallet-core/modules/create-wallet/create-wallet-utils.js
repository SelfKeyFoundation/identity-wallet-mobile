import { WalletBuilder } from '@selfkey/blockchain/util/wallet-builder';
import { getConfigs } from '@selfkey/configs';
import { createVault } from '../../identity-vault';
import { WalletModel, TokenModel, WalletTokenModel } from '../../models';
import top20Tokens from '../../assets/data/top-20-tokens.json';

export async function getTop20Tokens() {
  let currentTokenId = await TokenModel.getInstance().generateId();

  return Promise.all(top20Tokens.map(async (token) => {
    let dbToken = await TokenModel.getInstance().findBySymbol(token.symbol);

    if (!dbToken) {
      dbToken = await TokenModel.getInstance().create({
        id: currentTokenId++,
        decimal: token.decimal,
        address: token.address,
        name: token.name,
        isCustom: true,
        symbol: token.symbol,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      // If token is already in db, then update contract address
      // Some tokens have updated their addresses, example: https://etherscan.io/address/0xc66ea802717bfb9833400264dd12c2bceaa34a6d
      await TokenModel.getInstance().updateById(dbToken.id, {
        decimal: token.decimal,
        address: token.address,
        updatedAt: new Date(),
      });
    }

    return {
      tokenId: dbToken.id,
    };
  }));
}

// add top 20 tokens into already existing wallet
export async function addTop20Tokens(wallet) {
  const tokens = await getTop20Tokens();
  const dbWallet = WalletModel.getInstance().findByAddress(wallet.address);
  const walletTokens = Array.from(dbWallet.tokens);
  let walletTokenId = WalletTokenModel.getInstance().generateId();
  let tokenAdded = false;

  tokens.forEach((token) => {
    const tokenFound = walletTokens.find(t => t.tokenId === token.tokenId);

    if (tokenFound) {
      return;
    }

    tokenAdded = true;

    walletTokens.push({
      ...token,
      id: walletTokenId++,
      balance: '0',
      balanceInFiat: 0,
      hidden: false,
    });
  });

  if (!tokenAdded) {
    return wallet;
  }

  const updatedWallet = {
    tokens: walletTokens.map(t => {
      const balance = t.balance !== undefined && t.balance.toString();
  
      return {
        ...t,
        balance,
      };
    })
  };

  await WalletModel.getInstance().updateById(wallet.id, updatedWallet);
  return updatedWallet;
}

export async function getDefaultTokens({ addTop20 = false } = {}) {
  const primaryToken = await TokenModel.getInstance().findBySymbol(getConfigs().primaryToken);
  let tokens = [{
    tokenId: primaryToken.id
  }];

  if (addTop20) {
    const top20 = await getTop20Tokens();
    tokens = [
      ...tokens,
      ...top20,
    ];
  }

  const walletTokenId = WalletTokenModel.getInstance().generateId();
  const result = tokens.map((item, idx) => ({
    id: walletTokenId + idx,
    balance: '0',
    balanceInFiat: 0,
    hidden: false,
    ...item,
  }));

  return result;
}

/**
 * This process will:
 * - Create identity vault
 * - Create wallet model in the public database, so that users can select it to be unlocked when loading the wallet
 *
 * @param {*} params
 */
export async function setupHDWallet({ mnemonic, password, addTop20 }) {
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

  const wallet = await WalletModel.getInstance().create({
    address: hdWallet.address,
    name: 'SelfKey Wallet',
    balance: '0',
    vaultId: vault.id,
    type: 'hd',
    path: path,
    tokens: await getDefaultTokens({ addTop20 }),
    biometricsEnabled: null
  });

  return {
    wallet,
    vault,
  };
}

export async function setupPrivateKeyWallet({ privateKey, address, password, addTop20 }) {
  const vault = await createVault({
    privateKey,
    address,
    password: password,
    securityPolicy: {
      password: true,
      faceId: false,
      fingerprint: false,
    },
  });

  const wallet = await WalletModel.getInstance().create({
    address: address,
    name: 'SelfKey Wallet',
    balance: '0',
    vaultId: vault.id,
    type: 'privateKey',
    tokens: await getDefaultTokens({ addTop20 }),
    biometricsEnabled: null
  });

  return {
    wallet,
    vault,
  }
}
