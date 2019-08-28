import Vue from 'vue'
import App from './App'
import lodash from 'lodash'
const news = require('../../tools/news')
console.log(lodash, news)

// eslint-disable-next-line no-new
new Vue({
  el: '#about',
  render: h => h(App)
})
