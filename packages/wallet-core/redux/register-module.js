import { addReducer } from './reducers';
import { addSaga } from './sagas';
import modules from '../modules';

export function registerModule({ reducers, sagas }) {
  addReducer(reducers);
  addSaga(sagas);
}
