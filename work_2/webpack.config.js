const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const resolve = function (dir) {
    return path.join(__dirname, dir);
}

const isDevMode = process.env.NODE_ENV === 'development';
const includePath = resolve('./src');
const excludePath = resolve('./node_modules');

module.exports = {
    context: __dirname,
    mode: isDevMode ? 'development' : 'production',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: resolve('./dist'),
        filename: isDevMode ? './js/[name].js' : './js/[name].[chunkhash:8].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        alias: {
            'action': resolve('./src/action'),
            'components': resolve('./src/components'),
            'containers': resolve('./src/containers'),
            'reducer': resolve('./src/reducer'),
            'static': resolve('./src/static'),
            'storage': resolve('./src/storage')
        }
    },
    devServer: {
        contentBase: './dist',
        port: 8000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: includePath,
                exclude: excludePath,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                'react',
                                'env'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                include: includePath,
                exclude: excludePath,
                use: [
                    isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }, 
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                include: includePath,
                exclude: excludePath,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: isDevMode ? './img/[name].[ext]' : './img/[name].[chunkhash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                include: includePath,
                exclude: excludePath,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: isDevMode ? './font/[name].[ext]' : './font/[name].[chunkhash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: isDevMode ? './css/[name].css' : './css/[name].[chunkhash:8].css'
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CleanWebpackPlugin(['dist'])
    ]
}