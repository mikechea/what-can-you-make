require('ts-node').register()
require('./server/index.ts')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    main: "./src/index.js"
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  output: {
    path: `${__dirname}/static`,
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [
          `${__dirname}/src`
        ],
        loader: "babel-loader",
      },
    ]
  },
  devServer: {
    port: 3000,
    contentBase: `${__dirname}/static`,
    publicPath: "/",
    filename: '[name].bundle.js',
    proxy: {
      '/api/**': {
        target: 'http://localhost:4000/',
        changeOrigin: true
      }
    },
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'what can you make',
      template: './static/index-template.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
