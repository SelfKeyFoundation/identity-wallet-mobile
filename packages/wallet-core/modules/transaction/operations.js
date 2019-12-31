import transactionActions from './actions';
import * as selectors from './selectors';
import module from './index';
import { navigate, Routes } from '@selfkey/wallet-core/navigation';

export const operations = {
  goToTransactionOperation: (tokenSymbol) => async (dispatch, getState) => {
    await dispatch(module.operations.setToken(tokenSymbol));

    navigate(Routes.APP_SEND_TOKENS, {
      tokenSymbol
    });
  }
};

export const transactionOperations = {
  ...transactionActions,
  ...operations,
};

export default transactionOperations;
