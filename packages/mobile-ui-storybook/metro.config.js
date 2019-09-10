/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');

module.exports = {
  watchFolders: [
    path.resolve(__dirname, "../mobile-ui"),
    path.resolve(__dirname, "../blockchain"),
    path.resolve(__dirname, "../wallet-core"),
    path.resolve(__dirname, "../../node_modules"),
    path.resolve(__dirname, "./storybook"),
  ],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  }
};
