// const rules = require('./webpack.rules');

// rules.push({
//   test: /\.css$/,
//   use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
// });

// rules.push({
//   test: /\.css$/,
//   use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
// });
const glob = require('glob');
const webpack = require('webpack')
const deps = glob.sync('./node_modules/*');
const allDeps = {};
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isProduction = process.env.NODE_ENV == "production";
const stylesHandler = "style-loader";
const appDirectory = path.resolve(__dirname, './');


deps.forEach((dep) => {
  allDeps[dep.replace('./node_modules/', '')] = path.resolve(appDirectory, dep);
});


const babelLoaderConfiguration = {
  test: /\.js$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'web/polyfills'),
    // path.resolve(appDirectory, 'node_modules'),
    ...[
      'react-native-uncompiled',
      '@rjsf',
      'react-navigation-drawer',
      'react-native-swipe-list-view',
      'react-native-snap-carousel',
      'react-native-qrcode-svg',
      'react-native-picker-select',
      'react-native-qrcode-scanner',
      'react-native-paper',
      'react-native-vector-icons',
      'react-native-linear-gradient',
      'react-native-keychain',
      'react-native-fs',
      'react-native-camera',
      'react-native-datepicker',
      'react-native-permissions',
      'react-native-web',
      'styled-components',
      'react-native-svg',
      'react-navigation-tabs',
      '@react-navigation/core',
      '@react-navigation/native',
      'react-native-tab-view',
      'react-native-screens',
      'react-native-render-html',
      'react-native-modal-selector',
      'react-native-gesture-handler',
      'react-native-image-picker',
      'react-navigation-stack',
      'react-navigation-stack',
      'react-navigation'

    ].map(item => path.resolve(appDirectory, 'node_modules/' + item))

  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: ['module:metro-react-native-babel-preset'],
      // Re-write paths to import only the modules needed by the app
      plugins: ['react-native-web']
    }
  }
};


module.exports = {
  // Put your normal webpack config below here
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    new webpack.ProvidePlugin({
      process: "process/browser.js",
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      __DEV__: process.env.NODE_ENV !== 'production' || true,
    }),
    new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
      result.request = result.request.replace(/typeorm/, "typeorm/browser");
  }),
  ],
  module: {
    rules: [
      babelLoaderConfiguration,
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"]
      },
      {
        test: /\.svg/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(eot|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset"
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  },
  target: ['web'],
  resolve: {
    fullySpecified: false,
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web',
      "zlib": "browserify-zlib",
      "console": "console-browserify",
      "constants": "constants-browserify",
      "crypto": "crypto-browserify",
      "dns": "dns.js",
      "domain": "domain-browser",
      "http": "@tradle/react-native-http",
      "https": "https-browserify",
      "os": "react-native-os",
      "path": "path-browserify",
      "querystring": "querystring-es3",
      "fs": "react-native-level-fs",
      "_stream_transform": "readable-stream/transform",
      "_stream_readable": "readable-stream/readable",
      "_stream_writable": "readable-stream/writable",
      "_stream_duplex": "readable-stream/duplex",
      "_stream_passthrough": "readable-stream/passthrough",
      "dgram": "react-native-udp",
      "stream": "stream-browserify",
      "timers": "timers-browserify",
      "tty": "tty-browserify",
      "vm": "vm-browserify",
      "tls": false,
      "net": "react-native-tcp",
      'react-native-crypto': 'crypto-browserify',
      'design-system': path.resolve(appDirectory, './src/design-system'),
      core: path.resolve(appDirectory, './src/core'),
      blockchain: path.resolve(appDirectory, './src/blockchain'),
      screens: path.resolve(appDirectory, './src/screens'),
      configs: path.resolve(appDirectory, './src/configs'),
      'rjsf-native': path.resolve(appDirectory, './src/rjsf-native'),
      components: path.resolve(appDirectory, './src/components'),
      features: path.resolve(appDirectory, './src/features'),
      'rn-identity-vault': path.resolve(appDirectory, './src/rn-identity-vault'),
      'react-native-image-picker': path.resolve(appDirectory, './web/polyfills/react-native-image-picker.js'),
      'react-native-linear-gradient': path.resolve(appDirectory, './web/polyfills/react-native-linear-gradient.js'),
      'react-native-dark-mode': path.resolve(appDirectory, './web/polyfills/react-native-dark-mode.js'),
      'react-native-keychain': path.resolve(appDirectory, './web/polyfills/react-native-keychain.js'),
      'react-native-web/dist/index': path.resolve(appDirectory, './web/polyfills/react-native-web.js'),
      'react-native-vector-icons/index.js': path.resolve(appDirectory, './web/polyfills/react-native-vector-icons.js'),
      'react-native-permissions': path.resolve(appDirectory, './web/polyfills/react-native-permissions.js'),
      'react-native-camera': path.resolve(appDirectory, './web/polyfills/react-native-camera.js'),
      'react-native-splash-screen': path.resolve(appDirectory, './web/polyfills/react-native-splash-screen.js'),


      // TODO: create polyfill file
      'react-native-qrcode-scanner': path.resolve(appDirectory, './web/polyfills/react-native-camera.js'),
      'realm': path.resolve(appDirectory, './web/polyfills/react-native-camera.js'),
      'react-native-fs': path.resolve(appDirectory, './web/polyfills/react-native-camera.js'),
      'react-native-svg': path.resolve(appDirectory, './web/polyfills/react-native-camera.js'),


      // 'react-native-gesture-handler': path.resolve(appDirectory, './web/polyfills/react-native-camera.js'),
      // '@react-native-async-storage/async-storage': path.resolve(appDirectory, './web/polyfills/react-native-async-storage.js'),
      // 'asyncstorage-down': path.resolve(appDirectory, './web/polyfills/react-native-async-storage.js'),

      
      // process: "process/browser"
      // ...allDeps,

    },
    // mainFields: ['module', 'main', 'index'],
    // symlinks: true,
    modules: [
      'node_modules',
      path.resolve(appDirectory, './node_modules')
    ],

    // If yo-u're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: [
      '.web.mjs',
      '.mjs',
      '.web.js',
      '.js',
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.json',
      '.web.jsx',
      '.jsx',
    ]
  }
};
