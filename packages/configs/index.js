
const configListeners = [];
let currentEnv = 'prod';

const CONFIGS = {
  dev: {
    chainId: 3,
    etherscanUrl: 'https://ropsten.etherscan.io',
    rpcUrl: 'https://ropsten.infura.io/v3/2e5fb5cf42714929a7f61a1617ef1ffd',
    primaryToken: 'KI',
    matomoUrl: 'https://analytics.selfkey.org/matomo.php',
    matomoSiteId: 3,
    flags: {
      importFromDesktop: true,
      importFromMnemonic: false,
    }
  },
  prod: {
    chainId: 1,
    etherscanUrl: 'https://etherscan.io',
    rpcUrl: 'https://mainnet.infura.io/v3/2e5fb5cf42714929a7f61a1617ef1ffd',
    primaryToken: 'KEY',
    matomoUrl: 'https://analytics.selfkey.org/matomo.php',
    matomoSiteId: 3,
    flags: {
      importFromDesktop: true,
      importFromMnemonic: false,
    }
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
