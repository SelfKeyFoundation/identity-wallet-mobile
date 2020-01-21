import sinon from 'sinon';
import duck from './index';

describe('Wallets Duck', () => {
  let _state = {};
	let store = {
		dispatch() {},
		getState() {
			return _state;
		}
  };
  beforeEach(() => {
    sinon.restore();
		_state = { wallets: { ...duck.initialState } };
  })

  describe('Reducers', () => {
    it('setWallets', () => {
      const wallets = [1, 2, 3];
      let state = duck.reducers.setWalletsReducer(
        duck.initialState,
        duck.actions.setWallets(wallets)
      );

      expect(state.wallets).toEqual(wallets);
    });

    it('addWallet', () => {
      const wallet = 4;
      let state = duck.reducers.addWalletReducer(
        duck.initialState,
        duck.actions.addWallet(4)
      );

      expect(state.wallets[0]).toEqual(wallet);
    });
  });
  describe('Operations', () => {
    
  });
});
