const path = require('path');
const getConfig = require('metro-bundler-config-yarn-workspaces');

const options = { 
  nodeModules: path.resolve(__dirname, '..', '..'),
}

moodule.exports = getConfig(__dirname, options);