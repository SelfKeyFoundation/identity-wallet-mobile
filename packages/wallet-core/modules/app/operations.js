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
    deleteRealmIfMigrationNeeded: true,
    // skipMigration: true,
  });

  await seedDb();

  // Load guide settings
  const guideSettings = await getGuideSettings();
  dispatch(appActions.setGuideSettings(guideSettings));

  try {
    // TODO: Handle internet issues
    loadTokenPrices();
    delay(1000);
  } catch(err) {
    console.error(err);
  }

  const wallets = await WalletModel.getInstance().findAll();

  if (!wallets.length) {
    navigate(Routes.CREATE_WALLET_FLOW);
  } else {
    navigate(Routes.UNLOCK_WALLET_PASSWORD);
  }
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
