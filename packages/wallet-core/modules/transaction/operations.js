import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import { getTokenPrice } from '@selfkey/blockchain/services/price-service';
import { Web3Service } from '@selfkey/blockchain/services/web3-service';
import EthUnits from '@selfkey/blockchain/util/eth-units';
import EthUtils from '@selfkey/blockchain/util/eth-utils';
import BN from 'bignumber.js';
import transactionActions from './actions';
import duck from './index';
import ducks from '../index';
import { getConfigs } from '@selfkey/configs';

// TODO: Move to separate file
const getTransactionCount = async address => {
	const params = {
		method: 'getTransactionCount',
		args: [address, 'pending']
	};

	return Web3Service.getInstance().waitForTicket(params);
};

const transferHex = '0xa9059cbb';

const generateContractData = (toAddress, value, decimal) => {
	value = EthUtils.padLeft(
		new BN(value).times(new BN(10).pow(decimal)).toString(16),
		64
	);
	toAddress = EthUtils.padLeft(EthUtils.getNakedAddress(toAddress), 64);
	return transferHex + toAddress + value;
};

function getFee(gasPrice, gasLimit) {
  return new BN(getPrice)
    .dividedBy(1000000000)
    .multipliedBy(gasLimit || 0)
    .toString();
}

// TODO: Compute gas for custom tokens
export async function getGasLimit({ contractAddress, address, amount, from }) {
  const tokenContract = Web3Service.getInstance().web3.eth.Contract(
    Web3Service.getInstance().contractABI,
    contractAddress
  );
  const MAX_GAS = 4500000;
  const amountInWei = Web3Service.getInstance().web3.utils.toWei(amount);
  const estimate = await tokenContract.methods
    .transfer(address, amountInWei)
    .estimateGas({ from });

  return Math.round(Math.min(estimate * 1.1, MAX_GAS));
}

const computeGasLimit = () => async (dispatch, getState) => {
  const state = getState();
  const transaction = duck.selectors.getTransaction(state);
  const token = transaction.token || transaction.cryptoCurrency;

  // TODO: Use constants
  if (token && token.toUpperCase() === 'ETH') {
    return;
  }

  if (!transaction.address || !transaction.amount) {
    return;
  }

  try {
    const gasLimit = await getGasLimit(transaction);
    console.log('gas limit computed', gasLimit);
    await dispatch(duck.operations.updateTransaction({
      gasLimit
    }));
  } catch(err) {
    console.error(err);
  }
};

const getTransactionFeeOptions = (state) => {
  const gasStationInfo = ducks.ethGasStation.selectors.getEthGasStationInfo(state);
  const gasLimit = ducks.transaction.selectors.getGasLimit(state);
    
  return [{
    id: 'slow',
    name: 'Slow',
    gasPrice: gasStationInfo.safeLow,
    time: '5-30 min',
  }, {
    id: 'normal',
    name: 'Normal',
    gasPrice: gasStationInfo.average,
    time: '2-5 min',
  }, {
    id: 'fast',
    name: 'Fast',
    gasPrice: gasStationInfo.fast,
    time: '< 2 min',
  }].map((option) => {
    const gasPriceInWei = EthUnits.unitToUnit(option.gasPrice, 'gwei', 'wei');
    const feeInWei = String(Math.round(gasPriceInWei * gasLimit));
    const feeInEth = Web3Service.getInstance().web3.utils.fromWei(
      feeInWei,
      'ether'
    );

    const tokenPrice = getTokenPrice('ETH');

    return {
      ...option,
      ethAmount: feeInEth,
      fiatAmount: feeInEth * tokenPrice.priceUSD,
    }
  });
}

