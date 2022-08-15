const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const postcssPresetEnv = require('postcss-preset-env');

/**
 * @type {import('webpack').Configuration}
 */
const isDev = process.env.NODE_ENV === 'development';
module.exports = {
  target: 'web',
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: path.resolve(process.cwd(), './dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/preset-react'],
              plugins: [
                //   [
                //   require.resolve('babel-plugin-named-asset-import'),
                //   {
                //     loaderMap: {
                //       svg: {
                //         ReactComponent:
                //           '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                //       },
                //     },
                //   },
                // ],
                [
                  require.resolve('babel-plugin-import'), // 导入 import 插件
                  {
                    libraryName: 'antd', // 暴露antd
                    style: true,
                  },
                ]],
            },
          },
          'ts-loader',
        ],
      },
      {
        test: /\.(css|less)$/,
        use: [
          isDev ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: !!isDev,
              modules: {
                auto: true,
                localIdentName: '[local]--[hash:base64:5]',
                // getLocalIdent: getCSSModuleLocalIdent,
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  postcssPresetEnv({
                    browsers: 'last 2 versions',
                  }),
                ],
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(jpe?g|png|svg|gif)/i,
        type: 'asset',
        generator: {
          filename: 'static/image/[hash][ext][query]', // 局部指定输出位置
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 限制于 8kb
          },
        },
      },
      {
        test: /\.html$/i,
        exclude: path.resolve(process.cwd(), './public/index.html'),
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', ''],
    alias: {
      '@': path.resolve(process.cwd(), './src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '管理后台',
      template: path.resolve(process.cwd(), './public/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].css',
    }),

  ],
  cache: {
    type: 'filesystem',
    // 可选配置
    buildDependencies: {
      config: [__filename], // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
    },
  },
};
