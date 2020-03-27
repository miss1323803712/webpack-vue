<template>
  <div>
    <h1 class="title"> {{ message }}</h1>
    <input type="text" v-model="message" @input="input">
    <v-hello :msg="message"></v-hello>
  </div>
</template>

<script>
  import Hello from '../../components/hello'
  import { debounce, throttle } from '@/tools/utils'
  export default {
    name: 'App',
    data () {
      return {
        message: '我是根组件'
      }
    },
    components: {
      'v-hello': Hello
    },
    mounted () {
      document.onmousemove = throttle(function () {
        console.log('鼠标滑动')
      }, 1000)
    },
    methods: {
      input: debounce(function () {
        console.log(12121, this)
      }, 1000)
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    color: blue;
  }
</style>

