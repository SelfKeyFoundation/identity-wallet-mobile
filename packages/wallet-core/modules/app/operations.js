import appActions from './actions';
import { initRealm } from '@selfkey/wallet-core/db/realm-service';
import { navigate, Routes } from '../../navigation';
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
  await delay(1000);

  // Redirect to App FLOW
  // TODO: Verify if wallet is created, if not can redirect to on boarding flow
  navigate(Routes.ON_BOARDING_FLOW);

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
