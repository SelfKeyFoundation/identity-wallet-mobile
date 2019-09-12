import {reduxPromise} from './register-redux-saga';
import { middlewares } from '../middlewares';

describe('middlewares', () => {
  it('expect to register redux promise', () => {
    expect(middlewares.filter(item => item === reduxPromise)).toHaveLength(1);
  });
})