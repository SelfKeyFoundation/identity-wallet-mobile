import walletReducer from "./reducers";
import * as Actions from './actions';

describe('reducers', () => {
  it('expect to call reducer', () => {
    const state = walletReducer({}, Actions.loadWallet());

    expect(state).toEqual({
      isLoading: true,
    });
  });
});
