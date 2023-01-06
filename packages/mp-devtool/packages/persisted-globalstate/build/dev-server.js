const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const path = require('path')

const webpackConfig = require('./webpack.config.js')

const compiler = Webpack(merge(webpackConfig, {
  entry: ['./src/index.js', './example/demo.js'],
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: path.resolve(__dirname, '../example/index.html')
    }),
  ]
}))

const devServerOptions = {
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
}

const server = new WebpackDevServer(devServerOptions, compiler)

const runServer = async () => {
  console.log('Starting server...')
  await server.start();
};

runServer()