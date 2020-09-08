import actions from './actions';
import * as selectors from './selectors';
import { WalletModel, TokenModel } from '../../models';
import duck from './index';
import ducks from '../index';


const loadWalletsOperation = () => async (dispatch, getState) => {
  // load wallets from db and populate reducer
  const wallets = await WalletModel.getInstance().findSorted(null, [['lastUnlockDate', true]]);
  await dispatch(duck.actions.setWallets(wallets));
  return wallets[0].address;
};

export const operations = {
  loadWalletsOperation,
};

export const walletOperations = {
  ...actions,
  ...operations,
};

export default walletOperations;
