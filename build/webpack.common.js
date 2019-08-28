const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const utils = require('./utils')
module.exports = {
  // entry: {
  //   index: './src/views/index/index.js',
  //   about: './src/views/about/about.js'
  // },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name]-[hash].js'
  },
  module: {
    noParse: /lodash/,
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /dist/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              fix: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              outputPath: './images'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              hotReload: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   title: '哈哈哈哈',
    //   template: path.resolve(__dirname, '../src/pages/index.html'),
    //   chunks: ['index'],
    //   minify: {
    //     collapseWhitespace: true,
    //     removeComments: true,
    //     removeAttributeQuotes: true // 移除属性的引号
    //   }
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'about.html',
    //   title: '哈哈哈哈',
    //   template: path.resolve(__dirname, '../src/pages/about.html'),
    //   chunks: ['about'],
    //   minify: {
    //     collapseWhitespace: true,
    //     removeComments: true,
    //     removeAttributeQuotes: true // 移除属性的引号
    //   }
    // }),

    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ].concat(utils.plugins)
}
