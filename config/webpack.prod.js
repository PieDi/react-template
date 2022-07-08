const webpackMerge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const baseConfig = require('./webpack.base');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * @type {import('webpack').WebpackOptionsNormalized}
 */
const prodConfig = {
  mode: 'production',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename], // 使用文件缓存
    },
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$/,
      threshold: 10240, // 对超过10k的数据进行压缩
      minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
    }),
  ],
  optimization: {
    minimize: true,
    moduleIds: 'deterministic',
    splitChunks: {
      chunks: 'all',
    },
  },
};

module.exports = webpackMerge.merge(baseConfig, prodConfig);
