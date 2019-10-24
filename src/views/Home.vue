<template lang="pug">
  .home
    img(alt="Vue logo" src="../assets/logo.png")
    HelloWorld(msg="Welcome to Your Vue.js App")
    .btn.btn-primary 測試
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axio from 'axios'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  mounted () {
    axio.get('/json/erp.json').then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>
<style lang="scss">
</style>
