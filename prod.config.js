/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const SshWebpackPlugin = require('ssh-webpack-plugin');
const fs = require('fs');
const os = require('os');
require('dotenv').config();

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      { test: /\.jsx?/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
    ],
  },
  mode: 'production',
  plugins: [
    new HtmlWebPackPlugin({
      template: 'client/dist/index.html',
    }),
    new SshWebpackPlugin({
      host: process.env.REMOTE_HOST,
      port: 22,
      username: 'ubuntu',
      privateKey: fs.readFileSync(`${os.homedir()}/.ssh/pluck-pem.pem`),
      before: 'cd pluck && git pull upstream master',
      from: './client/dist',
      to: '/home/ubuntu/pluck/client/dist',
    }),
  ],
  node: {
    fs: 'empty',
  },
};
