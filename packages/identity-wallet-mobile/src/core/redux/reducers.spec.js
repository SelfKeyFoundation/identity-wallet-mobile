import { createReducer } from './reducers';

describe('Redux core: Reducers', () => {
  it('expect to call reducer', () => {
    const reducers = {
      'test': jest.fn(),
    };

    let reducer = createReducer({}, reducers);
    reducer({}, { type: 'test' });
    expect(reducers.test).toBeCalled();
  });
});
