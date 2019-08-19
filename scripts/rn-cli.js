const { spawnSync } = require('child_process');
const path = require('path');
// const Util = require('./link-rn-packages');

// Util.makeSymlinks(path.resolve('./packages/identity-wallet-mobile'), __dirname);

spawnSync(path.resolve('./node_modules/.bin/react-native'), process.argv.slice(2), {
  stdio: 'inherit',
  cwd: path.resolve('./packages/identity-wallet-mobile')
});
