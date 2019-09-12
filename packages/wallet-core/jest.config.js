module.exports = {
  // 'preset': 'react-native',
  'setupFiles': [
    '<rootDir>/tests/setup.js',
  ],
  'modulePaths': [
    '<rootDir>',
  ],
  // 'transform': {
  //   '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  // },
  // 'transformIgnorePatterns': [
  //   'node_modules',
  // ],
  'collectCoverageFrom': [
    'lib/**/*.{js,jsx}',
  ],
};
