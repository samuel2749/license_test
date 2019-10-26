<template lang="pug">
  .home.container
    h1.text-center 資四甲 證照測驗
    router-link.btn.btn-lg.btn-block.btn-success(to="./erp") ERP 測驗
    router-link.btn.btn-lg.btn-block.btn-success(to="./pm") PM 測驗
</template>
<script>
// @ is an alias to /src
import axio from 'axios'
export default {
  name: 'home',
  components: {
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
  .home{
    h1{
      margin-bottom: 6vw
    }
  }
</style>
