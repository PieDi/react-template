const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * @type {import('webpack').WebpackOptionsNormalized}
 */
const prodConfig = {
  mode: 'production',
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename], //使用文件缓存
    },
  },
  plugins: [],
  optimization: {
    minimize: true,
    moduleIds: "deterministic",
    splitChunks: {
      chunks: 'all'
    }
  },
}

module.exports = webpackMerge.merge(baseConfig, prodConfig)