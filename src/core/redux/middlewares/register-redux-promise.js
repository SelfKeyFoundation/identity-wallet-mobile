import reduxPromise from 'redux-promise';
import { addMiddleware } from '../middlewares';

export {
  reduxPromise,
};

addMiddleware(reduxPromise);
