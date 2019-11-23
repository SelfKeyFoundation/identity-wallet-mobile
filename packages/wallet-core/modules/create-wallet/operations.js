import actions from './actions';
import { navigate, Routes } from '../../navigation';

const submitPasswordOperation = (form) => async (dispatch, getState) => {
  dispatch(actions.setPassword(form.password));
  await navigate(Routes.CREATE_WALLET_CONFIRM_PASSWORD);
};

const submitPasswordConfirmationOperation = (form) => async (dispatch, getState) => {
  console.log(form);
  await navigate(Routes.APP_DASHBOARD);
};

export const operations = {
  submitPasswordOperation,
  submitPasswordConfirmationOperation,
};

export const createWalletOperations = {
  ...actions,
  ...operations,
};

export default createWalletOperations;
