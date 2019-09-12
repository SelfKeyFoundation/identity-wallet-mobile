import {reduxThunk} from './register-redux-thunk';
import {middlewares} from '../middlewares';

describe('middlewares', () => {
  it('expect to register redux thunk', () => {
    expect(middlewares.filter(item => item === reduxThunk)).toHaveLength(1);
  });
})