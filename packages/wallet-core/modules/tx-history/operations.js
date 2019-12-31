import txHistoryActions from './actions';
import txHistoryDuck from './index';
import ducks from '../index';
import { TxHistoryModel } from '../../models';

const txHistoryModel = TxHistoryModel.getInstance();

// TODO: Move to configs
const chainId = 3;

export const operations = {
  /**
   * Create txHistory
   */
  createTransactionOperation: (transaction) => async (dispatch, getState) => {
    const newTransaction = {
      hash: transaction.hash,
      networkId: chainId,
      tokenSymbol: transaction.token,
      from: transaction.from,
      to: transaction.address,
      gasPrice: transaction.gasPrice,
      gasLImit: transaction.gasLimit,
      tokenDecimal: transaction.tokenDecimal,
      value: transaction.amount,
      nonce: transaction.nonce,
      contractAddress: transaction.contractAddress,
      // TODO: Figure out how to handle it
      txReceiptStatus: 0,
      isError: false,
      // confirmations: 1,
      // blockNumber: ''
      // timeStamp: Date.now(),
      // transactionIndex: 0,
    };

    await txHistoryModel.create(newTransaction);
    await dispatch(txHistoryActions.addTransaction(newTransaction));


    // nonce: 0,
    // tokenDecimal: 10,
    // gasPrice: 0.00001,
    // gasLimit: 28000,
    // address: 'some-address',
    // amount: amount,
    // cryptoCurrency: getToken(state),
    // hash: getTransactionHash(state),
    // from: ducks.wallet.selectors.getAddress(state),
    // contractAddress: tokenDetails.tokenContract,

    // const wallet = getWallet(getState());
    // const transaction = getTransaction(getState());
    // const { cryptoCurrency } = transaction;
    // const tokenSymbol = cryptoCurrency === 'ETH' ? null : cryptoCurrency;
    // const data = {
    //   ...transaction,
    //   tokenSymbol,
    //   networkId: chainId,
    //   from: wallet.address,
    //   to: transaction.address,
    //   value: +transaction.amount,
    //   gasPrice: +transaction.gasPrice,
    //   hash: transactionHash
    // };

  }
};

export const transactionOperations = {
  ...txHistoryActions,
  ...operations,
};

export default transactionOperations;
