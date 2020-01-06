import sinon from 'sinon';
import TxHistoryService from './tx-history-service';
import { Web3Service } from '@selfkey/blockchain/services/web3-service';
import { TxHistoryModel } from '@selfkey/wallet-core/models/index';

const web3Service = Web3Service.getInstance();
const txHistoryModel = TxHistoryModel.getInstance();

describe('TxHistoryServicve', () => {
	let _state = {};
  let txHistoryService;
	beforeEach(() => {
    sinon.restore();
    
    txHistoryService = new TxHistoryService({ web3Service, txHistoryModel });
	});

	it('expect to create instance', async () => {
    await txHistoryService.syncByWallet('0xDF8e950e8b90bA07Cc104C70BA28E5812f75A042', null);


    const txItems = txHistoryModel.findAll();

    console.log(txItems);

  });
});
