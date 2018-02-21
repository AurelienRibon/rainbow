'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './lib/index.js',
    vendor: ['pixi.js']
  },

  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    publicPath: '/'
  },

  devtool: 'eval-source-map', // not for prod! (see top note)

  devServer: {
    contentBase: '/dist',
    stats: 'errors-only',
    hot: true
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader']
      },
      {
        test: /\.scss$/,
        use: ['css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|json)$/,
        loader: 'file-loader',
        options: { name: '[path][name].[ext]' }
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
    new HtmlWebpackPlugin({ template: 'index.template.html' }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
