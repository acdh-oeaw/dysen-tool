const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    css: {
      sourceMap: true,
    },
    outputDir: 'html',
    configureWebpack: {
      devtool: '',
      optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              minSize: 50000,
              maxSize: 250000,
            },
          },
        },
      },
      plugins: [new CompressionPlugin()],
    },
  };
} else {
  module.exports = {
    outputDir: 'dist',
    configureWebpack: {
      devtool: 'eval-source-map',
    },
  };
}
