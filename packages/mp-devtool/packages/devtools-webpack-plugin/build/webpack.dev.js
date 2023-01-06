const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  infrastructureLogging: { level: 'error' }, // devserver log
  stats: 'minimal', // errors-warnings 精简编译后log
  devServer: {
    client: {
      logging: 'error',
    },
    host: '127.0.0.1',
    historyApiFallback: true,
    open: !true,
    compress: true,
    hot: true,
    port: 3000,
    proxy: {
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.spa.html')
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[fullhash:8].css",
      // filename: '[name].css',
      // chunkFilename: '[id].css',
    }),
  ],
})
