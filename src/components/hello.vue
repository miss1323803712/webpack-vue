<template>
  <div>
    <h2>我是hello组件 msg: {{ msg }}</h2>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    props: {
      msg: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>