module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'babel-plugin-styled-components',
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
