var path = require('path');

module.exports = {
  target: 'electron-renderer',
  mode: 'development',
  entry: './src/public/fe/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist', 'public', 'fe'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  watch: true,
};
