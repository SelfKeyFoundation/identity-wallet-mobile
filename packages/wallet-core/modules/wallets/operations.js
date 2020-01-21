import actions from './actions';
import * as selectors from './selectors';
import { WalletModel, TokenModel } from '../../models';
import duck from './index';
import ducks from '../index';


const loadWalletsOperation = () => async (dispatch, getState) => {
  // load wallets from db and populate reducer
  const wallets = await WalletModel.getInstance().findAll();
  await dispatch(duck.actions.setWallets(wallets));
};

export const operations = {
  loadWalletsOperation,
};

export const walletOperations = {
  ...actions,
  ...operations,
};

export default walletOperations;
