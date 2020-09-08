/** @flow */
const Web3 = require('web3');
const ProviderEngine = require('web3-provider-engine');
const FetchSubprovider = require('web3-provider-engine/subproviders/fetch');
import HookedWalletEthTxSubprovider from 'web3-provider-engine/subproviders/hooked-wallet-ethtx';
import { AsyncTaskQueue } from '../util/async-task-queue';
import { abi as ABI } from '../contracts/selfkey-token.json';
import EthUnits from '../util/eth-units';
import EthUtils from '../util/eth-utils';
import { getConfigs } from '@selfkey/configs';
export const REQUEST_INTERVAL_DELAY = 500;

export class Web3Service {
	static _instance;
	web3: Web3;

  constructor() {
		const engine = new ProviderEngine();
		engine.addProvider(this.getWalletEthTxSubprovider());
		engine.addProvider(new FetchSubprovider({ rpcUrl: getConfigs().rpcUrl }));
    engine.start();

    this.web3 = new Web3(
      engine
		);
		this.web3.transactionConfirmationBlocks = 1;
    this.contractABI = ABI;
    this.q = new AsyncTaskQueue(this.handleTicket.bind(this), REQUEST_INTERVAL_DELAY);
  }

	getWalletEthTxSubprovider() {
		return new HookedWalletEthTxSubprovider({
			getAccounts: callback => {
				console.log(this.web3.eth.defaultAccount);
				callback(null, [this.web3.eth.defaultAccount]);
			},
			getPrivateKey: (address, callback) => {
				if (address.toLowerCase() === this.web3.eth.defaultAccount.toLowerCase()) {
					return callback(
						null,
						Buffer.from(
							this.web3.eth.accounts.wallet[address].privateKey.replace('0x', ''),
							'hex'
						)
					);
				}
				return callback(new Error('not private key supplied for that account'));
			}
		});
	}
	
	privateKeyToAccount(privateKey) {
		return this.web3.eth.accounts.privateKeyToAccount(privateKey);
	}

	setDefaultAccount(account) {
		this.web3.eth.accounts.wallet.add(account);
		this.setDefaultAddress(account.address);
	}

	setDefaultAddress(address) {
		this.web3.eth.defaultAccount = address;
	}

  setWallet(wallet: Wallet) {
    this.wallet = wallet;
  }

  isReady() {
    return this.web3.eth.net.isListening();
  }

  async getBalanceByAddess(address) {
		const balanceInWei = await this.web3.eth.getBalance(address);
		return EthUnits.toEther(balanceInWei, 'wei');
  }

  static getInstance(): Web3Service {
    if (!Web3Service._instance) {
      Web3Service._instance = new Web3Service();
    }

    return Web3Service._instance;
  }

  // TODO use the test ABI when in dev mode
	async getTokenBalance(contractAddress, address) {
		const tokenContract = new this.web3.eth.Contract(
			this.contractABI,
			contractAddress
    );

		const balanceWei = await tokenContract.methods.balanceOf(address).call();
		const decimals = await tokenContract.methods.decimals().call();

		const balance = EthUtils.getBalanceDecimal(balanceWei || 0, decimals);

		return balance;
  }
  
  waitForTicket(args) {
		return new Promise(async (resolve, reject) => {
			try {
        let res = await this.q.push(args);
        console.log('wait for ticket response', res);
				let ticketPromise = res.ticketPromise;
				if (!ticketPromise) {
					return reject(new Error('Failed to process ticket'));
				}

				ticketPromise.catch(err => {
					this.nonce = 0;
					reject(err);
				});

				if (args.onceListenerName) {
					ticketPromise.once(args.onceListenerName, res => {
						resolve(res);
					});
				} else {
					ticketPromise.then(res => {
						resolve(res);
					});
				}
			} catch (error) {
				reject(error);
			}
		});
  }

	getTransaction(hash) {
		return this.waitForTicket({
			method: 'getTransaction',
			args: [hash]
		});
	}

  getTransactionReceipt(hash) {
		return this.waitForTicket({
			method: 'getTransactionReceipt',
			args: [hash]
		});
  }

  async handleTicket(data) {
		// log.debug('handle ticket %2j', data);
		const {
			contractAddress,
			contractMethod,
			method,
			customWeb3,
			customAbi,
			contractMethodArgs = [],
			wallet = null,
			args = []
		} = data;
		const { Contract } = this.web3.eth;
		const web3 = customWeb3 || this.web3;
		let contract = web3.eth;
		if (args[0]) {
			if (args[0].gas && typeof args[0].gas === 'number') {
				args[0].gas = Math.round(args[0].gas);
			}
			if (args[0].gasPrice && typeof args[0].gasPrice === 'number') {
				args[0].gasPrice = Math.round(args[0].gasPrice);
			}
		}
		if (contractAddress) {
			contract = new Contract(customAbi || ABI, contractAddress);
			if (contractMethod) {
				contract = contract.methods[contractMethod](...contractMethodArgs);
			}
		}
		if (method === 'send') {
			// return {
			// 	...(await this.sendSignedTransaction(contract, contractAddress, args, wallet))
			// };
    }
    console.log('#mzm ticket promise' );

		return { ticketPromise: contract[method](...args) };
	}
}