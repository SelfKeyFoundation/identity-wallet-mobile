const { spawnSync } = require('child_process');
const path = require('path');
const argv = require('yargs').argv;

const { platform } = argv;

console.log(`Running build for ${platform}`);

// Fix dependencies
spawnSync('sh', ['./fixdeps.sh'], {
  stdio: 'inherit',
});

if (platform === 'android') {
  spawnSync('sh', ['./build-android.sh'], {
    stdio: 'inherit',
    cwd: path.resolve('./packages/identity-wallet-mobile')
  });
} else if (platform === 'ios') {
  throw 'Unsupported operation';
}
