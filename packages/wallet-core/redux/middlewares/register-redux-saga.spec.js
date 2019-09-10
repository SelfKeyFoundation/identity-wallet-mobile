import {reduxSaga} from './register-redux-saga';
import { middlewares } from '../middlewares';

describe('middlewares', () => {
  it('expect to register redux saga', () => {
    expect(middlewares.filter(item => item === reduxSaga)).toHaveLength(1);
  });
})