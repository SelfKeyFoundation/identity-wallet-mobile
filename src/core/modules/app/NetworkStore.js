import { getUserPreferences, updateUserPreferences } from "core/Storage";

export const NetworkMapping = {
  1: {
    id: 1,
		name: 'Ethereum Mainnet',
		symbol: 'ETH',
		tokenName: 'Ethereum',
		tokenDecimal: 10,
		rpcUrl: 'https://mainnet.infura.io/v3/2e5fb5cf42714929a7f61a1617ef1ffd',
		blockExplorer: 'https://etherscan.io',
		blockExplorerName: 'Etherscan',
		blockExplorerApi: 'https://api.etherscan.io/api',
		blockExplorerApiKey: 'Y559IXGJE6MS2QCHK1PAQJS3Q92E893T16',
		featureFlags: {
			marketplaces: true,
			keyToken: true,
		}
	},
	56: {
    id: 56,
		name: 'Smart Chain',
		symbol: 'BNB',
		tokenName: 'Binance Coin',
		tokenDecimal: 10,
		rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
		blockExplorer: 'https://bscscan.com',
		blockExplorerName: 'BscScan',
		blockExplorerApi: 'http://api.bscscan.com/api',
		blockExplorerApiKey: 'RCCHESAP34XP28GND845GFV1GKEFUUNBFI',
		featureFlags: {
			marketplaces: false,
			keyToken: false,
		}
	},
	3: {
    id: 3,
		name: 'Ropsten Test Network',
		hidden: true,
		symbol: 'ETH',
		tokenName: 'Ethereum',
		tokenDecimal: 10,
		rpcUrl: 'https://ropsten.infura.io/v3/2e5fb5cf42714929a7f61a1617ef1ffd',
		blockExplorer: 'https://ropsten.etherscan.io',
		blockExplorerName: 'Etherscan',
		blockExplorerApi: 'http://api-ropsten.etherscan.io/api',
		blockExplorerApiKey: 'Y559IXGJE6MS2QCHK1PAQJS3Q92E893T16',
		featureFlags: {
			marketplaces: true,
			keyToken: true,
		}
	},
	97: {
    id: 97,
		name: 'Smart Chain - Testnet',
		symbol: 'BNB',
		tokenName: 'Binance Coin',
		tokenDecimal: 10,
		rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
		blockExplorer: 'https://testnet.bscscan.com',
		blockExplorerName: 'BscScan',
		blockExplorerApi: 'https://api-testnet.bscscan.com/api',
		blockExplorerApiKey: 'D5P1IFR4IXTS11J3YB7SG9Q8VESP83ECAG',
		featureFlags: {
			marketplaces: false,
			keyToken: false,
		}
	},
};

let network = NetworkMapping[1];

export const NetworkStore = {
  getNetwork() {
    return network;
  },
	
	async load() {
		const preferences = await getUserPreferences();
		
		if (preferences.networkId) {
			if (!network || (network.id !== preferences.networkId)) {
				this.setNetwork(preferences.networkId);
			}
		}
	},

  setNetwork(id) {
		console.log('#### NETWORK SWITCH #######');
		console.log(id);
    network = NetworkMapping[id];
		
		if (!network) {
			return;
		}

		updateUserPreferences({
			networkId: id,
		});
  }
}