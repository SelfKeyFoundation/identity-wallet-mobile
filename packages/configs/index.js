let currentEnv = 'dev';

const Configs = {
  dev: {
    chainId: 3,
    etherscanUrl: 'https://ropsten.etherscan.io',
    rpcUrl: 'https://ropsten.infura.io/v3/2e5fb5cf42714929a7f61a1617ef1ffd',
    primaryToken: 'KI',
  },
  prod: {
    chainId: 1,
    etherscanUrl: 'https://etherscan.io',
    rpcUrl: 'https://mainnet.infura.io/v3/2e5fb5cf42714929a7f61a1617ef1ffd',
    primaryToken: 'KEY',
  }
}

export function setEnv(env) {
  currentEnv = env;
}

export function getConfigs() {
  return Configs[currentEnv];
}
