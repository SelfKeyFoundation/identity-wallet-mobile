import walletActions from './actions';
import * as walletSelectors from './selectors';
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

const loadWalletOperation = ({ wallet, vault }) => async (dispatch, getState) => {
  // TODO: Store balance in the database
  // When db balance is available can display it and fetch the real balance in background
  // It will make the loading process faster
  try {
    wallet.balance = await getBalanceByAddress(wallet.address);
  } catch(err) {
    console.error(err);
  }

  // Fetch tokens balance
  try {
    wallet.tokens = await Promise.all(wallet.tokens.map(async (walletToken) => {
      const token = await TokenModel.getInstance().findById(walletToken.tokenId);
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
  } catch(err) {
    console.error(err);
  }

  // TODO: Used for test purposes, will be removed when getting the token adress available to the user
  console.log('Wallet:', wallet);

  dispatch(walletActions.setWallet(wallet));
};

export const operations = {
  loadWalletOperation,
};

export const walletOperations = {
  ...walletActions,
  ...operations,
};

export default walletOperations;
