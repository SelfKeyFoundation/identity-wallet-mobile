// @flow
import { getTokenPrice } from '@selfkey/blockchain/services/price-service';
import BN from 'bignumber.js';
import ducks from '../';

export const DEFAULT_ETH_GAS_LIMIT = 21000;

export const getRoot = state => state.transaction;
export const getAddress = (state) => getRoot(state).address;
export const getErrors = (state) => getRoot(state).errors;
export const getAmount = (state) => getRoot(state).amount;
export const getToken = (state) => getRoot(state).token;
export const getTransactionFee = (state) => getRoot(state).transactionFee;
export const getTransactionFeeOptions = (state) => getRoot(state).transactionFeeOptions;
export const isAdvancedMode = (state) => getRoot(state).advancedMode;
export const getSelectedTransactionFee = (state) => {
  const transactionFee = getTransactionFee(state);
  return getTransactionFeeOptions(state).find(opt => opt.id === transactionFee);
}

export const getFiatAmount = (state) => {
  const { amount, token } = getRoot(state);
  const price = getTokenPrice('ETH');

  return amount * price.priceUSD;
};
export const getETHFee = (state) => getSelectedTransactionFee(state).ethAmount;
/**
 * 
 * @param {string} gasPrice in wei 
 */
export const getGasPrice = (state) => {
  return getSelectedTransactionFee(state).gasPrice;
};

export const getGasLimit = (state) => getRoot(state).gasLimit || DEFAULT_ETH_GAS_LIMIT;
export const getFiatFee = (state) => getSelectedTransactionFee(state).fiatAmount;
export const getSendEnabled = (state) => getRoot(state).sendEnabled;
export const getStatus = (state) => getRoot(state).status;
export const getTransactionHash = (state) => getRoot(state).transactionHash;
export const getTransaction = (state) => {
  const transaction = getRoot(state);
  const token = getToken(state);
  const tokenDetails = ducks.wallet.selectors.getTokenDetails(token)(state);
  const amount = getAmount(state);

  return {
    nonce: transaction.nonce,
    tokenDecimal: tokenDetails.decimal,
    gasPrice: getGasPrice(state),
    gasLimit: getGasLimit(state),
    address: getAddress(state),
    amount: amount,
    cryptoCurrency: getToken(state),
    hash: getTransactionHash(state),
    from: ducks.wallet.selectors.getAddress(state),
    contractAddress: tokenDetails.tokenContract,
    remainingBalance: new BN(tokenDetails.amount).minus(amount).toString(),
    errorMessage: 'You don\'t have enough Ethereum (ETH) to pay for the network transaction fee. Please transfer some ETH to your following wallet and try again.',
    errorInfo: 'To learn more about transaction fees, click here.',
    errorInfoUrl: 'https://help.selfkey.org/article/87-how-does-gas-impact-transaction-speed',
    // amountUsd
    // usdFee
    // balance
    // contractAddress
    // tokenDecimal
  }
}





