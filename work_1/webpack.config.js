const path = require('path');
const webpack = require('webpack'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

function resolve (src) {
    return path.join(__dirname, src);
}

const includePath = resolve('src');
const excludePath = resolve('node_modules');
const isDevMode = process.env.NODE_ENV === 'development';


module.exports = {
    context: __dirname,
    mode: isDevMode ? 'development' : 'production',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: resolve('./dist'),
        filename: isDevMode ? './js/bundle.js' : './js/bundle.[chunkhash:8].js'
    },
    resolve: {
        extensions: ['.js', '.scss'],
        alias: {
            'js': resolve('./src/js'),
            'style': resolve('./src/style')
        }
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
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: isDevMode ? './css/[name].css' : './css/[name].[chunkhash:8].css'
        })
    ],
    devServer: {
        contentBase: './dist',
        port: 8080
    }
}

