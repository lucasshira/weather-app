const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './public/script.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      '__API_URL__': JSON.stringify(process.env.API_URL)
    })
  ],
};
