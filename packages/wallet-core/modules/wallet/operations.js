import walletActions from './actions';
import * as selectors from './selectors';
import { WalletModel, TokenModel } from '../../models';
import { exitApp } from '../../system';
import { getBalanceByAddress, getTokenBalance } from './wallet-util';
import { getTokenPrice } from '@selfkey/blockchain/services/price-service';

function getSymbol(symbol) {
  if (symbol === 'KI') {
    return 'KEY';
  }

  return symbol;
}

async function loadWalletBalance(wallet) {
  wallet.balance = await getBalanceByAddress(wallet.address);
}

async function loadWalletTokens(wallet) {
  // Fetch tokens balance
  wallet.tokens = await Promise.all(wallet.tokens.map(async (walletToken) => {
    const token = await TokenModel.getInstance().findById(walletToken.tokenId || walletToken.id);
    let balance = 0;

    try {
      balance = await getTokenBalance(token.address, wallet.address);
    } catch(err) {
      console.error(err);
    }

    const price = getTokenPrice(token.symbol);

    return {
      id: token.id,
      symbol: getSymbol(token.symbol),
      decimal: token.decimal,
      address: token.address,
      balanceInFiat: price.priceUSD,
      balance,
    }
  }));
}

/**
 * Refresh wallet balance and tokens balance
 */
const refreshWalletOperation = () => async (dispatch, getState) => {
  const wallet = getState().wallet;

  try {
    await Promise.all([
      loadWalletBalance(wallet),
      loadWalletTokens(wallet)
    ]);
  } catch(err) {
    console.error(err);
  }

  dispatch(walletActions.setWallet(wallet));
};

/**
 * 
 * Load wallet
 */
const loadWalletOperation = ({ wallet }) => async (dispatch, getState) => {
  await dispatch(walletActions.setWallet(wallet));

  // TODO: Store balance in the database
  // When db balance is available can display it and fetch the real balance in background
  // It will make the loading process faster
  await dispatch(refreshWalletOperation());
};

export const operations = {
  loadWalletOperation,
  refreshWalletOperation,
};

export const walletOperations = {
  ...walletActions,
  ...operations,
};

export default walletOperations;
