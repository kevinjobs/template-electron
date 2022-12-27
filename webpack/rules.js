function jsRulesDev(includePath) {
  return {
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    include: includePath,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader?cacheDirectory',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        plugins: [
          '@babel/plugin-transform-runtime',
          'react-refresh/babel'
        ]
      }
    }
  }
}

function jsRules(includePath) {
  return {
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    include: includePath,
    use: {
      loader: 'babel-loader?cacheDirectory',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        plugins: [
          '@babel/plugin-transform-runtime'
        ]
      }
    }
  }
}

function babelTsLoader(...p) {
  return {
    test: /\.ts$/,
    include: [...p],
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          ['@babel/preset-typescript', {optimizeConstEnums: true,}],
        ],
        plugins: [
          '@babel/plugin-transform-runtime',
          "babel-plugin-transform-typescript-metadata",
          ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ],
      }
    }
  }
}

function lessLoader(p) {
  return {
    test: /\.less$/i,
    include: p,
    use: [
      "style-loader",
      "css-loader",
      "less-loader",
    ]
  }
}

module.exports = {
  jsRulesDev,
  jsRules,
  babelTsLoader,
  lessLoader,
}