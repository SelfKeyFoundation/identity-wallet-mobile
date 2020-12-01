import { createSlice } from '@reduxjs/toolkit';
import { Linking } from 'react-native';
import EthGasStationService from 'blockchain/services/eth-gas-station-service';
import { getTokenAmount } from 'blockchain/services/price-service';
import { getConfigs, isDevMode } from 'configs';
import { WalletModel } from 'core/models';
import modules from 'core/modules';
import { getTransactionFeeOptions } from 'core/modules/transaction/operations';
import { getTokenBalance } from 'core/modules/wallet/wallet-util';
import { getKEYContractAddress } from 'core/services/contract-service';
import { getGasLimit } from 'core/services/token-service';
import { fetchIncorporations } from './incorporations-service';
import { getInventoryItem, getVendor } from './airtable-service';
import { navigate, navigateBack, Routes } from 'core/navigation';

export const ProductDetailSelectors = {
	getTemplateId(details) {
		if (details.data) {
			return isDevMode() ? details.data.testTemplateId : details.data.templateId;
		}

		return details.templateId;

	},
	getRelyingPartyId(details) {
		return details.vendorId || details.vendor_id;
	},
	getWalletAddress(details) {
		if (details.data) {
			return details.data.walletAddress;
		}
		
		return details.walletAddress;
	},
};

const initialState = {
	showConfirmationModal: false,
	showBalanceErrorModal: false,
	showChecklistModal: false,
	showPaymentModal: false,
	showPaymentProgressModal: false,
	paymentInProgress: false,
	errorDetails: null,
	categories: [
		{
			id: 'keyfi',
			title: 'KeyFi.com Credentials',
			description: 'Verify your Credentials to access and earn using KeyFi.com. A First of its kind DeFi aggregator platform backed by SelfKey Credentials that allows you to liquidity mine across top DeFi platforms and earn rewards.',
		},
		// {
		// 	id: 'exchanges',
		// 	title: 'Crypto Exchanges',
		// 	description:
		// 		'Compare exchange accounts and instantly sign up for a verified account without waiting for limits',
		// },
		// {
		// 	id: 'incorporations',
		// 	title: 'Incorporations',
		// 	description:
		// 		'Compare exchange accounts and instantly sign up for a verified account without waiting for limits',
		// },
	],
	product: {
		isLoading: true,
		details: null,
		requirements: [],
		ethFee: 0,
	},
	productList: {
		isLoading: true,
		category: null,
		items: [],
	},
	categoryRepository: {},
	productRepository: {},
	price: null,
};

const marketplace = createSlice({
	name: 'marketplace',
	initialState,
	reducers: {
		setShowConfirmationModal(state, action) {
			state.showConfirmationModal = action.payload;
		},
		setShowBalanceErrorModal(state, action) {
			state.showBalanceErrorModal = action.payload;
		},
		setShowPaymentModal(state, action) {
			state.showPaymentModal = action.payload;
		},
		setShowPaymentProgressModal(state, action) {
			state.showPaymentProgressModal = action.payload;
		},
		setProductDetails(state, action) {
			state.product.details = action.payload;
		},
		setProductEthFee(state, action) {
			state.product.ethFee = action.payload;
		},
		setProductLoading(state, action) {
			state.product.isLoading = action.payload;
		},
		setProductList(state, action) {
			const { category, items } = action.payload;
			state.productList.items = items;
			state.productList.category = category;
		},
		setProductListLoading(state, action) {
			state.productList.isLoading = action.payload;
		},
		setErrorDetails(state, action) {
			state.errorDetails = action.payload;
		},
		setShowChecklistModal(state, action) {
			state.showChecklistModal = action.payload;
		},
		setLastApplication(state, action) {
			state.lastApplication = action.payload;
		},
		setPaymentInProgress(state, action) {
			state.paymentInProgress = action.payload;
		},
		setPrice(state, action) {
			state.price = action.payload;
		},
		setSelectedPrice(state, action) {
			state.price = state.price.map(item => ({
				...item,
				isActive: item.id === action.payload,
			}));
		}
	},
});

export const mkpActions = marketplace.actions;

const getRoot = state => state.marketplace;

