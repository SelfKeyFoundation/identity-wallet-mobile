import appActions from './actions';
import { initRealm, seedDb } from '@selfkey/wallet-core/db/realm-service';
import { navigate, Routes } from '../../navigation';
import { WalletModel, GuideSettingsModel, WalletTokenModel } from '../../models';
import { exitApp } from '../../system';
import * as selectors from './selectors';
import { getGuideSettings } from './app-module-utils';
import { loadTokenPrices } from '@selfkey/blockchain/services/price-service';
import ducks from '../index';

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

  try {
    loadTokenPrices();
    dispatch(ducks.identity.operations.loadIdentityOperation());
  } catch(err) {
    console.error(err);
  }

  const wallets = await WalletModel.getInstance().findAll();

  if (!wallets.length) {
    navigate(Routes.CREATE_WALLET_PASSWORD);
  } else if (wallets.length > 1) {
    navigate(Routes.WALLET_SELECTION, {
      isUnlockScreen: true,
    });
  } else {
    dispatch(ducks.wallet.actions.setWallet(wallets[0]));
    navigate(Routes.UNLOCK_WALLET_PASSWORD);
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
