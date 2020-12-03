import { createSlice } from '@reduxjs/toolkit';
import WalletConnect from '@walletconnect/client';
import { Web3Service } from 'blockchain/services/web3-service';
import EthUtils from 'blockchain/util/eth-utils';
import { getConfigs } from 'configs';
import modules from 'core/modules';
import { getTransactionCount } from 'core/modules/transaction/operations';
import { Storage } from 'core/Storage';

const initialState = {
	isLoading: true,
	// connector: {
	//   approveSession: (params) => console.log('Approve session', params),
	//   rejectSession: (params) => console.log('Reject session', params),
	// },
	// confirmConnection: null,
	// confirmConnection: {
	// 	peerId: '317661c8-2e1d-4cde-8449-55ffe02ee616',
	// 	peerMeta: {
	// 		description: 'Data Driven AI Enabled DeFi Aggregator Powered By The KEYFI Token',
	// 		url: 'http://localhost:3000',
	// 		icons: ['http://localhost:3000/favicon.ico', 'http://localhost:3000/logo192.png'],
	// 		name: 'KeyFi - AI Powered DeFi Dashboard',
	// 	},
	// 	chainId: 1,
	// },
	// {
	//   url: 'keyfi.com'
	// },
	pendingUri: null,
  unlocked: false,
  // confirmTransaction: {
  //   // status: 'pending',
  //   // hash: 'hash',
  //   peerMeta: {
	// 		description: 'Data Driven AI Enabled DeFi Aggregator Powered By The KEYFI Token',
	// 		url: 'http://localhost:3000',
	// 		icons: ['http://localhost:3000/favicon.ico', 'http://localhost:3000/logo192.png'],
	// 		name: 'KeyFi - AI Powered DeFi Dashboard',
	// 	},
  //   from: '0x3d1461c8a2c4a5a31f48963cfca29dd6d23481a1',
  //   to: '0xc586bef4a0992c495cf22e1aeee4e446cecdee0e',
  //   gasPrice: '0x684ee1800',
  //   gas: '0x55730',
  //   value: '0xde0b6b3a7640000',
  //   data:
  //     '0xe2a7515e000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000d99a8cec7e2000000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  // }
	// confirmTransaction: {
	//   amount: '0.09',
	//   address: '0x10239120398120938098',
	//   fee: '0',
	//   data: 'some data',
	// },
};

const walletConnect = createSlice({
	name: 'walletConnect',
	initialState,
	reducers: {
		setLoading(state, action) {
			state.isLoading = action.payload;
		},
		setConnector(state, action) {
			state.connector = action.payload;
		},
		setConfirmConnection(state, action) {
			state.confirmConnection = action.payload;
		},
		setConfirmTransaction(state, action) {
			state.confirmTransaction = action.payload;
		},
		setPendingUri(state, action) {
			state.pendingUri = action.payload;
		},
		setUnlocked(state, action) {
			state.unlocked = action.payload;
		},
	},
});

export const walletConnectActions = walletConnect.actions;

const getRoot = state => state.walletConnect;

export const walletConnectSelectors = {
	getLoading: state => getRoot(state).isLoading,
	getConnector: state => getRoot(state).connector,
	getConfirmConnection: state => getRoot(state).confirmConnection,
	getConfirmTransaction: state => getRoot(state).confirmTransaction,
	getPendingUri: state => getRoot(state).pendingUri,
	getUnlocked: state => getRoot(state).unlocked,
};

