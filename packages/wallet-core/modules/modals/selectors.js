// @flow
export const getRoot = state => state.modals;

export const getCurrentModal = (state) => {
  const { modalId, params } = getRoot(state);

  return {
    modalId,
    params,
  };
};
