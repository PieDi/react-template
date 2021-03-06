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
            options: { presets: ['@babel/env', '@babel/preset-react'] },
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
          filename: 'static/image/[hash][ext][query]', // ????????????????????????
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // ????????? 8kb
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
      title: '????????????',
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
    // ????????????
    buildDependencies: {
      config: [__filename], // ??????????????????config??????????????? require ?????????????????????????????????????????????
    },
  },
};
