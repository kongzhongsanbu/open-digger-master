const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require('./base');
const { merge } = require('webpack-merge');

const prodConfig = {
  mode: 'production',
  performance: {hints: false},
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'webpack-config/prod-template.pug',
      inject: false,
    }),
    new CleanWebpackPlugin()
  ]
};

module.exports = merge(baseConfig, prodConfig);;