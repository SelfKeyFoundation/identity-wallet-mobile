
import { createReducer } from '../../redux/reducers';
import stakingTypes from './types';

export const initialState = {
  stakeBalance: '0',
	rewardBalance: '0',
	timelockStart: null,
	timelockEnd: null,
	initialized: false,
	minStakePeriod: null,
	minStakeAmount: '0'
};


export const stakingReducers = {
  setStakeReducer: (state, { payload }) => {
		return { ...payload };
	}
};

const reducersMap = {
  [stakingTypes.STAKING_SET]: stakingReducers.setStakeReducer,
};

export default createReducer(initialState, reducersMap);
