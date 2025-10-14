'use strict';

const BUILD_GLOBALS = require('@npm_leadtech/cv-lib-app-config/src/scripts/globals');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const APP_DIR = path.resolve(__dirname, 'src/app');
const INDEX_DIR = path.resolve(__dirname, BUILD_GLOBALS.INDEX_DIR);
const BUILD_DIR = path.resolve(INDEX_DIR, 'dist');

const config = {
    mode: BUILD_GLOBALS.NPM_CONFIG_ENV === 'local'? 'development' : 'production',
    cache: {
        type: 'filesystem',
    },
    entry: {
        index: [APP_DIR + '/index.tsx']
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.jsx' ],
        alias: {
            'app-scss-vars': path.resolve(__dirname, 'src/app/styles/app_vars.scss'),
        }
    },
    output: {
        sourceMapFilename: '[name].bundle.js.map',
        pathinfo: true,
        path: BUILD_DIR,
        publicPath: 'auto',
        filename: '[name].bundle.js',
        crossOriginLoading: 'anonymous'
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    optimization: {
        splitChunks: {
            chunks: 'initial'
        },
        minimizer: [
            new TerserPlugin({
                extractComments: true
            }),
        ]
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader', // Inserts all imported styles into the html document
                    'css-loader',   // Translates CSS into CommonJS
                    'sass-loader',  // Compiles Sass to CSS
                ],
                include: [
                    APP_DIR,
                    path.resolve(__dirname, 'node_modules/@npm_leadtech/cv-lib-app-components'),
                ],
            },
            {
                test : /\.(ts|tsx)$/,
                include: [
                    APP_DIR,
                ],
                loader : 'ts-loader'
            },
            {
                test : /\.(js|jsx)$/,
                include: [
                    APP_DIR,
                    path.resolve(__dirname, 'node_modules/@npm_leadtech/cv-lib-app-components'),
                    path.resolve(__dirname, 'node_modules/@npm_leadtech/cv-lib-app-config'),
                    path.resolve(__dirname, 'node_modules/@npm_leadtech/cv-storage-js'),
                    path.resolve(__dirname, 'node_modules/@npm_leadtech/jsr-lib-http'),
                    path.resolve(__dirname, 'node_modules/@npm_leadtech/cv-lib-visitor'),
                    path.resolve(__dirname, 'node_modules/@npm_leadtech/cv-lib-app-jsnlog')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                include: [
                    APP_DIR,
                    path.resolve(__dirname, 'node_modules/@npm_leadtech/cv-lib-app-config'),
                ],
                options: {
                    name: '[name]-[sha256:hash:base64:4].[ext]',
                    publicPath: 'images/loader/',
                    outputPath: '../images/loader/'
                }
            },
            {
                test: /\.(eot|ttf|woff)$/,
                loader: 'file-loader',
                options: {
                    name: '[name]-[sha256:hash:base64:4].[ext]',
                    publicPath: 'fonts/loader/',
                    outputPath: '../fonts/loader/'
                }
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'userApp',
            filename: 'remoteEntry.js',
            exposes: {
                './App': './src/app/index.tsx',
            },
            shared: {
                react: { 
                    singleton: true, 
                    requiredVersion: '^18.2.0',
                    eager: true
                },
                'react-dom': { 
                    singleton: true, 
                    requiredVersion: '^18.2.0',
                    eager: true
                },
                'react-router-dom': { 
                    singleton: true,
                    eager: true
                },
                zustand: { 
                    singleton: true,
                    eager: true
                },
            },
        }),
        new CopyPlugin({
            patterns: [
                { from: `${APP_DIR}/i18n`, to: `${BUILD_DIR}/i18n` },
            ]
        }),
        new HtmlWebpackPlugin({
            title: 'CV User',
            hash: true,
            inject: true,
            mobile: true,
            template: APP_DIR + '/index.ejs',
            filename: INDEX_DIR + '/index.html',
            baseHref: process.env.CVAPP_appPath,
            chunks: [
                'index',
                'vendors~index'
            ],
            links: [
                'https://fonts.googleapis.com/css?family=Arvo:400,700|Roboto:300,400,500,700|Roboto+Slab:300,400,700',
                'https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap'
            ],
            minify: {
                collapseWhitespace: true,
                preserveLineBreaks: false
            },
            favicons: []
        })
    ],
    devtool: BUILD_GLOBALS.ENV === 'local'? 'eval-cheap-module-source-map' : undefined,
    externals: [{
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }],
    devServer: {
        port: 3003,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        },
        static: [
            {
                directory: INDEX_DIR,
                publicPath: '/',
            },
            {
                directory: BUILD_DIR,
                publicPath: '/dist',
            }
        ],
        historyApiFallback: true,
    },
};

module.exports = config;
