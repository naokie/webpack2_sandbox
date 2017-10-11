const merge = require('webpack-merge');

const config = require('./webpack.config.base');

module.exports = merge(config, {
  output: {
    filename: '[name]/pc.js',
  },

  resolve: {
    mainFiles: [
      'pc',
      'index'
    ]
  }
});
