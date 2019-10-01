import appActions from './actions';
import { initRealm } from '@selfkey/wallet-core/db/realm-service';

const delay = (time) => new Promise((res) => setTimeout(res, time));

const loadAppOperation = () => async (dispatch, getState) => {
  dispatch(appActions.setLoading(true));

  await initRealm({
    // TODO: Remove it before the first internal release
    // We should rely on the migration system after the first release
    deleteRealmIfMigrationNeeded: true,
    skipMigration: true,
  });

  // We don't have too much to load and QA team will not see the transition:
  // Splash Screen -> Loading Screen -> Home
  // This delay will hold the loading screen for a while and allow QA team to validate the screen
  // TODO: Remove in the future
  await delay(3000);

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
