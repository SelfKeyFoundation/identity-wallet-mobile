import sinon from 'sinon';
import duck from './index';
import actions from './actions';

describe('Create Wallet Duck', () => {
  it('', () => {
    expect(2).toBe(2);
  });
  let _state = {};
	let store = {
		dispatch() {},
		getState() {
			return _state;
		},
  };
  beforeEach(() => {
    sinon.restore();
		_state = { password: undefined };
  });

  describe('Reducers', () => {
    it('setPasswordReducer', () => {
      let state = duck.reducers.setPasswordReducer(
        duck.initialState,
        actions.setPassword('123')
      );

      expect(state.password).toEqual('123');
    });
  });
  describe('Operations', () => {
    // it('submitPasswordOperation', async () => {
    //   sinon.stub(store, 'dispatch');
    //   sinon.stub(duck.actions, 'setPassword');
    //   const form = {
    //     password: '123',
    //   };

    //   await duck.operations.submitPasswordOperation(form)(store.dispatch, store.getState);
    //   expect(duck.actions.setPassword.calledWith(form.password)).toBeTruthy();
    // });
  });
});
