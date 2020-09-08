import {reduxLogger} from './register-redux-logger';
import { middlewares } from '../middlewares';

describe('middlewares', () => {
  it('expect to register redux logger', () => {
    expect(middlewares.filter(item => item === reduxLogger)).toHaveLength(1);
  });
})