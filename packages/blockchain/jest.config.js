module.exports = {
  // 'preset': 'react-native',
  'setupFiles': [
    '<rootDir>/tests/setup.js',
  ],
  'modulePaths': [
    '<rootDir>',
  ],
  'collectCoverageFrom': [
    'lib/**/*.{js,jsx}',
  ],
};
