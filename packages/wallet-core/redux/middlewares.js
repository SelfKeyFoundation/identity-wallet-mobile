import { applyMiddleware } from 'redux';

export const middlewares = [];

export function addMiddleware(mw) {
  middlewares.push(mw);
}

export function getMiddlewareEnhancer() {
  return applyMiddleware(
    ...middlewares,
  );
}
