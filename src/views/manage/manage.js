import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Hello from '@/components/hello'
import Hello1 from '@/components/hello-1'
import Hello2 from '@/components/hello-2'

import '@/assets/sass/views/manage/main.scss'
Vue.use(VueRouter)

const routes = [
  {
    path: '/manage',
    name: 'Manage',
    component: Hello
  },
  {
    path: '/manage/user',
    name: 'User',
    component: Hello1
  },
  {
    path: '/manage/report',
    name: 'Report',
    component: Hello2
  }
]

const f = () => {
  console.log(1232)
}

f()

const router = new VueRouter({
  routes
})
// eslint-disable-next-line no-new
new Vue({
  el: '#manage',
  router: router,
  render: h => h(App)
})
