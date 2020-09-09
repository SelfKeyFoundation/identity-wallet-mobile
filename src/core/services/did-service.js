// import { getGlobalContext } from 'common/context';
import { abi as ledgerABI } from './DIDLedger.json';
import { getConfigs } from 'configs';
import { Web3Service } from 'blockchain/services/web3-service';

export class DIDService {
  static _instance: DIDService;

	constructor() {
		this.web3Service = Web3Service.getInstance();
		this.zero = this.web3Service.web3.utils.hexToBytes(
			'0x0000000000000000000000000000000000000000000000000000000000000000'
		);
	}

	createDID(walletAddress, gas) {
		const ledger = new this.web3Service.web3.eth.Contract(ledgerABI, getConfigs().ledgerAddress);
		this.web3Service.web3.transactionConfirmationBlocks = 2;
		return ledger.methods.createDID(this.zero).send({ from: walletAddress, gas });
	}

	async getControllerAddress(did) {
		const ledger = new this.web3Service.web3.eth.Contract(ledgerABI, getConfigs().ledgerAddress);

		return ledger.methods.getController(did.replace('did:selfkey:', '')).call();
	}

	async getGasLimit(from) {
		const ledger = new this.web3Service.web3.eth.Contract(ledgerABI, getConfigs().ledgerAddress);
		const MAX_GAS = 4500000;
		const estimate = await ledger.methods.createDID(this.zero).estimateGas({ from });
		return Math.round(Math.min(estimate * 1.1, MAX_GAS));
  }
  
  static getInstance(): DIDService {
    if (!DIDService._instance) {
      DIDService._instance = new DIDService();
    }

    return DIDService._instance;
  }
}