export const operations = {
  /**
   * Go to transaction operation
   * 
   * initialize the transaction with the initial state
   */
  goToTransactionOperation: (tokenSymbol, addressTo) => async (dispatch, getState) => {
    const state = getState();
    const address = ducks.wallet.selectors.getAddress(state);
    
    await dispatch(duck.actions.updateTransaction({
      ...duck.initialState,
      address: addressTo,
    }));

    // for testing
    // tokenSymbol = 'all'

    /*
     * all: eth, key and custom tokens
     * custom: custom erc20 tokens
     */
    
    if (tokenSymbol === 'all' || tokenSymbol === 'custom'){
      const tokenOptions = tokenSymbol === 'custom' ? ducks.wallet.selectors.getTokens(state) : [
        {
          symbol: 'ETH',
          name: 'Ethereum',
        },
        ...ducks.wallet.selectors.getTokens(state),
      ];

      await dispatch(duck.actions.updateTransaction({
        ...duck.initialState,
        address: addressTo,
        token: undefined,
        tokenOptions: tokenOptions,
      }));
    } else {
      await dispatch(operations.setSelectedTokenOperation(tokenSymbol))
    }

    await dispatch(ducks.app.operations.showSendTokensModal(true));

    const nounce = await getTransactionCount(address);
    await dispatch(ducks.ethGasStation.operations.loadDataOperation());

    await dispatch(duck.actions.updateTransaction({
      nounce,
      transactionFeeOptions: getTransactionFeeOptions(getState()),
    }));
  },

  setSelectedTokenOperation: (tokenSymbol) => async (dispatch, getState) => {
    const state = getState();
    const tokenDetails = ducks.wallet.selectors.getTokenDetails(tokenSymbol)(state);
    await dispatch(duck.actions.updateTransaction({
      token: tokenSymbol,
      balance: tokenDetails && tokenDetails.amount,
      tokenDecimal: tokenDetails && tokenDetails.decimal,
    }));
  },

  /**
   * Create tx History
   */
  createTxHistoryOperation: () => async (dispatch, getState) => {
    const state = getState();
    const transaction = duck.selectors.getTransaction(state);
    await dispatch(ducks.txHistory.operations.createTransactionOperation({
      ...transaction,
      status: 'sending'
    }));
  },

  /**
   * Send transaction
   * 
   * TODO: Clean the transaction when its finished
   */
  sendTransaction: () => async (dispatch, getState) => {
    const state = getState();
    const { isSending } = duck.selectors.getRoot(state);

    if (isSending) {
      return;
    }

    await dispatch(duck.actions.updateTransaction({
      isSending: true,
    }));

    const transaction = duck.selectors.getTransaction(state);

    const transactionObject = {
      nonce: await getTransactionCount(transaction.from),
      gasPrice: EthUnits.unitToUnit(transaction.gasPrice, 'gwei', 'wei'),
      gas: transaction.gasLimit,
    };
  
    // TODO: Use constants to define ETH
    if (transaction.cryptoCurrency && transaction.cryptoCurrency.toUpperCase() === 'ETH') {
      transactionObject.to = EthUtils.sanitizeHex(transaction.address);
      transactionObject.value = EthUnits.unitToUnit(transaction.amount, 'ether', 'wei');
    } else {
      transactionObject.to = EthUtils.sanitizeHex(transaction.contractAddress);
      transactionObject.value = 0;
      const data = generateContractData(
        transaction.address,
        parseFloat(transaction.amount),
        transaction.tokenDecimal
      );
      transactionObject.data = EthUtils.sanitizeHex(data);
    }

    await dispatch(duck.actions.updateTransaction({
      nonce: transactionObject.nonce,
    }));
  
    const transactionEventEmitter = Web3Service.getInstance().web3.eth.sendTransaction(transactionObject);

    transactionEventEmitter.on('transactionHash', async hash => {
      await dispatch(
        duck.actions.updateTransaction({
          status: 'pending',
          transactionHash: hash,
          isSending: false,
        })
      );
      await dispatch(transactionOperations.createTxHistoryOperation());
    });
  
    transactionEventEmitter.on('receipt', async (receipt) => {
      await dispatch(
        duck.actions.updateTransaction({
          status: 'sent',
          isSending: false,
        })
      );

      const transaction = duck.selectors.getTransaction(getState());
 
      await dispatch(ducks.txHistory.operations.updateTransactionOperation(transaction.hash, {
        hash: receipt.transactionHash,
        status: 'sent',
        timeStamp: Date.now(),
        networkId: getConfigs().chainId,
        tokenSymbol: transaction.tokenSymbol,
        nonce: transaction.nonce,
        isError: false,
        blockHash: receipt.blockHash,
        blockNumber: receipt.blockNumber,
        contractAddress: transaction.contractAddress,
        from: receipt.from.toLowerCase(),
        to: receipt.to.toLowerCase(),
        transactionIndex: receipt.transactionIndex,
        value: parseFloat(transaction.amount),
      }));

      await dispatch(ducks.wallet.operations.refreshBalanceOperation(true));
    });
  
    transactionEventEmitter.on('error', async error => {
      const message = error.toString().toLowerCase();

      if (message.indexOf('insufficient funds') !== -1 || message.indexOf('underpriced') !== -1) {
        await dispatch(duck.operations.updateTransaction({
          isSending: false,
          errorMessage: 'You don\'t have enough Ethereum (ETH) to pay for the network transaction fee. Please transfer some ETH to your following wallet and try again.',
          errorInfo: 'To learn more about transaction fees, click here.',
          errorInfoUrl: 'https://help.selfkey.org/article/87-how-does-gas-impact-transaction-speed',
          status: 'error'
        }));
      }
    });
  },

  /**
   * Set address
   * 
   * Will also validate the address
   */
  setAddress: (address) => async (dispatch, getState) => {
    await dispatch(transactionActions.setAddress(address));

    try {
      const web3Utils = Web3Service.getInstance().web3.utils;
      const toChecksumAddress = web3Utils.toChecksumAddress(address);

      if (web3Utils.isHex(address) || web3Utils.isAddress(toChecksumAddress)) {
        await dispatch(transactionActions.setErrors({
          address: undefined,
        }));
        await dispatch(computeGasLimit());
        return;
      }
    } catch(err) {}

    await dispatch(transactionActions.setErrors({
      address: 'Invalid address. Please check and try again',
    })); 
  },

  /**
   * Set amount
   * The limit for amount is handled in the reducer
   * 
   */
  setAmount: (amount) => async (dispatch, getState) => {
    await dispatch(transactionActions.setAmount(amount));
    await dispatch(computeGasLimit());
  }
};

export const transactionOperations = {
  ...transactionActions,
  ...operations,
};

export default transactionOperations;
