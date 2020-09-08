import reduxThunk from 'redux-thunk';
import { addMiddleware } from '../middlewares';

export {
  reduxThunk,
};

addMiddleware(reduxThunk);
