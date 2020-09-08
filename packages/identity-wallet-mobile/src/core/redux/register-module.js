import { addReducer } from './reducers';

export function registerModule(name, { reducer }) {
  if (reducer) {
    addReducer(name, reducer);
  }
}
