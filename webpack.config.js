const path = require('path');

module.exports = {
  entry: './src/bem.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'vue-simple-bem.js',
    path: path.resolve(__dirname, 'dist')
  }
};
