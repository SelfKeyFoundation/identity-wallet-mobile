import sinon from 'sinon';
import walletModule from './index';
import walletActions from './actions';

describe('Wallet Duck', () => {
  let _state = {};
	let store = {
		dispatch() {},
		getState() {
			return _state;
		}
  };
  beforeEach(() => {
    sinon.restore();
		_state = { wallet: { ...walletModule.initialState } };
  })

  describe('Reducers', () => {

    it('setWalletLoadingReducer', () => {
      let state = walletModule.reducers.setWalletLoadingReducer(
        walletModule.initialState,
        walletActions.setLoading(true)
      );

      expect(state.isLoading).toEqual(true);

      state = walletModule.reducers.setWalletLoadingReducer(
        walletModule.initialState,
        walletActions.setLoading(false),
      );

      expect(state.isLoading).toEqual(false);
    });

    it('setWalletReducer', () => {
      const wallet = {
        name: 'test',
      };
      const state = walletModule.reducers.setWalletReducer(
        walletModule.initialState,
        walletActions.setWallet(wallet),
      );
      expect(state.wallet).toEqual(wallet);
    });
  });
  describe('Operations', () => {
    it('loadWalletOperation', async () => {
      sinon.stub(store, 'dispatch');
      sinon.stub(walletModule.actions, 'setLoading');
      sinon.stub(walletModule.actions, 'setWallet');

      await walletModule.operations.loadWalletOperation()(store.dispatch, store.getState);
      expect(walletModule.actions.setLoading.calledWith(true)).toBeTruthy();
      expect(walletModule.actions.setLoading.calledWith(false)).toBeTruthy();
      expect(walletModule.actions.setWallet.calledWith({
        name: 'SelfKey Wallet A',
      })).toBeTruthy();
    });
  });
});
