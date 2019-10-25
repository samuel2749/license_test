<template lang="pug">
  .home
    .btn.btn-primary 測試
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
</style>
