import contractTypes from './types';

export const appActions = {
  setContractsAction: payload => ({ type: contractTypes.CONTRACTS_SET, payload }),
  setAllowancesAction: payload => ({ type: contractTypes.CONTRACTS_ALLOWANCES_SET, payload }),
  setEditorAction: payload => ({ type: contractTypes.CONTRACT_ALLOWANCE_EDITOR_SET, payload }),
  updateEditorAction: payload => ({
    type: contractTypes.CONTRACT_ALLOWANCE_EDITOR_UPDATE,
    payload
  }),
  setOneAllowanceAction: payload => ({
    type: contractTypes.CONTRACTS_ALLOWANCES_SET_ONE,
    payload
  })
};

export default appActions;


