<template>
  <div>
    我是后端管理页12
    <router-link :to="{path: '/manage/user'}">user</router-link>
    <router-link :to="{path: '/manage/report'}">report</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'Manage'
  }
</script>

<style lang="scss" scoped>

</style>