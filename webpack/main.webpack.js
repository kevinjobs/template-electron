const path = require('path');
const { babelTsLoader } = require("./rules");

const srcMainPath = path.join(__dirname, "../src/main");
const preloadPath = path.join(__dirname, "../src/preload");
const constantPath = path.join(__dirname, "../src/constant");

module.exports = {
  target: "electron-main",
  mode: process.env.NODE_ENV,
  devtool: "inline-source-map",
  entry: {
    main: path.join(__dirname, "../src/main/index.ts"),
    preload: path.join(__dirname, "../src/preload/index.ts"),
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].js",
    clean: true,
  },
  resolve: {
    alias: {
      "constant": constantPath,
    },
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      babelTsLoader(srcMainPath, preloadPath, constantPath),
    ]
  }
}