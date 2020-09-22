
const configListeners = [];
let currentEnv = 'prod';

const CONFIGS = {
  dev: {
    isDev: true,
    did: true,
    chainId: 3,
    etherscanUrl: 'https://ropsten.etherscan.io',
    rpcUrl: 'https://ropsten.infura.io/v3/2e5fb5cf42714929a7f61a1617ef1ffd',
    primaryToken: 'KI',
    matomoUrl: 'https://analytics.selfkey.org/matomo.php',
    matomoSiteId: 3,
  	ledgerAddress: '0x27332286A2CEaE458b82A1235f7E2a3Aa8945cAB',
    flags: {
      importFromDesktop: true,
      importFromMnemonic: false,
    },
    kyccUrlOverride: 'https://dev.instance.kyc-chain.com/api/v2/',
  },
  prod: {
    did: true,
    chainId: 1,
    etherscanUrl: 'https://etherscan.io',
    rpcUrl: 'https://mainnet.infura.io/v3/2e5fb5cf42714929a7f61a1617ef1ffd',
    primaryToken: 'KEY',
    matomoUrl: 'https://analytics.selfkey.org/matomo.php',
    matomoSiteId: 4,
  	ledgerAddress: '0x0cb853331293d689c95187190e09bb46cb4e533e',
    flags: {
      importFromDesktop: true,
      importFromMnemonic: false,
    },
    kyccUrlOverride: 'https://dev.instance.kyc-chain.com/api/v2/',
  }
}

function notifyListeners() {
  const configs = getConfigs();
  configListeners.forEach(callback => callback.apply(null, [configs]));
}

export function setEnv(env) {
  currentEnv = env;
  notifyListeners();
}

export function onConfigChange(listener) {
  configListeners.push(listener);
}

export function getConfigs() {
  return CONFIGS[currentEnv];
}

export function getCurrentEnv() {
  return currentEnv;
}
