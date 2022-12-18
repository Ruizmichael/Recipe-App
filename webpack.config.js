const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          // Creates 'style' nodes from JS strings
          'style-loader',
          //Translates CSS into CommonJS
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development Receipe',
      template: 'index.html',
    }),
    new Dotenv(),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
  },
};
