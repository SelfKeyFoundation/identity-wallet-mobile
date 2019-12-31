import sinon from 'sinon';
import duck from './index';
import txHistoryActions from './actions';
import { setPriceData } from '@selfkey/blockchain/services/price-service';

const { selectors } = duck;

describe('TxHistory Duck', () => {
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
      txHistory: {
        transactions: []
      },
    };
  })

  describe('Selectors', () => {
    it('getTransactions', () => {
      const state = {
        txHistory: {
          transactions: [1, 2, 3],
        }
      };

      expect(selectors.getTransactions(state)).toEqual(state.txHistory.transactions);
    });
  });

  describe('Reducers', () => {
    it('setTransactions', () => {
      const transactions = [1, 2, 3];

      let state = duck.reducers.setTransactionsReducer(
        duck.initialState,
        txHistoryActions.setTransactions(transactions)
      );

      expect(state.transactions).toEqual(transactions);
    });

    it('addTransaction', () => {
      const transactions = [1, 2, 3];

      let state = duck.reducers.addTransactionReducer(
        { transactions },
        txHistoryActions.addTransaction(4)
      );

      expect(state.transactions[0]).toEqual(4);
      expect(state.transactions[1]).toEqual(1);
      expect(state.transactions[2]).toEqual(2);
      expect(state.transactions[3]).toEqual(3);
    });
  });
  describe('Operations', () => {
    // it('goToTransactionOperation', async () => {
		//   sinon.stub(store, 'dispatch');
    //   sinon.stub(duck.actions, 'setToken');
    //   sinon.stub(duck.actions, 'updateTransaction');      
		//   const tokenSymbol = 'eth';
		//   await duck.operations.goToTransactionOperation('eth')(store.dispatch, store.getState);
    //   expect(duck.actions.setToken.calledWith(tokenSymbol)).toBeTruthy();
      
    //   const transaction = duck.actions.updateTransaction.getCall(0).args[0];
    // });
  });
});
