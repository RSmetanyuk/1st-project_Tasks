const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: [
    './src/main.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../assets')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/indexSrc.html',
      filename: "../index.html"
    })
  ]  
};