export const mkpSelectors = {
	getCategories: state => getRoot(state).categories,
	getCategoryById: id => state => getRoot(state).categories.find(cat => cat.id === id),
	getProductListItems: state => getRoot(state).productList.items,
	getProductListCategory: state => getRoot(state).productList.category,
	getProductListLoading: state => getRoot(state).productList.isLoading,
	getProductLoading: state => getRoot(state).product.isLoading,
	getProductDetails: state => getRoot(state).product.details,
	getProductRequirements: state => getRoot(state).product.requirements,
	getProductEthFee: state => getRoot(state).product.ethFee,
	getShowConfirmationModal: state => getRoot(state).showConfirmationModal,
	getShowBalanceErrorModal: state => getRoot(state).showBalanceErrorModal,
	getShowChecklistModal: state => getRoot(state).showChecklistModal,
	getShowPaymentModal: state => getRoot(state).showPaymentModal,
	getShowPaymentProgressModal: state => getRoot(state).showPaymentProgressModal,
	getErrorDetails: state => getRoot(state).errorDetails,
	getLastApplication: state => getRoot(state).lastApplication,
	getPaymentInProgress: state => getRoot(state).paymentInProgress,
	getPrice: state => getRoot(state).price,
	getSelectedPrice: state => {
		const price = getRoot(state).price;
		
		if (Array.isArray(price)) {
			return price.find(item => item.isActive);
		}
		
		return price;
	},
	
};

function getExchangesItems(categoryId) {
	return fetch('https://airtable.selfkey.org/airtable?tableName=ExchangesDev')
		.then(res => res.json())
		.then(data => {
			return data.entities
				.map(entity => ({
					...entity.data,
					type: categoryId,
				}))
				.filter(item => item.status === 'Active');
		});
}

async function getIncorporationsItems(categoryId) {
	const data = await fetchIncorporations();
	const keyRate = 0.25;

	return data
		.filter(item => item.status === 'active')
		.map(item => ({
			...item,
			keyPrice: item.price * keyRate,
			type: categoryId,
		}));
}

const itemFetcherMap = {
	exchanges: getExchangesItems,
	incorporations: getIncorporationsItems,
};

