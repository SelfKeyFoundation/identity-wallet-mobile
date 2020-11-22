module.exports = {
  'preset': 'react-native',
  'setupFiles': [
    '<rootDir>/tests/setup.js',
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  'setupFilesAfterEnv': ['<rootDir>/tests/before-all.js'],
  'modulePaths': [
    '<rootDir>/src/',
  ],
  'transform': {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '^.+\\.svg$': '<rootDir>/tests/svg-transformer.js',
  },
  'transformIgnorePatterns': [
    'node_modules/(?!(react-native-paper|react-native-snap-carousel|react-native-fabric|react-native-gesture-handler|react-navigation-stack|react-native|react-native-modal|@react-navigation|react-native-cached-image|concat-color-matrices|rn-color-matrices|react-native-touch-id|react-native-color-matrix-image-filters|react-native-htmlview|react-native-video|react-native-shadow|react-native-background-timer|react-native-share|react-native-communications|react-native-qrcode|react-native-gifted-chat|react-native-svg|@expo/react-native-action-sheet|react-native-parsed-text|react-native-camera|react-native-intercom|react-native-firebase|react-native-animatable|react-native-vector-icons|react-native-linear-gradient|react-native-invertible-scroll-view|react-native-screens|react-native-scrollable-mixin|react-native-device-info|react-native-lightbox|react-native-keyboard-aware-scroll-view|react-navigation|react-native-safe-area-view|native-base-shoutem-theme|react-native-easy-grid|react-native-drawer|react-native-scrypt|react|pouchdb-react-native|react-navigation-redux-helpers|pouchdb-core|pouchdb-adapter-asyncstorage|react-native-maps|react-native-iphone-x-helper|tcomb-form-native|react-navigation-tabs|native-base|react-native-sentry|react-native-image-crop-picker|react-navigation-fluid-transitions|react-native-qrcode-svg|react-native-extra-dimensions-android|react-native-cached-image|react-native-emoji|react-native-collapsible|react-native-webview)/)',
  ],
  'collectCoverageFrom': [
    'src/**/*.{js,jsx}',
  ],
};
