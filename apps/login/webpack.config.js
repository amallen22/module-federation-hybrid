'use strict';

const BUILD_GLOBALS = require('@npm_leadtech/cv-lib-app-config/src/scripts/globals');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const APP_DIR = path.resolve(__dirname, 'src/app');
const BUILD_DIR = path.resolve(__dirname, BUILD_GLOBALS.INDEX_DIR, 'dist');
const DEV_MODE = BUILD_GLOBALS.ENV === 'local';

const REGEX = {
    img: /\.(png|jpg|gif|svg)$/
};

module.exports = {
    mode: DEV_MODE? 'development' : 'production',
    devtool: DEV_MODE? 'eval-source-map' : undefined,
    externals:[{
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}',
    }],
    entry: {
        index: [
            'core-js/es/symbol',
            'whatwg-fetch',
            `${APP_DIR}/index.js`
        ]
    },
    output: {
        sourceMapFilename: '[name].bundle.js.map',
        pathinfo: true,
        path: BUILD_DIR,
        filename: '[name].bundle.js',
        crossOriginLoading: 'anonymous'
    },
    optimization: {
        splitChunks: {
            chunks: 'initial'
        },
        minimizer: [
            new UglifyJsPlugin({
                exclude: /serviceWorker\.js/,
                uglifyOptions:{
                    output: {
                        comments: false
                    }
                }
            })
        ]
    },
    module : {
        rules : [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    { loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                        },
                    },
                ],
            },
            {
                test : /\.js$/,
                include : [
                    APP_DIR,
                    path.resolve(__dirname, 'node_modules/@npm_leadtech/cv-lib-app-config'),
                    path.resolve(__dirname, 'node_modules/@npm_leadtech/cv-lib-app-components'),
                    path.resolve(__dirname, 'node_modules/@npm_leadtech/cv-lib-auth'),
                    path.resolve(__dirname, 'node_modules/@npm_leadtech/cv-lib-social'),
                    path.resolve(__dirname, 'node_modules/@npm_leadtech/cv-lib-app-jsnlog'),
                    path.resolve(__dirname, 'node_modules/@npm_leadtech/jsr-lib-http'),
                    path.resolve(__dirname, 'node_modules/@npm_leadtech/cv-storage-js'),
                    path.resolve(__dirname, 'node_modules/@npm_leadtech/cv-lib-visitor')
                ],
                loader : 'babel-loader'
            },
            {
                test: REGEX.img,
                loader: 'file-loader',
                options: {
                    name: '[name]-[sha256:hash:base64:4].[ext]',
                    publicPath: 'images/loader/',
                    outputPath: '../images/loader/'
                }
            }
        ]
    },
    plugins: [
        new CopyPlugin([{
            from: `${APP_DIR}/i18n`,
            to: `${BUILD_DIR}/i18n`,
            ignore: ['**/months/*.json']
        }]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            title: 'CV',
            hash: true,
            inject: true,
            mobile: true,
            template: APP_DIR + '/index.ejs',
            filename: '../index.html',
            links: [
                'styles/preloadStyles.css',
                'https://fonts.googleapis.com/css?family=Arvo:400,400i,700|Roboto|Kalam|Material+Icons'
            ],
            minify: {
                collapseWhitespace: true,
                preserveLineBreaks: false
            },
            favicons: []
        }),
        new PreloadWebpackPlugin({
            rel: 'preload',
            include: 'allAssets',
            fileWhitelist: [/linkedin/, /google/],
            as (entry) {
                if (/\.css$/.test(entry)) return 'style';
                if (/\.woff$/.test(entry)) return 'font';
                if (REGEX.img.test(entry)) return 'image';
                return 'script';
            }
        })
    ]
};
