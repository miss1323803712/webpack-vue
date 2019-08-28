const path = require('path')
const opn = require('opn')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.dev')
const getIpAddress = require('./utils').getIpAddress()

const app = express()
const DIST_DIR = path.join(__dirname, 'dist')
const // 设置静态访问文件路径
  PORT = 9090 // 设置启动端口
const complier = webpack(webpackConfig)

app.use(require('connect-history-api-fallback')({
  rewrites: [
    {
      from: /\/about(\/|$)/, to: '/about.html'
    },
    {
      from: /\/manage(\/|$)/, to: '/manage.html'
    }
  ]
}))

app.use(webpackDevMiddleware(complier, {
  // 这里是对 webpackDevMiddleware 的一些配置，具体其他配置我们下面已经列出来了。
  // 绑定中间件的公共路径,与webpack配置的路径相同
  publicPath: webpackConfig.output.publicPath,
  quiet: true, // 向控制台显示任何内容
  open: true,
  stats: {
    colors: true,
    chunks: false,
    modules: false,
    version: false
  }
}))

app.use(webpackHotMiddleware(complier, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}))

// 这个方法和下边注释的方法作用一样，就是设置访问静态文件的路径
app.use(express.static(DIST_DIR))

app.listen(PORT, function() {
  console.log('成功启动：localhost:' + PORT)
  opn(`http://${getIpAddress}:${PORT}`)
})
