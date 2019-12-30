import appActions from './actions';
import { initRealm, seedDb } from '@selfkey/wallet-core/db/realm-service';
import { navigate, Routes } from '../../navigation';
import { WalletModel, GuideSettingsModel } from '../../models';
import { exitApp } from '../../system';
import * as selectors from './selectors';
import { getGuideSettings } from './app-module-utils';
import { loadTokenPrices } from '@selfkey/blockchain/services/price-service';
import modules from '../index';

const delay = (time) => new Promise((res) => setTimeout(res, time));

const loadAppOperation = () => async (dispatch, getState) => {
  dispatch(appActions.setLoading(true));

  await initRealm({
    // TODO: Remove it before the first internal release
    // We should rely on the migration system after the first release
    // deleteRealmIfMigrationNeeded: true,
    skipMigration: true,
  });

  await seedDb();

  // Load guide settings
  const guideSettings = await getGuideSettings();
  dispatch(appActions.setGuideSettings(guideSettings));

  // TODO: Remove in the future
  try {
    // TODO: Handle internet issues
    await loadTokenPrices();
  } catch(err) {
    console.error(err);
  }

  // Redirect to App FLOW
  const wallets = await WalletModel.getInstance().findAll();

  // await WalletModel.getInstance().removeAll();
  // Auto unlock, for development purposes
  // dispatch(modules.unlockWallet.operations.submitUnlockOperation({ password: '!@#456Asd'}));
  // navigate(Routes.APP_DASHBOARD);

  if (!wallets.length) {
    navigate(Routes.CREATE_WALLET_FLOW);
  } else {
    navigate(Routes.UNLOCK_WALLET_FLOW);
  }

  dispatch(appActions.setLoading(false));
  // TODO: Remove, testing purposes
  await dispatch(modules.unlockWallet.operations.submitUnlockOperation({
    password: '!@9Mnemdm'
  }));
  // open send tokens modal

  await dispatch(modules.transaction.operations.goToTransactionOperation('eth'));
  // navigate(Routes.APP_SEND_TOKENS);
};

const acceptTermsOperation = () => async (dispatch, getState) => {
  const state = getState();
  const settings = selectors.getGuideSettings(state);

  settings.termsAccepted = true;

  await GuideSettingsModel.getInstance().updateById(1, settings);

  dispatch(appActions.setGuideSettings(settings));
};

const rejectTermsOperation = () => async (dispatch, getState) => {
  exitApp();
};

export const operations = {
  loadAppOperation,
  acceptTermsOperation,
  rejectTermsOperation,
};

export const appOperations = {
  ...appActions,
  ...operations,
};

export default appOperations;
