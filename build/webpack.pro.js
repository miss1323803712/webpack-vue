// const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const WebpackMerge = require('webpack-merge')
const common = require('./webpack.common')
const utils = require('./utils')
const proConfig = {
  mode: 'production',
  entry: Object.assign({}, utils.entry, { vue: 'vue' }),
  module: {
    noParse: /lodash/,
    rules: [
      {
        test: /\.(sc|c|sa)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({ browsers: ['> 0.15% in CN'] }) // 添加前缀
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '/css/[name][hash].css', // 设置最终输出的文件名
      chunkFilename: '[id][hash].css'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2,
          priority: 1
        },
        vendor: {
          chunks: 'all',
          name: 'vendor',
          minChunks: 2,
          priority: 2
        },
        vue: {
          name: 'vue',
          test: 'vue',
          enfoce: true,
          chunks: 'initial',
          priority: 3
        }
      }
    },
    minimizer: [
      new UglifyjsWebpackPlugin({
        cache: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  }
}
module.exports = WebpackMerge(common, proConfig)
