const merge = require('webpack-merge');

const config = require('./webpack.config.base');

module.exports = merge(config, {
  output: {
    filename: '[name]/sp.js',
  },

  resolve: {
    mainFiles: [
      'sp',
      'index'
    ]
  }
});
