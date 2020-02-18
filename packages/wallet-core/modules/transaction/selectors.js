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
export const getTokenOptions = (state) => getRoot(state).tokenOptions;
export const getSelectedTransactionFee = (state) => {
  const transactionFee = getTransactionFee(state);
  return getTransactionFeeOptions(state).find(opt => opt.id === transactionFee);
}

export const getFiatAmount = (state) => {
  const { amount, token } = getRoot(state);

  if (!token) {
    return 0;
  }

  const price = getTokenPrice(token);

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
export const getStatus = (state) => getRoot(state).status;
export const getTransactionHash = (state) => getRoot(state).transactionHash;
export const canSend = (state) => {
  const errors = getErrors(state);
  const amount = getAmount(state);
  const address = getAddress(state);

  return address && amount > 0 && !errors.address;
}
export const isProcessing = state => getRoot(state).isProcessing;
export const getTransaction = (state) => {
  const transaction = getRoot(state);
  const token = getToken(state);
  const tokenDetails = ducks.wallet.selectors.getTokenDetails(token)(state);
  const amount = getAmount(state);

  return {
    nonce: transaction.nonce,
    tokenDecimal: tokenDetails.decimal,
    tokenSymbol: token,
    gasPrice: getGasPrice(state),
    gasLimit: getGasLimit(state),
    address: getAddress(state),
    amount: amount,
    cryptoCurrency: token,
    token: token,
    hash: getTransactionHash(state),
    from: ducks.wallet.selectors.getAddress(state),
    contractAddress: tokenDetails.contractAddress,
    remainingBalance: new BN(tokenDetails.amount).minus(amount).toString(),
    errorMessage: getRoot(state).errorMessage,
    errorInfo: getRoot(state).errorInfo,
    errorInfoUrl: getRoot(state).errorInfoUrl,
    // amountUsd
    // usdFee
    // balance
    // contractAddress
    // tokenDecimal
  }
}





