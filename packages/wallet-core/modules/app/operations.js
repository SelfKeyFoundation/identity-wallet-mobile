import appActions from './actions';
import { initRealm } from '@selfkey/wallet-core/db/realm-service';
import { navigate, Routes } from '../../navigation';
import { WalletModel } from '../../models';
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

  // TODO: Remove in the future
  await delay(2000);

  // Redirect to App FLOW
  const wallets = await WalletModel.getInstance().findAll();

  dispatch(modules.unlockWallet.operations.submitUnlockOperation({ password: '!@#456Asd'}));
  // if (!wallets.length) {
  //   navigate(Routes.CREATE_WALLET_FLOW);
  // } else {
  //   navigate(Routes.UNLOCK_WALLET_FLOW);
  // }

  
  // navigate(Routes.APP_DASHBOARD);

  dispatch(appActions.setLoading(false));
};

export const operations = {
  loadAppOperation,
};

export const appOperations = {
  ...appActions,
  ...operations,
};

export default appOperations;
