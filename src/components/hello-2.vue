<template>
  <div>
    <h2>我是hello组件2 msg: {{ msg }}</h2>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    props: {
      msg: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>