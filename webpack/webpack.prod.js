const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sass = require('node-sass');

module.exports = {
  mode: 'development',
  entry: [
    './src/main.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../assets')
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [/(node_modules)/, /\.spec\.js$/],
        include: [
          path.resolve(__dirname, '../js')
        ],
        use: []
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            query: {
              modules: true,
              camelCase: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/indexSrc.html',
      filename: "../index.html"
    })
  ]  
};
