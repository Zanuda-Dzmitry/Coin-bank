/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => ({
  entry: {
    main: path.resolve(__dirname, './src/page/main.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.[contenthash].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env']],
          },
        },
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif|ttf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Bank',
      template: path.resolve(__dirname, './src/index.html'), // шаблон
      filename: 'index.html', // название выходного файла
    }),
    new MiniCssExtractPlugin({ filename: 'main.[contenthash].css' }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
});
