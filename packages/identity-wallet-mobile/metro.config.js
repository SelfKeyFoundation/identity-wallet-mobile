
/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

require('./link-workspaces.js');

// module.exports = {
//   watchFolders: [
//     path.resolve(__dirname, "../mobile-ui"),
//     path.resolve(__dirname, "../blockchain"),
//     path.resolve(__dirname, "../wallet-core"),
//     path.resolve(__dirname, "../../node_modules"),
//     path.resolve(__dirname, "../mobile-ui/node_modules"),
//     // path.resolve(__dirname, "./node_modules/styled-components/native"),
//   ],
//   resolver: {
//     // blacklistRE: blacklist([
//       // /mobile-ui\/node_modules\/react-native\/.*/,
//       // /mobile-ui\/.*\/node_modules\/react-native\/.*/
//     // ])
//   },
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   }
// };

const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    watchFolders: [
      path.resolve(__dirname, "../mobile-ui"),
      path.resolve(__dirname, "../blockchain"),
      path.resolve(__dirname, "../configs"),
      path.resolve(__dirname, "../wallet-core"),
      path.resolve(__dirname, "../../node_modules"),
      path.resolve(__dirname, "../mobile-ui/node_modules"),
      // path.resolve(__dirname, "./node_modules/styled-components/native"),
    ],
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();