import { navigate, Routes } from 'core/navigation';
import { EthGasStationService } from 'blockchain/services/eth-gas-station-service';
import actions from './actions';
import duck from './index';

export const operations = {
  loadDataOperation: () => async (dispatch, getState) => {
    try {
      const data = await EthGasStationService.getInstance().getInfo();
      await dispatch(actions.updateData(data));
    } catch(err) {
      console.error(err);
    }
    // await dispatch(transactionOperations.setTransactionFee());
  }
}

export const ethGasStationOperations = {
  ...actions,
  ...operations,
};

export default ethGasStationOperations;
