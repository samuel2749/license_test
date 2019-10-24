<template lang="pug">
  .home
    img(alt="Vue logo" src="/static/logo.png")
    HelloWorld(msg="Welcome to Your Vue.js App")
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
<style lang="scss">
</style>
