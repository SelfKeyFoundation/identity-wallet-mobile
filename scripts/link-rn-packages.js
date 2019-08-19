const fs = require('fs-extra');
const { exec } = require('child_process');
const path = require('path');

const packagesToLink = ['react', 'jsc-android', 'hermesvm', 'react-native', '@react-native-community'];

const link = (name, fromBase, toBase) => {
  const from = path.join(path.resolve(fromBase), 'node_modules', name);
  const to = path.join(path.resolve(toBase), 'node_modules', name);
  
  // if (fs.existsSync(to)) {
  //   fs.removeSync(to);
  // }

  console.log(`ln -s ${from} ${to}`);

  try {
    // fs.symlinkSync(from, to, 'dir');
    exec(`ln -s ${from} ${to}`, function(err) {
      console.log(err);
    });
    // ln -s /Users/maycon/dev/selfkey/Identity-Wallet-Mobile/node_modules/jsc-android /Users/maycon/dev/selfkey/Identity-Wallet-Mobile/packages/identity-wallet-mobile/node_modules/jsc-android
    // console.log('symlink', from, to);
  } catch(err) {
    // console.log(err);
  }
};

const removeLink = (name, fromBase, toBase) => {
  const from = path.join(fromBase, 'node_modules', name);
  const to = path.join(toBase, 'node_modules', name);
  
  // if (fs.existsSync(to)) {
    // fs.removeSync(to);
  exec(`rm -rf ${to}`, function(err) {
    console.log(err);
  });
  
};


const Utils = {
  makeSymlinks(from, root) {
    packagesToLink.map(pkgName => link(pkgName, root, from));
  },

  removeSymlinks(from, root) {
    packagesToLink.map(pkgName => removeLink(pkgName, root, from));
  }
};

module.exports = Utils;