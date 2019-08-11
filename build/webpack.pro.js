const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const WebpackMerge = require('webpack-merge')
const common = require('./webpack.common')

const proConfig = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: './js/bundle[hash].js'
  },
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
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name][hash].css', // 设置最终输出的文件名
      chunkFilename: '[id][hash].css'
    })
  ],
  optimization: {
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
