// @flow
import { getTokenPrice } from '@selfkey/blockchain/services/price-service';

export const getRoot = state => state.transaction;
export const getAddress = (state) => getRoot(state).address;
export const getErrors = (state) => getRoot(state).errors;
export const getAmount = (state) => getRoot(state).amount;
export const getToken = (state) => getRoot(state).token;
export const getTransactionFee = (state) => getRoot(state).transactionFee;
export const getTransactionFeeOptions = (state) => getRoot(state).transactionFeeOptions;
export const isAdvancedMode = (state) => getRoot(state).advancedMode;
export const getFiatAmount = (state) => {
  const { amount, token } = getRoot(state);
  const price = getTokenPrice('ETH');

  return amount * price.priceUSD;
};
export const getETHFee = (state) => 0;
export const getFiatFee = (state) => 0;
export const getSendEnabled = (state) => getRoot(state).sendEnabled;
export const getStatus = (state) => getRoot(state).status;





