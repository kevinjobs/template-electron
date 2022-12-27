const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

function htmlPlugin() {
  return new HtmlWebpackPlugin({
    template: `${path.join(__dirname, "../public")}/index.html`
  });
}

function reactRefreshPlugin() {
  return new ReactRefreshWebpackPlugin();
}

module.exports = {
  htmlPlugin,
  reactRefreshPlugin,
}