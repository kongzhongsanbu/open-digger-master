const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./base');
const { merge } = require('webpack-merge');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 9000,
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'webpack-config/dev-template.pug',
    }),
  ]
};

module.exports = merge(baseConfig, devConfig);