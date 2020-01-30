
import { createReducer } from '../../redux/reducers';
import types from './types';

export const initialState = {
  modalId: null,
  params: null,
};

function showModalReducer(state, action) {
  const { id, params } = action.payload;

  return {
    ...state,
    modalId: id,
    params: params,
  };
}

function hideModalReducer(state, action) {
  return {
    ...state,
    modalId: null,
    params: null,
  };
}

export const modalReducers = {
  showModalReducer,
  hideModalReducer,
};

const reducersMap = {
  [types.SHOW_MODAL]: modalReducers.showModalReducer,
  [types.HIDE_MODAL]: modalReducers.hideModalReducer,
};

export default createReducer(initialState, reducersMap);
