import sinon from 'sinon';
import appModule from './index';
import appActions from './actions';

describe('App Duck', () => {
  let _state = {};
	let store = {
		dispatch() {},
		getState() {
			return _state;
		},
  };

  beforeEach(() => {
    sinon.restore();
		_state = { app: { ...appModule.initialState } };
  });

  describe('Reducers', () => {

    it('setAppLoadingReducer', () => {
      let state = appModule.reducers.setAppLoadingReducer(
        appModule.initialState,
        appActions.setLoading(true)
      );

      expect(state.isLoading).toEqual(true);

      state = appModule.reducers.setAppLoadingReducer(
        appModule.initialState,
        appActions.setLoading(false),
      );

      expect(state.isLoading).toEqual(false);
    });
  });
  describe('Operations', () => {
    // TODO: Mock initRealm function
    // it('loadAppOperation', async () => {
    //   sinon.stub(store, 'dispatch');
    //   sinon.stub(appModule.actions, 'setLoading');

    //   await appModule.operations.loadAppOperation()(store.dispatch, store.getState);
    //   expect(appModule.actions.setLoading.calledWith(true)).toBeTruthy();
    //   expect(appModule.actions.setLoading.calledWith(false)).toBeTruthy();
    // });
  });
});
