
/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

require('./link-workspaces.js');

module.exports = {
  watchFolders: [
    path.resolve(__dirname, "../mobile-ui"),
    path.resolve(__dirname, "../blockchain"),
    path.resolve(__dirname, "../wallet-core"),
    path.resolve(__dirname, "../../node_modules"),
    path.resolve(__dirname, "../mobile-ui/node_modules"),
    // path.resolve(__dirname, "./node_modules/styled-components/native"),
  ],
  resolver: {
    // blacklistRE: blacklist([
      // /mobile-ui\/node_modules\/react-native\/.*/,
      // /mobile-ui\/.*\/node_modules\/react-native\/.*/
    // ])
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  }
};
