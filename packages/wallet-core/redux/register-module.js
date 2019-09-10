import { addReducer } from './reducers';
import { addSaga } from './sagas';

export function registerModule(name, { reducers, sagas }) {
  if (reducers) {
    addReducer(name, reducers);
  }

  if (sagas) {
    addSaga(sagas);
  }
}