export const mkpOperations = {
	fetchProductList: categoryId => async (dispatch, getState) => {
		dispatch(mkpActions.setProductListLoading(true));

		const state = getState();
		const fetcher = itemFetcherMap[categoryId];
		const category = mkpSelectors.getCategoryById(categoryId)(state);

		dispatch(
			mkpActions.setProductList({
				items: [],
				category,
			}),
		);

		let items = [];

		if (fetcher) {
			items = await fetcher(categoryId);
		}

		dispatch(
			mkpActions.setProductList({
				items,
				category,
			}),
		);

		dispatch(mkpActions.setProductListLoading(false));
	},

	loadProduct: (categoryId, skuId) => async (dispatch, getState) => {
		dispatch(mkpActions.setProductLoading(true));
		const state = getState();
		let details;
		let price;

		// Should verify current category
		if (categoryId === 'keyfi') {
			details = await getInventoryItem(categoryId, skuId);
			const vendor = await getVendor(categoryId);
			details.walletAddress = vendor.payment_address;
			details.templateId = details.relyingPartyConfig.templateId;
			details.vendorId = categoryId;
			details.priceKey = details.price * 0.8;
			price = parseFloat(details.price) === 0 ? [] : [{
				id: 1,
				amount: details.price,
				currency: 'usd',
				cryptoCurrency: 'eth',
			}, {
				id: 2,
				amount: details.priceKey,
				currency: 'usd',
				cryptoCurrency: 'key',
				isActive: true,
			}];
		} else {
			const categoryItems = mkpSelectors.getProductListItems(state);
			details = categoryItems.find(item => item.sku === skuId);
			price = {
				id: 1,
				amount: details.price,
				currency: 'usd',
				cryptoCurrency: 'key',
			}
		}

		dispatch(mkpActions.setPrice(price));
		dispatch(mkpActions.setProductDetails(details));

		const walletAddress = ProductDetailSelectors.getWalletAddress(details);
		const from = modules.wallet.selectors.getAddress(state);
		const contractAddress = getKEYContractAddress();
		const amount = getTokenAmount(details.price, 'key');
		const gasLimit = await getGasLimit({ contractAddress, address: walletAddress, amount, from });
		const ethFee = await EthGasStationService.getInstance().getEthFee(gasLimit);
		const rpName = ProductDetailSelectors.getRelyingPartyId(details);
		const templateId = ProductDetailSelectors.getTemplateId(details);

		await dispatch(modules.kyc.operations.loadRelyingPartyOperation(rpName));

		const lastApplication = modules.kyc.selectors.selectLastApplication(rpName, templateId)(
			getState(),
		);

		dispatch(mkpActions.setLastApplication(lastApplication));
		dispatch(mkpActions.setProductEthFee(ethFee));
		dispatch(mkpActions.setProductLoading(false));
	},

	applyForApplication: () => async (dispatch, getState) => {
		const price = mkpSelectors.getSelectedPrice(getState());//productDetails.keyPrice || productDetails.price;
		
		if (price) {
			return dispatch(mkpActions.setShowConfirmationModal(true));
		}
		
		return dispatch(mkpOperations.startApplication());
	},

	startApplication: () => async (dispatch, getState) => {
		const state = getState();
		const contractAddress = getKEYContractAddress();
		const walletAddress = modules.wallet.selectors.getAddress(state);
		// product price
		const productDetails = mkpSelectors.getProductDetails(state);
		// TODO: Remove this test line
		const keyBalance = +(await getTokenBalance(contractAddress, walletAddress));
		const price = mkpSelectors.getSelectedPrice(state);//productDetails.keyPrice || productDetails.price;
		
		if (price && price.amount > 0 && price.cryptoCurrency === 'key') {
			const keyPrice = getTokenAmount(price.amount, price.cryptoCurrency);

			if (keyBalance < keyPrice) {
				dispatch(
					mkpActions.setErrorDetails({
						remainingKey: keyPrice - keyBalance,
						keyBalance,
						keyPrice,
					}),
				);
				dispatch(mkpActions.setShowBalanceErrorModal(true));
				return;
			}
		}

		// check for SelfKey ID
		const identity = modules.identity.selectors.selectIdentity(state);

		async function loadChecklist() {
			await dispatch(modules.kyc.operations.loadRelyingPartyOperation(productDetails.vendorId));

			dispatch(mkpActions.setShowConfirmationModal(false));
			dispatch(mkpActions.setShowChecklistModal(true));
		}

		if (!identity.isSetupFinished) {
			dispatch(modules.identity.operations.navigateToProfileOperation(loadChecklist));
			return;
		}

		await loadChecklist();
	},

	payApplication: (skipRpLoading) => async (dispatch, getState) => {
		const state = getState();
		const details = mkpSelectors.getProductDetails(state);
		const price = mkpSelectors.getSelectedPrice(state);//productDetails.keyPrice || productDetails.price;

		if (!price || price.amount === 0) {
			return;
		}

		if (!skipRpLoading) {
			await dispatch(modules.kyc.operations.loadRelyingPartyOperation(details.vendorId));
		}
		dispatch(mkpActions.setShowPaymentModal(true));
	},
	
	// cancelPayment: () => async (dispatch, getState) => {
	// 	const state = getState();
	// 	const details = mkpSelectors.getProductDetails(state);
	// 	dispatch(mkpActions.setShowPaymentModal(false));

	// 	if (details.onCancelPayment) {
	// 		details.onCancelPayment();
	// 	}
	// },

	confirmPayment: () => async (dispatch, getState) => {
		const state = getState();
		const details = mkpSelectors.getProductDetails(state);
		const application = mkpSelectors.getLastApplication(state);
		const addressTo = ProductDetailSelectors.getWalletAddress(details);
		const rpName = ProductDetailSelectors.getRelyingPartyId(details);
		const price = mkpSelectors.getSelectedPrice(state);
		const tokenAmount = getTokenAmount(price.amount, price.cryptoCurrency);

		await dispatch(modules.transaction.operations.goToTransactionOperation(price.cryptoCurrency, addressTo, false));
		await dispatch(modules.transaction.operations.setAmount(`${tokenAmount}`));

		await dispatch(modules.transaction.operations.sendTransaction({
			onSuccess: async (hash) => {
				await dispatch(modules.kyc.operations.updateRelyingPartyKYCApplicationPayment(
					rpName,
					application.id,
					hash,
				));
				dispatch(mkpActions.setPaymentInProgress(false));
			},
			onError: () => {
				dispatch(mkpActions.setPaymentInProgress(false));
			}
		}));

		dispatch(mkpActions.setShowPaymentModal(false));
		dispatch(mkpActions.setShowPaymentProgressModal(true));
		dispatch(mkpActions.setPaymentInProgress(true));
	},
	submitAdditionalInformation: () => async (dispatch, getState) => {
		const state = getState();
		const application = mkpSelectors.getLastApplication(state);
		const details = mkpSelectors.getProductDetails(state);
		const rpName = ProductDetailSelectors.getRelyingPartyId(details);
		const rp = modules.kyc.selectors.relyingPartySelector(rpName)(state);
		const instanceUrl = rp.session.ctx.config.rootEndpoint;
		const url = `${instanceUrl}/applications/${application.id}?access_token=${
			rp.session.access_token.jwt
		}`;

		Linking.openURL(url);
		navigate(Routes.MARKETPLACE_CATEGORIES);
	}
};

export const mkpReducer = marketplace.reducer;

export default {
	reducer: mkpReducer,
	actions: mkpActions,
	operations: mkpOperations,
	selectors: mkpSelectors,
};
