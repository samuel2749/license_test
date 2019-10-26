<template lang="pug">
  .container#app
    ul.nav.nav-pills.justify-content-center.sticky-top
      li.nav-item
        router-link.nav-link(to="./" :class="{active: $route.name === 'home'}") Home
      li.nav-item
        router-link.nav-link(to="./erp" :class="{active: $route.name === 'erp'}") ERP 考題
      li.nav-item
        router-link.nav-link(to="./pm" :class="{active: $route.name === 'pm'}") 專案管理 考題
    router-view
</template>
<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>
<style lang="scss">
@import "~bootstrap/scss/bootstrap";
@import "@/scss/_function.scss";
#app {
  // max-width: wh(1080);
  .nav {
    margin-bottom: 5vw;
  }
}
</style>
