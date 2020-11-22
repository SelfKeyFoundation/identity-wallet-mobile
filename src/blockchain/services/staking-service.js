import moment from 'moment';
import BN from 'bignumber.js';
import { TokenModel, WalletModel } from 'core/models';
import { ContractService } from 'core/services/contract-service';
import { Web3Service } from './web3-service';
import { getConfigs } from 'configs';

export class StakingService {
	constructor({ contractService, web3Service }) {
		this.contractService = contractService;
		this.web3Service = web3Service;
  }

	async fetchStake(walletId) {
		let contracts = await this.contractService.findByType('staking');
		contracts = contracts.filter(c => !c.deprecated);
		if (!contracts.length) {
			return null;
		}

		const contractInfo = contracts[0];

		const contract = new this.web3Service.web3.eth.Contract(
			contractInfo.abi,
			contractInfo.address
		);

		const wallet = await WalletModel.getInstance().findById(walletId);
		const [token] = await TokenModel.getInstance().findBySymbol(getConfigs().primaryToken);

		const keyBalance = await contract.methods
			.balances(token.address, wallet.address)
			.call({ from: wallet.address });

		const timelockEnd = await contract.methods
			.timelocks(token.address, wallet.address)
			.call({ from: wallet.address });

		const timelockStart = moment()
			.utc()
			.valueOf();

		const stakeBalance = new BN(keyBalance).div(new BN(10).pow(token.decimal)).toString();

		return {
			stakeBalance: stakeBalance,
			rewardBalance: '8000',
			timelockStart,
			timelockEnd,
			minStakeAmount: '10000'
		};
  }
  
  static getInstance(): StakingService {
    if (!StakingService._instance) {
      StakingService._instance = new StakingService({
        contractService: ContractService.getInstance(),
        web3Service: Web3Service.getInstance(),
      });
    }

    return StakingService._instance;
  }
}
