/** @flow */
const Web3 = require('web3');
const ProviderEngine = require('web3-provider-engine');
const FetchSubprovider = require('web3-provider-engine/subproviders/fetch');
import { abi as ABI } from '../contracts/selfkey-token.json';
import EthUnits from '../util/eth-units';
import EthUtils from '../util/eth-utils';

export const SERVER_CONFIG = {
	mew: {
		1: { url: 'https://api.myetherapi.com/eth' },
		3: { url: 'https://api.myetherapi.com/rop' }
	},
	infura: {
		1: { url: 'https://mainnet.infura.io/v3/2e5fb5cf42714929a7f61a1617ef1ffd' },
		3: { url: 'https://ropsten.infura.io/v3/2e5fb5cf42714929a7f61a1617ef1ffd' }
	}
};

// TODO: Create config file
export const SELECTED_SERVER_URL = SERVER_CONFIG['infura']['3'].url;

export class Web3Service {
  static _instance;

  constructor() {
    const engine = new ProviderEngine();
    engine.addProvider(new FetchSubprovider({ rpcUrl: SELECTED_SERVER_URL }));
    engine.start();

    this.web3 = new Web3(
      engine
    );
    this.contractABI = ABI;
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
		return EthUtils.getBalanceDecimal(balanceWei, decimals);
	}
}