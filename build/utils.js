const glob = require('glob')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const html = glob.sync('./src/pages/*.html').map(pagePath => {
  let filename = pagePath.match(/[a-z]{1,}\.html$/)[0]
  return new HtmlWebpackPlugin({
    filename: filename,
    title: filename,
    template: path.resolve(__dirname, `../src/pages/${filename}`),
    chunks: [filename.replace(/\.html/, '')],
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeAttributeQuotes: true // 移除属性的引号
    }
  })
})

const entries = glob.sync('./src/views/*/*.js').reduce((prev, next) => {
  let name = next.match(/[a-z]{1,}\.js$/)[0]
  prev[name.replace(/\.js/, '')] = next
  return prev
}, {})

// console.log(entries)

module.exports = {
  plugins: html,
  entry: entries
}
