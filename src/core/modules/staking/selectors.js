import BN from 'bignumber.js';
import moment from 'moment';

export function selectStakingTree(state) {
  return state.staking;
}

export function selectStakingInfo(state) {
  const stakingInfo = selectStakingTree(state);
  const now = moment().utc();
  const canStake = stakingInfo.initialized;
  const canWithdrawReward = new BN(stakingInfo.rewardBalance).gt(0);
  const hasStaked = new BN(stakingInfo.stakeBalance).gt(0);
  const endDate = moment.utc(stakingInfo.timelockEnd || 0);
  let minStakeDate = null;
  let canWithdrawStake = false;

  if (!hasStaked && canStake) {
    minStakeDate = now.add(stakingInfo.minStakePeriod || 0).valueOf();
  }
  if (canStake && endDate) {
    minStakeDate = moment.max(now, endDate).valueOf();
  }

  if (hasStaked && endDate.isBefore(now)) {
    canWithdrawStake = true;
  }

  return {
    ...stakingInfo,
    hasStaked,
    canStake,
    canWithdrawStake,
    canWithdrawReward,
    minStakeDate
  };
}
