const path = require('path');

module.exports = require('./base')({
  entry: {
    app: path.join(process.cwd(), 'app/index.js'),
  },
  output: {
    // filename: '[name].[chunkhash].js',
    // chunkFilename: '[name].[chunkhash].chunk.js',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  plugins: [],
  mode: 'production',
  performance: {
    assetFilter: assetFilename => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
