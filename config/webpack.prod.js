const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
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
  optimization: {
    minimize: true,
    moduleIds: "deterministic",
  },
}

module.exports = webpackMerge.merge(baseConfig, prodConfig)