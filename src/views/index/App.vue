<template>
  <div>
    <h1 class="title"> {{ message }}</h1>
    <input type="text" v-model="message">
    <v-hello :msg="message"></v-hello>
  </div>
</template>

<script>
  import Hello from '../../components/hello'
  export default {
    name: 'App',
    data () {
      return {
        message: '我是根组件'
      }
    },
    components: {
      'v-hello': Hello
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    color: blue;
  }
</style>

