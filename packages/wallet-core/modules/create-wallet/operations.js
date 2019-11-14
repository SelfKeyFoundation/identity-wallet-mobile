import actions from './actions';
import { navigate, Routes } from '../../navigation';

const submitPasswordScreenOperation = (form) => async (dispatch, getState) => {
  dispatch(actions.setPassword(form.password));
  await navigate(Routes.CREATE_WALLET_CONFIRM_PASSWORD);
};

export const operations = {
  submitPasswordScreenOperation,
};

export const createWalletOperations = {
  ...actions,
  ...operations,
};

export default createWalletOperations;
