import { createSlice } from '@reduxjs/toolkit';
import WalletConnect from '@walletconnect/client';
import EthGasStationService from 'blockchain/services/eth-gas-station-service';
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
	sessions: [],
	// confirmSignRequest: {
	// 	data:
	// 		'0x37652f325437344958724c7033553639304446756354564f672f775378724237627152664b6c485377534c4f3863643446665249414e334c754c46502b5054366369614d4a782f32494e4c6641794e6a7268504a2b773d3d',
	// 	address: '',
	// 	id: 1,
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
		setSessions(state, action) {
			state.sessions = action.payload;
		},
		setConfirmSignRequest(state, action) {
			state.confirmSignRequest = action.payload;
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
	getConfirmSignRequest: state => getRoot(state).confirmSignRequest,
	getPendingUri: state => getRoot(state).pendingUri,
	getUnlocked: state => getRoot(state).unlocked,
	getSessions: state => getRoot(state).sessions,
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

			await Storage.updateItem(Storage.Key.WalletConnectSession, items => [
				...items,
				connector.session,
			]);

			try {
				await dispatch(walletConnectOperations.loadSessions());
			} catch (err) {}
		}

		dispatch(
			modules.app.operations.setSnackMessage('Wallet connect session created. Go back to the dapp'),
		);
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
			const confirmTransaction = walletConnectSelectors.getConfirmTransaction(getState());
			const connector = walletConnectSelectors.getConnector(getState());

			// Approve Call Request
			connector.approveRequest({
				id: confirmTransaction.id,
				result: receipt.transactionHash,
			});

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

			const connector = walletConnectSelectors.getConnector(getState());

			connector.rejectRequest({
				id: tx.id,
				error: {
					message: error.toString().toLowerCase(),
				},
			});
		});
	},
	confirmSignRequest: () => async (dispatch, getState) => {
		const signRequest = walletConnectSelectors.getConfirmSignRequest(getState());
		const result = await Web3Service.getInstance().web3.eth.sign(
			signRequest.message,
			signRequest.address,
		);
		const connector = walletConnectSelectors.getConnector(getState());

		connector.approveRequest({
			id: signRequest.id,
			result,
		});

		dispatch(walletConnectActions.setConfirmSignRequest(null));
	},
	rejectSignRequest: () => async (dispatch, getState) => {
		const signRequest = walletConnectSelectors.getConfirmSignRequest(getState());
		const connector = walletConnectSelectors.getConnector(getState());

		connector.rejectRequest({
			id: signRequest.id,
			error: {
				message: 'Rejected',
			},
		});

		dispatch(walletConnectActions.setConfirmSignRequest(null));
	},
	rejectTransaction: () => async (dispatch, getState) => {
		dispatch(walletConnectActions.setConfirmTransaction(null));
	},
	handleUri: uri => async (dispatch, getState) => {
		const unlocked = walletConnectSelectors.getUnlocked(getState());

		if (unlocked) {
			dispatch(walletConnectOperations.handleSession(uri));
		} else {
			dispatch(walletConnectActions.setPendingUri(uri));
			// dispatch(walletConnectOperations.init());
		}
	},
	handleSession: (uri, session) => async (dispatch, getState) => {
		const connector = new WalletConnect({
			uri,
			session,
		});

		connector.uri = uri;

		connector.on('session_request', (error, payload) => {
			console.log('session_request', payload);

			dispatch(walletConnectActions.setConnector(connector));
			dispatch(walletConnectActions.setConfirmConnection(payload.params[0]));
		});

		connector.on('call_request', (error, payload) => {
			console.log('call_request', payload);
			dispatch(walletConnectActions.setConnector(connector));

			if (payload.method === 'eth_sign' || payload.method === 'personal_sign') {
				dispatch(
					walletConnectActions.setConfirmSignRequest({
						id: payload.id,
						message: payload.params[0],
						address: payload.params[1],
					}),
				);
			} else {
				const gasPrice = await EthGasStationService.getInstance().getPrice();

				dispatch(
					walletConnectActions.setConfirmTransaction({
						id: payload.id,
						...payload.params[0],
						gasPrice,
					}),
				);
			}
		});

		connector.on('disconnect', (error, payload) => {
			console.log('disconnect', payload);
		});

		try {
			await connector.createSession();
		} catch (err) {
			if (uri) {
				dispatch(modules.app.operations.setSnackMessage('Wallet connect session created.'));
			}
		}
	},
	loadSessions: () => async (dispatch, getState) => {
		let sessions = await Storage.getItem(Storage.Key.WalletConnectSession, []);

		sessions = sessions.filter(item => !!item);

		if (!Array.isArray(sessions)) {
			await Storage.setItem(Storage.Key.WalletConnectSession, []);
		}

		dispatch(walletConnectActions.setSessions(sessions));
	},
	init: () => async (dispatch, getState) => {
		const pendingUri = walletConnectSelectors.getPendingUri(getState());

		await dispatch(walletConnectOperations.loadSessions());
		const sessions = walletConnectSelectors.getSessions(getState());

		if (pendingUri && !sessions[pendingUri]) {
			dispatch(walletConnectOperations.handleSession(pendingUri));
		}

		Object.keys(sessions).forEach(key => {
			dispatch(walletConnectOperations.handleSession(null, sessions[key]));
		});
	},
	disconnectSession: session => async (dispatch, getState) => {
		const sessions = await Storage.getItem(Storage.Key.WalletConnectSession, []);
		const filtered = sessions.filter(item => item.key !== session.key);

		const connector = new WalletConnect({
			session,
		});

		connector.killSession();

		await Storage.setItem(Storage.Key.WalletConnectSession, filtered);

		dispatch(walletConnectOperations.loadSessions());
	},
};

export const walletConnectReducer = walletConnect.reducer;

export default {
	reducer: walletConnectReducer,
	actions: walletConnectActions,
	operations: walletConnectOperations,
	selectors: walletConnectSelectors,
};
