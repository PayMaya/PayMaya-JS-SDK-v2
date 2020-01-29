const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const Dotenv = require('dotenv-webpack');

module.exports = {
    devtool: 'eval-cheap-module-source-map',
    entry: ['./src/index.js'],
    devServer: {
        port: 8080,
        open: true,
        disableHostCheck: true,
        contentBase: path.join(__dirname, "dist")
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        "@babel/transform-runtime",
                        '@babel/transform-regenerator',
                        '@babel/proposal-object-rest-spread'
                    ]
                }
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true
        }),
        new Dotenv({
            path: './.env.dev',
        })
    ]
};
