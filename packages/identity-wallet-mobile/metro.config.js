
/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');

const { getDefaultConfig } = require('metro-config');

// console.log(path.resolve(__dirname, "../../node_modules/react-redux"));

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  // console.log(sourceExts);

  return {
    watchFolders: [
      path.resolve(__dirname, "../../node_modules"),
      // path.resolve(__dirname, "../mobile-ui"),
      // path.resolve(__dirname, "../blockchain"),
      path.resolve(__dirname, "../configs"),
      // path.resolve(__dirname, "../wallet-core"),
      // path.resolve(__dirname, '../rjsf-native'),
      path.resolve(__dirname, '../rjsf-core'),
      // path.resolve(__dirname, "../mobile-ui/node_modules"),
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
      extraNodeModules: {
        'design-system': path.resolve(__dirname, "./src/design-system"),
        'core': path.resolve(__dirname, "./src/core"),
        'blockchain': path.resolve(__dirname, "./src/blockchain"),
        'rjsf-native': path.resolve(__dirname, "./src/rjsf-native"),
      }
    },
  };
})();