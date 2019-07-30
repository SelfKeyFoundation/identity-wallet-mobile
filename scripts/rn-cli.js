const { spawnSync } = require('child_process');
const linkRnPackages = require('./link-rn-packages');

linkRnPackages(__dirname + '/packages/identity-wallet-mobile');

spawnSync('./node_modules/.bin/react-native', process.argv.slice(2), {
  stdio: 'inherit',
  cwd: './packages/identity-wallet-mobile'
});
