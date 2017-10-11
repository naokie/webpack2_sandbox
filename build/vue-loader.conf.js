const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

function cssLoaders(options) {
  options = options || {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: isProduction,
      sourceMap: options.sourceMap
    }
  };

  function generateLoaders(loader, loaderOptions) {
    const loaders = [cssLoader];
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
    }

    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      });
    } else {
      return ['vue-style-loader'].concat(loaders);
    }
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass')
  };
}

module.exports = {
  loaders: cssLoaders({
    sourceMap: isProduction,
    extract: isProduction
  })
}
