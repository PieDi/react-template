const path = require('path');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');// 引入webpack
const portfinder = require('portfinder');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const baseConfig = require('./webpack.base');

/**
 * @type {import('webpack').WebpackOptionsNormalized}
 */
const PORT = process.env.PORT || 9000;
portfinder.basePort = PORT;
portfinder.highestPort = PORT + 200;

const devServer = {
  hot: true,
  port: PORT,
  host: '127.0.0.1',
  compress: true,
  open: true,
  historyApiFallback: true,
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      pathRewrite: { '^/api': '' },
      secure: false,
    },
  },
};

const devConfig = webpackMerge.merge(baseConfig, {
  mode: 'development',
  devServer,
  devtool: 'source-map',
  plugins: [// 配置插件的节点
    new webpack.HotModuleReplacementPlugin(), // new 一个热更新的模块对象
    // new webpack.SourceMapDevToolPlugin({
    //   exclude: /node_modules/,
    //   filename: 'sourcemaps/[file].map',
    //   module: true,
    //   columns: true,
    // }),
    new StyleLintPlugin({
      context: 'src',
      configFile: path.resolve(process.cwd(), './.stylelintrc.js'), // 指定 stylelint 配置的文件
      files: '**/*.less',
      fix: true,
      quiet: true,
    }),
  ],
});

module.exports = new Promise((resolve, reject) => {
  // 查找端口号
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
      return;
    }
    // 端口被占用时就重新设置evn和devServer的端口
    devConfig.devServer.port = port;
    resolve(devConfig);
  });
});
