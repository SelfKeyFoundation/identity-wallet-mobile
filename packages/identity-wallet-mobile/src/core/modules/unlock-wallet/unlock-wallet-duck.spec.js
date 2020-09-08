import sinon from 'sinon';
import {
  walletOperations,
} from '../wallet/operations';
import duck from './index';
import actions from './actions';

describe('Unlock Wallet Duck', () => {
  let _state = {};
  let store = {
    dispatch() {},
    getState() {
      return _state;
    },
  };

  beforeEach(() => {
    sinon.restore();
    _state = {
      ...duck.initialState,
    };
  });

  describe('Reducers', () => {
    it('setErrors', () => {
      let state = duck.reducers.setErrors(
        duck.initialState,
        actions.setErrors({
          password: 'error',
        }),
      );

      expect(state.errors.password).toEqual('error');
    });
  });

  describe('Operations', () => {
    describe('submitUnlockOperation', () => {
      it('expect to set errors', async () => {
        sinon.stub(store, 'dispatch');
        sinon.stub(duck.actions, 'setErrors');
        const form = {
          password: '123',
        };
        const errors = {
          password: 'wrong_password',
        };

        await duck.operations.submitUnlockOperation(form)(store.dispatch, store.getState);
        expect(duck.actions.setErrors.calledWith(errors)).toBeTruthy();
      });

      it('expect to unlock and load the wallet', async () => {
        sinon.stub(store, 'dispatch');
        sinon.stub(duck.actions, 'setErrors');
        sinon.stub(walletOperations, 'loadWalletOperation');
        const form = {
          password: 'test',
        };

        await duck.operations.submitUnlockOperation(form)(store.dispatch, store.getState);
        expect(walletOperations.loadWalletOperation.called).toBeTruthy();
      });
    });
  });
});
