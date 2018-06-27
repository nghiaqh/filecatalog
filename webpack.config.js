'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    port: 3000,
    open: true,
    host: '0.0.0.0',
    public: 'http://localhost:3000',
    proxy: {
      '/api': 'http://192.168.0.6:8080',
      '/mnt/d': {
        target: 'http://192.168.0.6/img',
        pathRewrite: {'^/mnt/d': ''},
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
