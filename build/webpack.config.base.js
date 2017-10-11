const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const vueLoaderConfig = require('./vue-loader.conf');

const isProduction = process.env.NODE_ENV === 'production';


console.dir(vueLoaderConfig.loaders.scss);

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const plugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: isProduction ? 'production' : 'development',
    DEBUG: !isProduction
  })
];

if (isProduction) {
  plugins.push(new UglifyJSPlugin());
}

module.exports = {
  entry: {
    main: './src/main.js',
    sub: './src/sub.js'
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    path: resolve('dist')
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.vue'],
    modules: [
      'node_modules',
      resolve('src')
    ]
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },

  plugins: plugins
};
