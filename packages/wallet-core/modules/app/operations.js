import appActions from './actions';
import { initRealm } from '@selfkey/wallet-core/db/realm-service';
import { navigate, Routes } from '../../navigation';
import { WalletModel } from '../../models';

const delay = (time) => new Promise((res) => setTimeout(res, time));

const loadAppOperation = () => async (dispatch, getState) => {
  dispatch(appActions.setLoading(true));

  await initRealm({
    // TODO: Remove it before the first internal release
    // We should rely on the migration system after the first release
    deleteRealmIfMigrationNeeded: true,
    skipMigration: true,
  });

  // TODO: Remove in the future
  await delay(2000);

  // Redirect to App FLOW
  const wallets = await WalletModel.getInstance().findAll();

  if (!wallets.length) {
    navigate(Routes.CREATE_WALLET_FLOW);
  } else {
    navigate(Routes.UNLOCK_WALLET_FLOW);
  }

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
