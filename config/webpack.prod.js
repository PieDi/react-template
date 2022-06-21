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
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].css',
    }),
  ],
  optimization: {
    minimize: true,
    moduleIds: "deterministic",
  },
}

module.exports = webpackMerge.merge(baseConfig, prodConfig)