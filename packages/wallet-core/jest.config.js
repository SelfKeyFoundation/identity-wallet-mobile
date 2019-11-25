module.exports = {
  // 'preset': 'react-native',
  'setupFiles': [
    '<rootDir>/tests/setup.js',
  ],
  'verbose': true,
  'globalSetup': '<rootDir>/tests/global-setup.js',
  'globalTeardown': '<rootDir>/tests/teardown.js',
  // 'testEnvironment': '<rootDir>/tests/wallet-environment.js',
  'modulePaths': [
    '<rootDir>',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/before-all.js'],
  // 'transform': {
  //   '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  // },
  // 'transformIgnorePatterns': [
  //   'node_modules/(?!(jest-environment-node)/)',
  // ],
  'collectCoverageFrom': [
    'lib/**/*.{js,jsx}',
  ],
};
