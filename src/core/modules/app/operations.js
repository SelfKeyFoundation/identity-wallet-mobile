import appActions from './actions';
import { initRealm, seedDb } from 'core/db/realm-service';
import { navigate, Routes } from '../../navigation';
import { WalletModel, GuideSettingsModel, WalletTokenModel, IdAttributeTypeModel } from '../../models';
import { exitApp } from '../../system';
import * as selectors from './selectors';
import { getGuideSettings } from './app-module-utils';
import { loadTokenPrices } from 'blockchain/services/price-service';
import ducks from '../index';
import { getSupportedBiometryType } from 'rn-identity-vault/keychain';
import ContractSyncJobHandler from 'core/services/contracts-sync-job-handler';
import { getFeatureFlags } from 'screens/marketplaces/airtable-service';

const delay = (time) => new Promise((res) => setTimeout(res, time));

const loadAppOperation = () => async (dispatch, getState) => {
  dispatch(appActions.setLoading(true));

  await initRealm({
    // skipMigration: true,
    // deleteRealmIfMigrationNeeded: true,
  });

  await seedDb();

  // Load guide settings
  const guideSettings = await getGuideSettings();
  dispatch(appActions.setGuideSettings(guideSettings));

  getSupportedBiometryType().then(value => {
    dispatch(appActions.setSupportedBiometryType(value));
  });

  const idAttributes = await IdAttributeTypeModel.getInstance().findAll();

  if (!idAttributes.length) {
    await dispatch(ducks.identity.operations.loadIdentityOperation(true));
  }

  try {
    loadTokenPrices();
    dispatch(ducks.identity.operations.loadIdentityOperation());
  } catch(err) {
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

  dispatch(appActions.setLoading(false));
};

const acceptTermsOperation = () => async (dispatch, getState) => {
  const state = getState();
  const settings = selectors.getGuideSettings(state);

  await GuideSettingsModel.getInstance().updateById(1, {
    termsAccepted: true
  });

  dispatch(appActions.setGuideSettings({
    ...settings,
    termsAccepted: true
  }));
};

const loadFeatureFlagsOperation = () => async (dispatch, getState) => { 
  const flags = await getFeatureFlags();
  dispatch(appActions.setFeatureFlags(flags));
}

const rejectTermsOperation = () => async (dispatch, getState) => {
  exitApp();
};

export const operations = {
  loadAppOperation,
  acceptTermsOperation,
  rejectTermsOperation,
  loadFeatureFlagsOperation,
};

export const appOperations = {
  ...appActions,
  ...operations,
};

export default appOperations;
