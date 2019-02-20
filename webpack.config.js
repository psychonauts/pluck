const path =  require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
    entry: `${SRC_DIR}/index.jsx`,
    output: {
        filename: 'bundle.js',
        path: DIST_DIR
    },
    module: {
        rules: [
            { test: /\.jsx?/, use: 'babel-loader'},
            { test: /\.css(js)$/, use: ['style-loader', 'css-loader'] }
        ]
    },
    mode: 'development',
    plugins: [
        new HtmlWebPackPlugin({
            template: 'client/dist/index.html'
        })
    ]
}