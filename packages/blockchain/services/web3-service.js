/** @flow */
const Web3 = require('web3');
const ProviderEngine = require('web3-provider-engine');
const FetchSubprovider = require('web3-provider-engine/subproviders/fetch');

const SELECTED_SERVER_URL = 'https://ropsten.infura.io/v3/2e5fb5cf42714929a7f61a1617ef1ffd';

export class Web3Service {
  constructor() {
    const engine = new ProviderEngine();
    engine.addProvider(new FetchSubprovider({ rpcUrl: SELECTED_SERVER_URL }));
    engine.start();

    this.web3 = new Web3(
      engine
    );
  }

  setWallet(wallet: Wallet) {
    this.wallet = wallet;
  }

  isReady() {
    return this.web3.eth.net.isListening();
  }
}