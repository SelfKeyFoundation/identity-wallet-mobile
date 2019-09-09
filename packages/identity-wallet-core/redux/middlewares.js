import { applyMiddleware } from 'redux';
import reduxLogger from 'redux-logger';

const middlewares = [];

middlewares.push(reduxLogger);

export function getMiddlewareEnhancer() {
  return applyMiddleware(
    ...middlewares,
  );
}
