import ContractAllowanceService from 'core/services/contract-allowance-service';
import { ContractService } from 'core/services/contract-service';
import modules from '..';
import contractActions from './actions';
import * as contractSelectors from './selectors';
import { getTransactionCount } from '../transaction/operations';
import { navigate, Routes } from 'core/navigation';
import { Logger } from 'core/utils/logger';

const log = new Logger('transaction-duck');

const operations = {
  ...contractActions,
	loadContractsOperation: () => async (dispatch, getState) => {
    const contractService = ContractService.getInstance();
		const contracts = await contractService.loadContracts();
		await dispatch(contractActions.setContractsAction(contracts));
	},
	loadAllowancesOperation: () => async (dispatch, getState) => {
    const contractAllowanceService = ContractAllowanceService.getInstance();
		const wallet = modules.wallet.selectors.getWallet(getState());
		const allowances = await contractAllowanceService.loadContractAllowances(wallet.id);
		await dispatch(contractActions.setAllowancesAction(allowances));
	},
	reloadAllowanceOperation: id => async (dispatch, getState) => {
    const contractAllowanceService = ContractAllowanceService.getInstance();
		const allowance = await contractAllowanceService.loadContractAllowanceById(id);
		await dispatch(contractActions.setOneAllowanceAction(allowance));
		return allowance;
	},
	fetchAllowanceOperation: (tokenAddress, contractAddress, tokenDecimals = 18) => async (
		dispatch,
		getState
	) => {
    const contractAllowanceService = ContractAllowanceService.getInstance();
		let allowance = contractSelectors.selectAllowanceByTokenAndContractAddress(
			getState(),
			tokenAddress,
			contractAddress
		);

		if (!allowance) {
			const wallet = modules.wallet.selectors.getWallet(getState());
			allowance = await contractAllowanceService.createContractAllowance(
				wallet.id,
				contractAddress,
				tokenAddress,
				tokenDecimals
			);
		}
		return dispatch(operations.reloadAllowanceOperation(allowance.id));
	},
	updateAllowanceEditorOperation: update => async (dispatch, getState) => {
		try {
      const contractAllowanceService = ContractAllowanceService.getInstance();
			const beforeUpdate = contractSelectors.selectAllowanceEditor(getState());
			const wallet = modules.wallet.selectors.getWallet(getState());

			if (
				update &&
				update.tokenAddress &&
				update.tokenAddress !== beforeUpdate.tokenAddress
			) {
				const token = modules.wallet.selectors.getTokenByAddress(getState(), update.tokenAddress);
				if (token) {
					update.tokenDecimals = token.decimal;
					update.tokenSymbol = token.symbol;
				}
			}

			if (
				update &&
				update.contractAddress &&
				update.contractAddress !== beforeUpdate.contractAddress
			) {
				if (!update.contractName) {
					const contract = contractSelectors.selectContractByAddress(
						getState(),
						update.contractAddress
					);
					if (contract && contract.name) {
						update.contractName = contract.name;
					}
				}
			}

			if (!beforeUpdate.nonce && update) {
				update.nonce = await getTransactionCount(wallet.address);
			}

			if (update) {
				await dispatch(contractActions.updateEditorAction(update));
			}

			const afterUpdate = contractSelectors.selectAllowanceEditor(getState());

			if (
				!afterUpdate.contractAddress ||
				!afterUpdate.tokenAddress ||
				(!afterUpdate.loading &&
					(beforeUpdate.contractAddress === afterUpdate.contractAddress &&
						beforeUpdate.tokenAddress === afterUpdate.tokenAddress))
			) {
				return;
			}

			if (afterUpdate.errors.contractError || afterUpdate.errors.amountError) {
				return;
			}

			const allowance = await dispatch(
				operations.fetchAllowanceOperation(
					afterUpdate.tokenAddress,
					afterUpdate.contractAddress,
					afterUpdate.tokenDecimals
				)
			);

			let gas = await contractAllowanceService.updateContractAllowanceAmount(
				afterUpdate.tokenAddress,
				afterUpdate.contractAddress,
				afterUpdate.amount || 0,
				afterUpdate.tokenDecimals,
				{ estimateGas: true, from: wallet.address }
			);

			gas = Math.ceil(gas * 1.5);

			let gasPrice = afterUpdate.gasPrice;
			if (!gasPrice) {
        gasPrice = modules.ethGasStation.selectors.getEthGasStationInfo(getState()).average;
			}

			await dispatch(
				contractActions.updateEditorAction({
					currentAmount: allowance.allowanceAmount,
					gasPrice,
					gas,
					loading: false
				})
			);
		} catch (error) {
			log.error(error);
			throw error;
		}
	},
	startAllowanceEditorOperation: options => async (dispatch, getState) => {
		let {
			symbol,
			tokenAddress,
			cancelPath,
			nextPath,
			fixed,
			requestedAmount,
			contractAddress
		} = options;

		const editor = {
			cancelPath,
			nextPath,
			fixed,
			requestedAmount,
			contractAddress,
			loading: true
		};

		let token;

		if (symbol) {
			token = modules.wallet.selectors.getTokenBySymbol(getState(), symbol);
		}

		if (tokenAddress && !token) {
			token = modules.wallet.selectors.getTokenByAddress(getState(), tokenAddress);
		}

		if (token) {
			editor.tokenDecimals = token.decimal;
			editor.tokenSymbol = token.symbol;
			editor.tokenAddress = token.address;
		}

		if (contractAddress) {
			const contract = contractSelectors.selectContractByAddress(getState(), contractAddress);
			if (contract) {
				editor.contractName = contract.name;
			}
		}

		await dispatch(contractActions.setEditorAction(editor));

    navigate(Routes.ALLOWANCE_EDITOR);

		await dispatch(contractOperations.updateAllowanceEditorOperation());
	},
	submitAllowanceEditorOperation: options => async (dispatch, getState) => {
		// start allowance transaction operation
		let editor = contractSelectors.selectAllowanceEditor(getState());
		const wallet = modules.wallet.selectors.getWallet(getState());
		const transactionEventEmitter = ContractAllowanceService.getInstance().updateContractAllowanceAmount(
			editor.tokenAddress,
			editor.contractAddress,
			editor.amount || 0,
			editor.tokenDecimals,
			{
				from: wallet.address,
				gas: editor.gas,
				gasPrice: EthUnits.unitToUnit(editor.gasPrice, 'gwei', 'wei')
			}
		);


		transactionEventEmitter.on('transactionHash', async hash => {
			await dispatch(navigate(Routes.ALLOWANCE_TRANSACTION_PROCESSING));
		});

		transactionEventEmitter.on('receipt', async receipt => {
			editor = contractSelectors.selectAllowanceEditor(getState());
			if (editor.nextPath) {
				await dispatch(navigate(editor.nextPath));
			}
		});

		transactionEventEmitter.on('error', async error => {
			clearTimeout(hardwalletConfirmationTimeout);
			log.error('transactionEventEmitter ERROR: %j', error);
      const message = error.toString().toLowerCase();
      
      console.log(message);
			// if (
			// 	message.indexOf('insufficient funds') !== -1 ||
			// 	message.indexOf('underpriced') !== -1
			// ) {
			// 	// await dispatch(push('/main/transaction-no-gas-error'));
			// } else if (error.statusText === 'UNKNOWN_ERROR') {
			// 	// await dispatch(push('/main/transaction-unlock'));
			// } else {
			// 	// await dispatch(push('/main/allowance-transaction-error'));
			// }
		});
	},
	cancelAllowanceEditorOperation: () => async (dispatch, getState) => {
		const editor = contractSelectors.selectAllowanceEditor(getState());
		let { cancelPath } = editor;

		if (!cancelPath) {
			cancelPath = Routes.ALLOWANCE_LIST;
		}

		await dispatch(navigate(cancelPath));
		await dispatch(contractActions.setEditorAction({}));
	},
	requestAllowanceOperation: options => async (dispatch, getState) => {
		const allowance = await dispatch(
			operations.fetchAllowanceOperation(
				options.tokenAddress,
				options.contractAddress,
				options.tokenDecimals
			)
		);
		if (allowance.amount >= options.requestedAmount) {
			await dispatch(navigate(options.nextPath));
			return;
		}
		await dispatch(operations.startAllowanceEditorOperation({ ...options, fixed: true }));
	}
};

export const contractOperations = operations;

export default contractOperations;