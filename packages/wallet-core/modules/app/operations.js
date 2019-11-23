import appActions from './actions';
import { initRealm } from '@selfkey/wallet-core/db/realm-service';
import { navigate, Routes } from '../../navigation';
// import { createVault } from '../../identity-vault';

const delay = (time) => new Promise((res) => setTimeout(res, time));

// console.log('#mzm call createVault');
//   createVault({
//     privateKey: 'testing',
//     publicKey: 'another test',
//     password: '123',
//     securityPolicy: {
//       password: true,
//       faceId: false,
//       fingerprint: false,
//     },
//   }).then(console.log).catch(console.error);

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
  // TODO: Verify if wallet is created, if not can redirect to on boarding flow
  navigate(Routes.CREATE_WALLET_FLOW);

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
