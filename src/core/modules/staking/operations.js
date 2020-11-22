// import modules from '..';
import stakingActions from './actions';
// import * as contractSelectors from './selectors';
// import { getTransactionCount } from '../transaction/operations';
// import { navigate, Routes } from 'core/navigation';
// import { Logger } from 'core/utils/logger';
import { getWallet } from '../wallet/selectors';
import { StakingService } from 'blockchain/services/staking-service';

const operations = {
  ...stakingActions,
	fetchStakeOperation: () => async (dispatch, getState) => {
		const wallet = getWallet(getState());
		const stake = await StakingService.getInstance().fetchStake(wallet.id);

		await dispatch(
			stakingActions.setStakingAction({
				...stake,
				initialized: true
			})
		);
	}
};

export const stakingOperations = operations;

export default stakingOperations;