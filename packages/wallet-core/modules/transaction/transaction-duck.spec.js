import sinon from 'sinon';
import duck from './index';
import transactionActions from './actions';
import { setPriceData } from '@selfkey/blockchain/services/price-service';

const { selectors } = duck;

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
    _state = {
      transaction: {
        ...duck.initialState,
        nonce: 1,
        transactionFee: 'normal',
        address: '0xB4D9653b9d9FeF8Cf3407bff6d21db25d74dddc6',
        amount: 0.00001,
        gasLimit: 21000,
        transactionFeeOptions: [{ id: 'slow',
           name: 'Slow',
           gasPrice: 1,
           time: '5-30 min',
           ethAmount: '0.000021',
           fiatAmount: 0.0027123599999999996 },
         { id: 'normal',
           name: 'Normal',
           gasPrice: 1.2,
           time: '2-5 min',
           ethAmount: '0.0000252',
           fiatAmount: 0.003254832 },
         { id: 'fast',
           name: 'Fast',
           gasPrice: 8,
           time: '< 2 min',
           ethAmount: '0.000168',
           fiatAmount: 0.021698879999999997 }]
      },
      wallet: {
        address: '0xDF8e950e8b90bA07Cc104C70BA28E5812f75A042',
        privateKey: '0xeed695915f3124827125dbf0afc513e1c8c01c178a2d3e9cbd2270db7ca3a2fd'
      },
      ethGasStation: {
        fast: 8,
        safeLow: 1,
        average: 1.2,
      }
    };
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

      let state = duck.reducers.setAddressReducer(
        transactionActions.initialState,
        transactionActions.setAddress(address)
      );

      expect(state.address).toEqual(address);
    });

    it('setAmount', () => {
      const amount = 0.0002;

      let state = duck.reducers.setAmountReducer(
        transactionActions.initialState,
        transactionActions.setAmount(amount)
      );

      expect(state.amount).toEqual(amount);
    });

    it('setErrors', () => {
      const value = {};

      let state = duck.reducers.setErrorsReducer(
        transactionActions.initialState,
        transactionActions.setErrors(value)
      );

      expect(state.errors).toEqual(value);
    });

    it('setTransactionFeeOptions', () => {
      const value = [];

      let state = duck.reducers.setTransactionFeeOptionsReducer(
        transactionActions.initialState,
        transactionActions.setTransactionFeeOptions(value)
      );

      expect(state.transactionFeeOptions).toEqual(value);
    });

    it('setStatus', () => {
      const value = 'pending';

      let state = duck.reducers.setStatusReducer(
        transactionActions.initialState,
        transactionActions.setStatus(value)
      );

      expect(state.status).toEqual(value);
    });

    it('setSendEnabled', () => {
      const value = true;

      let state = duck.reducers.setSendEnabledReducer(
        transactionActions.initialState,
        transactionActions.setSendEnabled(value)
      );

      expect(state.sendEnabled).toEqual(value);
    });

    it('setTransactionFee', () => {
      const value = 'normal';

      let state = duck.reducers.setTransactionFeeReducer(
        transactionActions.initialState,
        transactionActions.setTransactionFee(value)
      );

      expect(state.transactionFee).toEqual(value);
    });

    it('setToken', () => {
      const value = 'key';

      let state = duck.reducers.setTokenReducer(
        transactionActions.initialState,
        transactionActions.setToken(value)
      );

      expect(state.token).toEqual(value);
    });

    it('setAdvancedMode', () => {
      const value = true;

      let state = duck.reducers.setAdvancedModeReducer(
        transactionActions.initialState,
        transactionActions.setAdvancedMode(value)
      );

      expect(state.advancedMode).toEqual(value);
    });
  });
  describe('Operations', () => {
    it('goToTransactionOperation', async () => {
		  sinon.stub(store, 'dispatch');
      sinon.stub(duck.actions, 'setToken');
      sinon.stub(duck.actions, 'updateTransaction');      
		  const tokenSymbol = 'eth';
		  await duck.operations.goToTransactionOperation('eth')(store.dispatch, store.getState);
      expect(duck.actions.setToken.calledWith(tokenSymbol)).toBeTruthy();
      
      const transaction = duck.actions.updateTransaction.getCall(0).args[0];
    });

    describe('sendTransaction' , () => {
      const tokenSymbol = 'eth';

      beforeAll(async () => {
        sinon.restore();
        sinon.stub(store, 'dispatch');
        // await duck.operations.sendTransaction()(store.dispatch, store.getState);
      });

      it('expect web3 to be called', () => {
        
      });
    });
  });
});
