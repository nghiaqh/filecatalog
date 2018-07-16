const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeEnv = process.env.NODE_ENV || 'development';
const outputDirectory = 'dist';
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';

const common = {
  mode: nodeEnv,
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [/node_modules/],
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};

const frontend = {
  entry: [
    './client/index.js',
    hotMiddlewareScript,
  ],
  output: {
    path: path.resolve(__dirname, outputDirectory),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(nodeEnv)},
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

const backend = {
  entry: [
    './server/server.js',
    hotMiddlewareScript,
  ],
  target: 'node',
  externals: [
    nodeExternals({whitelist: hotMiddlewareScript}),
  ],
  output: {
    path: path.resolve(__dirname, outputDirectory),
    filename: 'server.js',
    publicPath: '/',
  },
  node: {
    __dirname: true,
  },
  plugins: [
    new CleanWebpackPlugin(outputDirectory),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(nodeEnv)},
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = [
  Object.assign({}, common, frontend),
  Object.assign({}, common, backend),
];
