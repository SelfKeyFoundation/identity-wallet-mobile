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
	pendingUri: null,
	unlocked: false,
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

			await Storage.updateItem(Storage.Key.WalletConnectSession, items => ({
				...items,
				[connector.uri]: connector.session,
			}));
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

		txEvent.on('transactionHash', async hash => {
			const tx = walletConnectSelectors.getConfirmTransaction(getState());
			dispatch(
				walletConnectActions.setConfirmTransaction({
					...tx,
					status: 'pending',
					hash,
				}),
			);
		});

		txEvent.on('receipt', async receipt => {
			const tx = walletConnectSelectors.getConfirmTransaction(getState());

			dispatch(
				walletConnectActions.setConfirmTransaction({
					...tx,
					status: 'success',
				}),
			);

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
			dispatch(
				walletConnectActions.setConfirmTransaction({
					...tx,
					status: 'error',
					message: error.toString().toLowerCase(),
				}),
			);
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
			session,
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
