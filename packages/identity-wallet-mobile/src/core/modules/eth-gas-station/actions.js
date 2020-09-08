import types from './types';

export const ethGasStationActions = {
  updateData: (data) => ({
    type: types.UPDATE_DATA,
    payload: data,
  }),
};

export default ethGasStationActions;
