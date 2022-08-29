const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    library: {
      name: 'persistedstate',
      type: 'umd',
    },
    globalObject: 'this',
    filename: 'bundle.js',
    // path: 'dist'
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true // default cache directory in node_modules/.cache/babel-loader
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   inject: 'body',
    //   filename: 'index.html',
    //   template: path.resolve(__dirname, '../example/index.html')
    // }),
  ]
};