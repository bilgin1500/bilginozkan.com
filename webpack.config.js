/*
  Sylus: https://github.com/stylus/stylus/
  Stylus Loader: https://github.com/shama/stylus-loader
  Clean Webpack: https://github.com/johnagan/clean-webpack-plugin
  HTML Webpack: https://github.com/jantimon/html-webpack-plugin
  DoT.js: http://olado.github.io/doT/
  DoT.js advanced snippets: https://github.com/olado/doT/blob/master/examples/advancedsnippet.txt
 */

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var pageData = require('./src/content/index.json');
var outputFolder = 'dist';

module.exports = {
  entry: './app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, outputFolder)
  },
  resolve: {
    extensions: ['.js', '.json', '.styl', '.dot'],
    alias: {
      utilities: path.resolve(__dirname, 'src/utilities/'),
      components: path.resolve(__dirname, 'src/components/'),
      templates: path.resolve(__dirname, 'src/templates/'),
      content: path.resolve(__dirname, 'src/content/'),
      css: path.resolve(__dirname, 'src/css/'),
      ScrollMagicGSAP:
        'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'imports-loader?define=>false'
      },
      {
        test: /\.(ico|png|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-loader']
        })
      },
      { test: /\.dot$/, loader: 'dot-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: pageData.title,
      description: pageData.description,
      template: 'src/templates/index.dot',
      favicon: 'src/content/favicon.ico'
    }),
    new ExtractTextPlugin('app.css'),
    new webpack.NamedModulesPlugin()
  ]
};
