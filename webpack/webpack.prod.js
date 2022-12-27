const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const { jsRules } = require('./rules');

const srcPath = path.join(__dirname, '../src/renderer');

module.exports = merge(baseConfig, {
  mode: 'production',
  module: {
    rules: [
      jsRules(srcPath),
    ]
  }
})