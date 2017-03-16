const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
  },
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'build'),
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: 'src/index.html'},
    ]),
  ],
}
