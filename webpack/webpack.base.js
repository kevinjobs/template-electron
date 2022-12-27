/*
 * @Author       : Kevin Jobs
 * @Date         : 2022-05-09 20:48:40
 * @LastEditTime : 2022-06-09 00:10:24
 * @lastEditors  : Kevin Jobs
 * @FilePath     : \react-electron-typescript\webpack\webpack.base.js
 * @Description  : 
 */
const path = require('path');
const { lessLoader } = require('./rules');
const { htmlPlugin } = require('./plugins');

const srcPath = path.join(__dirname, '../src/renderer');

module.exports = {
  target: "web",
  entry: {
    app: path.join(srcPath, 'index.tsx')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].bundle.js',
    chunkFilename: 'chunk/[name].[chunkhash:8].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      "@": path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      lessLoader(srcPath),
    ],
  },
  plugins: [
    htmlPlugin(),
  ],
}