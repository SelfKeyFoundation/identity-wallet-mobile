import {reduxPromise} from './register-redux-promise';
import { middlewares } from '../middlewares';

describe('middlewares', () => {
  it('expect to register redux promise', () => {
    expect(middlewares.filter(item => item === reduxPromise)).toHaveLength(1);
  });
})