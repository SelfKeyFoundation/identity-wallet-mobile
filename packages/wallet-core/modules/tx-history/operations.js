import { getConfigs } from '@selfkey/configs';
import { TxHistoryService } from '@selfkey/wallet-core/services/tx-history-service';
import txHistoryActions from './actions';
import duck from './index';
import ducks from '../index';
import { TxHistoryModel } from '../../models';

function filterTransactions(tx) {
  return !!tx.tokenSymbol;
}

export const operations = {
  updateTransactionOperation: (hash, updatedData) => async (dispatch, getState) => {
    await TxHistoryModel.getInstance().addOrUpdate(updatedData);
    const txs = await TxHistoryModel.getInstance().findAll();
    await dispatch(txHistoryActions.updateTransaction(hash, updatedData));
  },

  loadTxHistoryOperation: (force) => async (dispatch, getState) => {
    const state = getState();
    const address = ducks.wallet.selectors.getAddress(state);
    await dispatch(duck.actions.setLoding(true));

    // Fetch tx history from DB
    let transactions = await TxHistoryModel.getInstance().findByAddress(address.toLowerCase());
    const txs = transactions.filter(filterTransactions);
    await dispatch(txHistoryActions.setTransactions(txs));

    const lastTransaction = transactions[0];
    const lastBlock = lastTransaction && lastTransaction.blockHash;

    // TODO: Need to get lastBlock from wallet db and pass it here
    await TxHistoryService.getInstance().syncByWallet(address, force);
    transactions = await TxHistoryModel.getInstance().findByAddress(address.toLowerCase());
    await dispatch(txHistoryActions.setTransactions(transactions.filter(filterTransactions)));

    await dispatch(duck.actions.setLoding(false));
  },
  /**0x580177142Ec093380A45f821351328C24d8D6FDC
   * Create txHistory
   */
  createTransactionOperation: (transaction) => async (dispatch, getState) => {
    const newTransaction = {
      hash: transaction.hash,
      networkId: getConfigs().chainId,
      tokenSymbol: transaction.tokenSymbol,
      from: transaction.from,
      to: transaction.address,
      gasPrice: transaction.gasPrice,
      gasLImit: transaction.gasLimit,
      tokenDecimal: transaction.tokenDecimal,
      value: parseFloat(transaction.amount),
      nonce: transaction.nonce,
      contractAddress: transaction.contractAddress,
      // TODO: Figure out how to handle it
      txReceiptStatus: 0,
      isError: false,
      timeStamp: Date.now(),
      status: transaction.status
      // confirmations: 1,
      // blockNumber: ''
      // timeStamp: Date.now(),
      // transactionIndex: 0,
    };

    await TxHistoryModel.getInstance().create(newTransaction);
    const createdTx = await TxHistoryModel.getInstance().findById(newTransaction.hash);

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
