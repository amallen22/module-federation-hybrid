const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: 'auto',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        loginApp: 'loginApp@http://localhost:3001/dist/remoteEntry.js',
        userApp: 'userApp@http://localhost:3003/dist/remoteEntry.js',
      },
      shared: {
        react: { 
          singleton: true, 
          eager: true,
          requiredVersion: '^18.2.0'
        },
        'react-dom': { 
          singleton: true, 
          eager: true,
          requiredVersion: '^18.2.0'
        },
        'react-router-dom': { 
          singleton: true,
          eager: true,
          requiredVersion: '^6.20.0'
        },
        zustand: { 
          singleton: true, 
          eager: true,
          requiredVersion: '^4.5.0'
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'CV Apps - Shell',
    }),
  ],
};
