import sinon from 'sinon';
import transactionModule from './index';
import transactionActions from './actions';
import { setPriceData } from '@selfkey/blockchain/services/price-service';

const { selectors } = transactionModule;

describe('Transaction Duck', () => {
  let _state = {};
	let store = {
		dispatch() {},
		getState() {
			return _state;
		}
  };

  beforeEach(() => {
    sinon.restore();
    _state = { transaction: { ...transactionModule.initialState } };
    setPriceData([{
      name: 'Ethereum',
      symbol: 'ETH',
      source: 'https://coincap.io',
      priceUSD: 100,
    }])
  })

  describe('Selectors', () => {
    it('getAddress', () => {
      const state = {
        transaction: {
          address: 'address-test',
        }
      };

      expect(selectors.getAddress(state)).toEqual(state.transaction.address);
    });

    it('getAmount', () => {
      const state = {
        transaction: {
          amount: 0.0001,
        }
      };

      expect(selectors.getAmount(state)).toEqual(state.transaction.amount);
    });

    it('getSendEnabled', () => {
      const state = {
        transaction: {
          sendEnabled: false,
        }
      };

      expect(selectors.getSendEnabled(state)).toEqual(state.transaction.sendEnabled);
    });

    it('getStatus', () => {
      const state = {
        transaction: {
          status: 'pending',
        }
      };

      expect(selectors.getStatus(state)).toEqual(state.transaction.status);
    });

    it('getFiatAmount', () => {
      const state = {
        transaction: {
          amount: 0.05,
        }
      };

      expect(selectors.getFiatAmount(state)).toEqual(state.transaction.amount * 100);
    });

    it('isAdvancedMode', () => {
      const state = {
        transaction: {
          advancedMode: true,
        }
      };

      expect(selectors.isAdvancedMode(state)).toEqual(state.transaction.advancedMode);
    });
  });

  describe('Reducers', () => {
    it('setAddress', () => {
      const address = 'test-address';

      let state = transactionModule.reducers.setAddressReducer(
        transactionActions.initialState,
        transactionActions.setAddress(address)
      );

      expect(state.address).toEqual(address);
    });

    it('setAmount', () => {
      const amount = 0.0002;

      let state = transactionModule.reducers.setAmountReducer(
        transactionActions.initialState,
        transactionActions.setAmount(amount)
      );

      expect(state.amount).toEqual(amount);
    });

    it('setErrors', () => {
      const value = {};

      let state = transactionModule.reducers.setErrorsReducer(
        transactionActions.initialState,
        transactionActions.setErrors(value)
      );

      expect(state.errors).toEqual(value);
    });

    it('setTransactionFeeOptions', () => {
      const value = [];

      let state = transactionModule.reducers.setTransactionFeeOptionsReducer(
        transactionActions.initialState,
        transactionActions.setTransactionFeeOptions(value)
      );

      expect(state.transactionFeeOptions).toEqual(value);
    });

    it('setStatus', () => {
      const value = 'pending';

      let state = transactionModule.reducers.setStatusReducer(
        transactionActions.initialState,
        transactionActions.setStatus(value)
      );

      expect(state.status).toEqual(value);
    });

    it('setSendEnabled', () => {
      const value = true;

      let state = transactionModule.reducers.setSendEnabledReducer(
        transactionActions.initialState,
        transactionActions.setSendEnabled(value)
      );

      expect(state.sendEnabled).toEqual(value);
    });

    it('setTransactionFee', () => {
      const value = 'normal';

      let state = transactionModule.reducers.setTransactionFeeReducer(
        transactionActions.initialState,
        transactionActions.setTransactionFee(value)
      );

      expect(state.transactionFee).toEqual(value);
    });

    it('setToken', () => {
      const value = 'key';

      let state = transactionModule.reducers.setTokenReducer(
        transactionActions.initialState,
        transactionActions.setToken(value)
      );

      expect(state.token).toEqual(value);
    });

    it('setAdvancedMode', () => {
      const value = true;

      let state = transactionModule.reducers.setAdvancedModeReducer(
        transactionActions.initialState,
        transactionActions.setAdvancedMode(value)
      );

      expect(state.advancedMode).toEqual(value);
    });
  });
  describe('Operations', () => {
  });
});
