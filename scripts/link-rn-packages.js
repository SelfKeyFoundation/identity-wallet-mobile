const findRoot = require('find-root');
const fs = require('fs-extra');
const path = require('path');

const link = (name, fromBase, toBase) => {
  const from = path.join(fromBase, 'node_modules', name);
  const to = path.join(toBase, 'node_modules', name);
  
  if (fs.existsSync(to)) {
    fs.removeSync(to);
  }

  try {
    fs.symlinkSync(from, to, 'dir');
  } catch(err) {}
};

module.exports = function makeSymlinks(from) {
  const root = findRoot(from, dir => {
    const pkg = path.join(dir, 'package.json');
    return fs.existsSync(pkg) && 'workspaces' in require(pkg);
  });

  link('react', root, from);
  // ln -s /Users/maycon/dev/selfkey/Identity-Wallet-Mobile/node_modules/jsc-android /Users/maycon/dev/selfkey/Identity-Wallet-Mobile/packages/identity-wallet-mobile/node_modules/jsc-android
  link('jsc-android', root, from);
  // ln -s /Users/maycon/dev/selfkey/Identity-Wallet-Mobile/node_modules/hermesvm /Users/maycon/dev/selfkey/Identity-Wallet-Mobile/packages/identity-wallet-mobile/node_modules/hermesvm
  link('hermesvm', root, from);
  link('react-native', root, from);
  link('@react-native-community', root, from);
};