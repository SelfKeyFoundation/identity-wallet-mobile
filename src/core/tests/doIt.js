import path from 'path';

require('@babel/register')({
	// Find babel.config.js up the folder structure.
	rootMode: 'upward',

	// Since babel ignores all files outside the cwd, it does not compile sibling packages
	// So rewrite the ignore list to only include node_modules
  ignore: [/node_modules/],
  

	plugins: [
    [
		require.resolve('babel-plugin-module-resolver'),
      {
        // root: path.resolve('./src'),
        alias: {
          'design-system': path.resolve('./src', './design-system'),
          core: path.resolve('./src', './core'),
          blockchain: path.resolve('./src', './blockchain'),
          screens: path.resolve('./src', './screens'),
          configs: path.resolve('./src', './configs'),
          'rjsf-native': path.resolve('./src', './rjsf-native'),
          components: path.resolve('./src', './components'),
          'rn-identity-vault': path.resolve('./src', './rn-identity-vault'),
        },
      },
    ]
	],
});

require('./transaction-test');
// require('./tx-history-service-test');
