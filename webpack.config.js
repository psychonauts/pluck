const path =  require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
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
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            {test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']}
        ]
    },
    mode: 'development',
    plugins: [new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development'),
            'KEY': JSON.stringify('sk.eyJ1IjoiYXNwMjEzMSIsImEiOiJjanNnZG1tcTAwOWdtNDlwNnQwdWl2dXY4In0.DDGPSnlet8J43DnO9G7lEw')
        }
    }),
        new HtmlWebPackPlugin({
            template: 'client/dist/index.html'
        }),
    ], node: {
        fs: 'empty'
    }
    
}