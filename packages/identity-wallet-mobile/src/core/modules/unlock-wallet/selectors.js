// @flow
export function getRoot(state) {
  return state.unlockWallet;
}

export function getErrors(state) {
  return getRoot(state).errors;
}
