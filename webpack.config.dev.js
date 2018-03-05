const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  entry: [
    'babel-polyfill',
    './client/src/Index.jsx',
  ],
  output: {
    filename: '[name]bundle.js',
    path: path.resolve(__dirname, './client/build'),
    // `telling webpack where to create dev bundle`
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'], // extensions that webpack is going to expect
  },
  devtool: 'inline-source-map', // line numbers for debugging
  devServer: {
    historyApiFallback: true,
    publicPath: '/',
    hot: true,
    inline: true,
    host: 'localhost', // Defaults to `localhost`
    port: 8000, // Defaults to 8080
    proxy: {
      '/api/*': {
        target: 'http://localhost:9000/',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(['client/build']),
    new HtmlWebpackPlugin({
      title: 'More Recipes',
      template: './client/index.html',
      favicon: './client/src/assets/img/favicon.ico',
      inject: 'body',
    }),
    new webpack.EnvironmentPlugin(['serverUrl']),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin({
      //     multiStep: true,
    }),
    new webpack.NoErrorsPlugin(),
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        exclude: /node_modules/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|mp4)$/,
        exclude: /node_modules/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/middleware'),
        ],
        loader: 'babel-loader',
        exclude: [/node_modules/, 'test'],
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015'],
          plugins: [[
            'transform-class-properties',
            {
              spec: true
            }
          ]]
        },
      },
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/helpers'),
        ],
        loader:
          'babel-loader',
        exclude: [/node_modules/, 'test'],
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015'],
          plugins: [[
            'transform-class-properties',
            {
              spec: true
            }
          ]]
        },
      },
    ],
  },
};
