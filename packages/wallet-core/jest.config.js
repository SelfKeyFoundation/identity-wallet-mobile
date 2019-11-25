module.exports = {
  // 'preset': 'react-native',
  'setupFiles': [
    '<rootDir>/tests/setup.js',
  ],
  'verbose': true,
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
