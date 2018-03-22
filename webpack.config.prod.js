const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const buildPath = path.join(__dirname, 'dist');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill',
    './client/src/Index.jsx',
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './client/dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new ExtractTextPlugin('./style.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.SERVER_URL': JSON.stringify('api/v1'),
      // 'process.env.FIREBASE_APIKEY': process.env.FIREBASE_APIKEY,
      // 'process.env.FIREBASE_AUTHDOMAIN': process.env.FIREBASE_AUTHDOMAIN,
      // 'process.env.FIREBASE_PROJECTID': process.env.FIREBASE_PROJECTID,
      // 'process.env.FIREBASE_STORAGEBUCKET': process.env.FIREBASE_STORAGEBUCKET,
      // 'process.env.FIREBASE_MESSENGERID': process.env.FIREBASE_MESSENGERID
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'More Recipes',
      template: './client/index.html',
      path: buildPath,
      filename: 'index.html',
      favicon: './client/src/assets/img/favicon.ico',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/helpers'),
        ],
        loader: 'babel-loader',
        exclude: [/node_modules/,
          path.join(__dirname, 'test'),
        ],
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
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
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
        test: /\.svg$/,
        loader: 'raw-loader',
      }
    ]
  }
};
