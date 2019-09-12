import reduxLogger from 'redux-logger';
import { addMiddleware } from '../middlewares';

export {
  reduxLogger,
};

addMiddleware(reduxLogger);
