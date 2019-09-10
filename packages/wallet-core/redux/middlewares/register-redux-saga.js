import reduxSaga from 'redux-saga';
import { addMiddleware } from '../middlewares';

export {
  reduxSaga,
};

addMiddleware(reduxSaga);
