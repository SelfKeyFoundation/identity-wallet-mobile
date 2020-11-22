import { ERC20Token } from 'blockchain/erc20-token';
import { Web3Service } from 'blockchain/services/web3-service';
import { ContractAllowanceModel, WalletModel } from 'core/models';
import { Logger } from 'core/utils/logger';

const log = new Logger('ContractAllowanceService');

export class ContractAllowanceService {
	constructor({ web3Service }) {
		this.web3Service = web3Service;
	}

	static getInstance(): ContractAllowanceService {
    if (!ContractAllowanceService._instance) {
      ContractAllowanceService._instance = new ContractAllowanceService({
        web3Service: Web3Service.getInstance(),
      });
    }

    return ContractAllowanceService._instance;
	}

	createContractAllowance(walletId, contractAddress, tokenAddress, tokenDecimals) {
		return ContractAllowanceModel.getInstance().create({
			walletId,
			contractAddress,
			tokenAddress,
			tokenDecimals,
		});
	}

	async fetchContractAllowance(ownerAddress, tokenAddress, contractAddress, tokenDecimals) {
		const token = new ERC20Token(tokenAddress, this.web3Service, tokenDecimals);
		const allowance = await token.getAllowance(ownerAddress, contractAddress, {
			from: ownerAddress,
		});
		return allowance;
	}

	async loadContractAllowances(walletId) {
		const wallet = await WalletModel.getInstance().findById(walletId);

		let allowances = await ContractAllowanceModel.getInstance().findAll({ walletId });
		return Promise.all(
			allowances.map(async a => {
				try {
					const allowanceAmount = await this.fetchContractAllowance(
						wallet.address,
						a.tokenAddress,
						a.contractAddress,
						a.tokenDecimals,
					);
					return { ...a, allowanceAmount };
				} catch (error) {
					log.error(error);
					return a;
				}
			}),
		);
	}

	async loadContractAllowanceById(id) {
		const allowance = await ContractAllowanceModel.getInstance().findById(id);
		const wallet = await WalletModel.getInstance().findById(allowance.walletId);

		try {
			allowance.allowanceAmount = await this.fetchContractAllowance(
				wallet.address,
				allowance.tokenAddress,
				allowance.contractAddress,
				allowance.tokenDecimals,
			);
		} catch (error) {
			log.error(error);
		}

		return allowance;
	}

	updateContractAllowanceById(id, update) {
		return ContractAllowanceModel.getInstance().updateById(id, update);
	}

	updateContractAllowanceAmount(tokenAddress, contractAddress, amount, tokenDecimals, options) {
		const token = new ERC20Token(tokenAddress, this.web3Service, tokenDecimals);
		return token.approve(contractAddress, amount, options);
	}
}

export default ContractAllowanceService;
