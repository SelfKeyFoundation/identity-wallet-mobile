import appActions from './actions';
import { initRealm, seedDb } from 'core/db/realm-service';
import { navigate, Routes } from '../../navigation';
import {
	WalletModel,
	GuideSettingsModel,
	WalletTokenModel,
	IdAttributeTypeModel,
} from '../../models';
import { exitApp, System } from '../../system';
import * as selectors from './selectors';
import { getGuideSettings } from './app-module-utils';
import { loadTokenPrices } from 'blockchain/services/price-service';
import ducks from '../index';
import { getSupportedBiometryType } from 'rn-identity-vault/keychain';
import ContractSyncJobHandler from 'core/services/contracts-sync-job-handler';
import { getFeatureFlags, getVendor } from 'screens/marketplaces/airtable-service';
import { Linking } from 'react-native';
import { getAddress } from '../wallet/selectors';
import { isDevMode } from 'configs';
import { NetworkStore } from './NetworkStore';
import { Web3Service } from 'blockchain/services/web3-service';
import walletOperations from '../wallet/operations';
import { skAgentOperations } from 'features/selfkey-agent/sk-agent-slice';

const delay = time => new Promise(res => setTimeout(res, time));

const loadAppOperation = () => async (dispatch, getState) => {
	dispatch(appActions.setLoading(true));

	await initRealm({
		// skipMigration: true,
		// deleteRealmIfMigrationNeeded: true,
	});

	await seedDb();

	// dispatch(skAgentOperations.init());
	// Load guide settings
	const guideSettings = await getGuideSettings();
	dispatch(appActions.setGuideSettings(guideSettings));

	// getSupportedBiometryType().then(value => {
	// 	dispatch(appActions.setSupportedBiometryType(value));
	// });

	const idAttributes = await IdAttributeTypeModel.getInstance().findAll();

	if (!idAttributes.length) {
		await dispatch(ducks.identity.operations.loadIdentityOperation(true));
	}

	try {
		loadTokenPrices();
		dispatch(ducks.identity.operations.loadIdentityOperation());
	} catch (err) {
		console.error(err);
	}
	
	const wallets = await WalletModel.getInstance().findAll();
	const defaultWallet = wallets[0];

	if (defaultWallet) {
		dispatch(ducks.wallet.actions.setWallet(defaultWallet));
	}
	// Register Job Handlers
	// ContractSyncJobHandler.getInstance().registerHandler();

	if (wallets.length === 1) {
		navigate(Routes.UNLOCK_WALLET_PASSWORD);
	} else if (wallets.length > 1) {
		navigate(Routes.WALLET_SELECTION, {
			isUnlockScreen: true,
		});
	} else {
		navigate(Routes.CREATE_WALLET_PASSWORD);
	}

	// navigate(Routes.SK_AGENT);

	NetworkStore.load().then(() => {
		const networkId = NetworkStore.getNetwork();
		dispatch(appActions.setNetwork(networkId));
	});

	dispatch(appActions.setLoading(false));
};

const acceptTermsOperation = () => async (dispatch, getState) => {
	const state = getState();
	const settings = selectors.getGuideSettings(state);

	await GuideSettingsModel.getInstance().updateById(1, {
		termsAccepted: true,
	});

	dispatch(
		appActions.setGuideSettings({
			...settings,
			termsAccepted: true,
		}),
	);
};

const loadFeatureFlagsOperation = () => async (dispatch, getState) => {
	const flags = await getFeatureFlags();
	dispatch(appActions.setFeatureFlags(flags));
};

const rejectTermsOperation = () => async (dispatch, getState) => {
	exitApp();
};

const openhMoonpayOperation = () => async (dispatch, getState) => {
	const currencyCode = 'key';
	const walletAddress = getAddress(getState());
	const crypto = System.getCrypto();
	const vendor = await getVendor('moonpay');
	const apiKey = vendor.relyingPartyConfig.key;
	const privateKey = vendor.relyingPartyConfig.secret;
	const search = `?apiKey=${apiKey}&currencyCode=${currencyCode}&walletAddress=${walletAddress}`;
	const signature = crypto
		.createHmac('sha256', privateKey)
		.update(search)
		.digest('base64');

	const url = isDevMode()
		? 'https://buy-staging.moonpay.com'
		: 'https://buy.moonpay.com';
	const urlWithSignature = `${url}${search}&signature=${encodeURIComponent(signature)}`;

	Linking.openURL(urlWithSignature);
};

const setNetwork = networkId => async (dispatch, getState) => {
	NetworkStore.setNetwork(networkId);
	dispatch(appActions.setNetwork(networkId));
	Web3Service.getInstance().createWeb3();
	dispatch(walletOperations.refreshWalletOperation());
};

export const operations = {
	loadAppOperation,
	acceptTermsOperation,
	rejectTermsOperation,
	loadFeatureFlagsOperation,
	openhMoonpayOperation,
	setNetwork,
};

export const appOperations = {
	...appActions,
	...operations,
};

export default appOperations;
