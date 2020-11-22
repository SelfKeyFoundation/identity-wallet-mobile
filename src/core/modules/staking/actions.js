import stakingTypes from './types';

export const stakingActions = {
  setStakingAction: payload => ({ type: stakingTypes.STAKING_SET, payload }),
};

export default stakingActions;