export const walletConnectOperations = {
	confirmConnection: () => async (dispatch, getState) => {
		const connector = walletConnectSelectors.getConnector(getState());
		const confirmConnection = walletConnectSelectors.getConfirmConnection(getState());
		const address = modules.wallet.selectors.getAddress(getState());

		if (connector) {
			connector.approveSession({
				accounts: [address],
				chainId: confirmConnection.chainId,
			});

			// debugger;

			await Storage.updateItem(Storage.Key.WalletConnectSession, items => ({
				...items,
				[connector.uri]: connector.session,
			}));
			// await Storage.updateItem(Storage.Key.WalletConnectSession, (items) => ({
			//   ...items,
			//   [connector.uri]: confirmConnection,
			// }));
		}

		dispatch(walletConnectActions.setConfirmConnection(null));
  },
  
	rejectConnection: () => async (dispatch, getState) => {
		const connector = walletConnectSelectors.getConnector(getState());

		if (connector) {
			connector.rejectSession({
				// message: 'OPTIONAL_ERROR_MESSAGE'
			});
		}

		dispatch(walletConnectActions.setConfirmConnection(null));
	},
	confirmTransaction: () => async (dispatch, getState) => {
    const transaction = walletConnectSelectors.getConfirmTransaction(getState());
    const nonce = await getTransactionCount(transaction.from);

    const txEvent = Web3Service.getInstance().web3.eth.sendTransaction({
      from: EthUtils.sanitizeHex(transaction.from),
      nonce,
      to: EthUtils.sanitizeHex(transaction.to),
      gasPrice: transaction.gasPrice,
      gas: transaction.gas,
      value: transaction.value,
      data: EthUtils.sanitizeHex(transaction.data),
    });

    // dispatch(walletConnectActions.setConfirmTransaction({
    //   ...transaction,
    //   status: 'pending',
    //   hash: 'hash'
    // }));

    txEvent.on('transactionHash', async hash => {
      const tx = walletConnectSelectors.getConfirmTransaction(getState());
      dispatch(walletConnectActions.setConfirmTransaction({
        ...tx,
        status: 'pending',
        hash,
      }))
      
			// await dispatch(
			// 	duck.actions.updateTransaction({
			// 		status: 'pending',
			// 		transactionHash: hash,
			// 		isSending: false,
			// 	}),
			// );
      // await dispatch(transactionOperations.createTxHistoryOperation());
	  	// dispatch(walletConnectActions.setConfirmTransaction(null));
		});

		txEvent.on('receipt', async receipt => {
      const tx = walletConnectSelectors.getConfirmTransaction(getState());
      
      dispatch(walletConnectActions.setConfirmTransaction({
        ...tx,
        status: 'success',
      }));

			await dispatch(
				modules.txHistory.operations.updateTransactionOperation(transaction.hash, {
					hash: receipt.transactionHash,
					status: 'sent',
					timeStamp: Date.now(),
					networkId: getConfigs().chainId,
					tokenSymbol: 'eth',
					nonce: nonce,
					isError: false,
					blockHash: receipt.blockHash,
					blockNumber: receipt.blockNumber,
					contractAddress: null,
					from: receipt.from.toLowerCase(),
					to: receipt.to.toLowerCase(),
					transactionIndex: receipt.transactionIndex,
					value: parseFloat(transaction.value),
				}),
			);

      await dispatch(modules.wallet.operations.refreshBalanceOperation(true));
		});

		txEvent.on('error', async error => {
      const tx = walletConnectSelectors.getConfirmTransaction(getState());
      dispatch(walletConnectActions.setConfirmTransaction({
        ...tx,
        status: 'error',
        message: error.toString().toLowerCase(),
      }));
		});
	},
	rejectTransaction: () => async (dispatch, getState) => {
		dispatch(walletConnectActions.setConfirmTransaction(null));
	},
	handleUri: uri => async (dispatch, getState) => {
		const unlocked = walletConnectSelectors.getUnlocked(getState());
		dispatch(walletConnectActions.setPendingUri(uri));

		if (unlocked) {
			dispatch(walletConnectOperations.init());
		}
	},
	handleSession: (uri, session) => async (dispatch, getState) => {
		const connector = new WalletConnect({
      uri,
      session
    });

		connector.uri = uri;

    console.log('handleSession', uri);

		connector.on('session_request', (error, payload) => {
			console.log('session_request', payload);
      
			dispatch(walletConnectActions.setConnector(connector));
			dispatch(walletConnectActions.setConfirmConnection(payload.params[0]));
		});

		connector.on('call_request', (error, payload) => {
      console.log('call_request', payload);
      
			// if (error) {
			//   throw error;
			// }
      dispatch(walletConnectActions.setConnector(connector));
			dispatch(walletConnectActions.setConfirmTransaction(payload.params[0]));
      

			// debugger;
		});

		connector.on('disconnect', (error, payload) => {
      console.log('disconnect', payload);

		});

		await connector.createSession();
	},
	init: () => async (dispatch, getState) => {
		const pendingUri = walletConnectSelectors.getPendingUri(getState());
		const sessions = await Storage.getItem(Storage.Key.WalletConnectSession, {});

		if (pendingUri && !sessions[pendingUri]) {
			dispatch(walletConnectOperations.handleSession(pendingUri));
		}

		Object.keys(sessions).forEach(key => {
			dispatch(walletConnectOperations.handleSession(null, sessions[key]));
		});
	},
};

export const walletConnectReducer = walletConnect.reducer;

export default {
	reducer: walletConnectReducer,
	actions: walletConnectActions,
	operations: walletConnectOperations,
	selectors: walletConnectSelectors,
};

// const signRequestMock = {
// 	from: '0x3d1461c8a2c4a5a31f48963cfca29dd6d23481a1',
// 	to: '0xc586bef4a0992c495cf22e1aeee4e446cecdee0e',
// 	gasPrice: '0x684ee1800',
// 	gas: '0x55730',
// 	value: '0xde0b6b3a7640000',
// 	data:
// 		'0xe2a7515e000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000d99a8cec7e2000000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
// };

// connector.approveRequest({
//   id: 1,
//   result: "0x41791102999c339c844880b23950704cc43aa840f3739e365323cda4dfa89e7a"
// });

// Reject Call Request
// connector.rejectRequest({
//   id: 1,                                  // required
//   error: {
//     code: "OPTIONAL_ERROR_CODE"           // optional
//     message: "OPTIONAL_ERROR_MESSAGE"     // optional
//   }
// });
