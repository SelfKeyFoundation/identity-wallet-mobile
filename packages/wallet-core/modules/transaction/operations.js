import { navigate, Routes } from '@selfkey/wallet-core/navigation';
import { getTokenPrice } from '@selfkey/blockchain/services/price-service';
import { Web3Service } from '@selfkey/blockchain/services/web3-service';
import EthUnits from '@selfkey/blockchain/util/eth-units';
import EthUtils from '@selfkey/blockchain/util/eth-utils';
import BN from 'bignumber.js';
import transactionActions from './actions';
import duck from './index';
import ducks from '../index';

const web3Service = Web3Service.getInstance();

// TODO: Move to separate file
const getTransactionCount = async address => {
	const params = {
		method: 'getTransactionCount',
		args: [address, 'pending']
	};

	return web3Service.waitForTicket(params);
};

// TODO: Use configs
const chainId = 3;

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
  const tokenContract = web3Service.web3.eth.Contract(
    web3Service.contractABI,
    contractAddress
  );
  const MAX_GAS = 4500000;
  const amountInWei = web3Service.web3.utils.toWei(amount);
  const estimate = await tokenContract.methods
    .transfer(address, amountInWei)
    .estimateGas({ from });

  return Math.round(Math.min(estimate * 1.1, MAX_GAS));
}

const computeGasLimit = () => async (dispatch, getState) => {
  const state = getState();
  const transaction = duck.selectors.getTransaction(state);

  // TODO: Use constants
  if (transaction.cryptoCurrency.toUpperCase() === 'ETH') {
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
    const feeInEth = web3Service.web3.utils.fromWei(
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
  goToTransactionOperation: (tokenSymbol) => async (dispatch, getState) => {
    await dispatch(ducks.ethGasStation.operations.loadDataOperation());

    const state = getState();
    // await dispatch(duck.actions.setToken(tokenSymbol));

    navigate(Routes.APP_SEND_TOKENS, {
      tokenSymbol
    });

    const address = ducks.wallet.selectors.getAddress(state);
    const nounce = await getTransactionCount(address);
    const tokenDetails = ducks.wallet.selectors.getTokenDetails(tokenSymbol)(state);

    await dispatch(duck.actions.updateTransaction({
      nounce,
      balance: tokenDetails.amount,
      tokenDecimal: tokenDetails.decimal,
      tokenSymbol: tokenSymbol,
      transactionFeeOptions: getTransactionFeeOptions(state),
      status: 'in_progress',
      errorMessage: 'You don\'t have enough Ethereum (ETH) to pay for the network transaction fee. Please transfer some ETH to your following wallet and try again.',
      errorInfo: 'To learn more about transaction fees, click here.',
      errorInfoUrl: 'https://help.selfkey.org/article/87-how-does-gas-impact-transaction-speed',
    }));
  },

  createTxHistoryOperation: () => async (dispatch, getState) => {
    const state = getState();
    const transaction = duck.selectors.getTransaction(state);
    await dispatch(ducks.txHistory.operations.createTransactionOperation({
      ...transaction,
      status: 'sending'
    }));
  },

  sendTransaction: () => async (dispatch, getState) => {
    const state = getState();
    const transaction = duck.selectors.getTransaction(state);

    const transactionObject = {
      nonce: await getTransactionCount(transaction.from),
      gasPrice: EthUnits.unitToUnit(transaction.gasPrice, 'gwei', 'wei'),
      gas: transaction.gasLimit,
    };
  
    // TODO: Use constants to define ETH
    if (transaction.cryptoCurrency.toUpperCase() === 'ETH') {
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
  
    const transactionEventEmitter = web3Service.web3.eth.sendTransaction(transactionObject);

    transactionEventEmitter.on('transactionHash', async hash => {
      await dispatch(
        duck.actions.updateTransaction({
          status: 'pending',
          transactionHash: hash
        })
      );
      await dispatch(transactionOperations.createTxHistoryOperation());
    });
  
    transactionEventEmitter.on('receipt', async receipt => {
      await dispatch(
        duck.actions.updateTransaction({
          status: 'sent',
        })
      );

      const transaction = duck.selectors.getTransaction(getState());
 
      // TODO: update txHistory
      await dispatch(ducks.txHistory.operations.updateTransactionOperation(transaction.hash, {
        status: 'sent'
      }));      
      //
      await dispatch(ducks.wallet.operations.refreshWalletOperation());
    });
  
    transactionEventEmitter.on('error', async error => {
      const message = error.toString().toLowerCase();

      if (message.indexOf('insufficient funds') !== -1 || message.indexOf('underpriced') !== -1) {
        await dispatch(duck.operations.updateTransaction({
          errorMessage: 'You don\'t have enough Ethereum (ETH) to pay for the network transaction fee. Please transfer some ETH to your following wallet and try again.',
          errorInfo: 'To learn more about transaction fees, click here.',
          errorInfoUrl: 'https://help.selfkey.org/article/87-how-does-gas-impact-transaction-speed',
          status: 'error'
        }));
      }
    });
  },
  setAddress: (address) => async (dispatch, getState) => {
    await dispatch(transactionActions.setAddress(address));

    try {
      const web3Utils = web3Service.web3.utils;
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
