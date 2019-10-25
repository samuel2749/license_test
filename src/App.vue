<template lang="pug">
  .container#app
    ul.nav.nav-pills.justify-content-center.sticky-top
      li.nav-item
        router-link.nav-link.active(to="./") Home
      li.nav-item
        router-link.nav-link(to="./erp") ERP 考題
      li.nav-item
        router-link.nav-link(to="./pm") 專案管理 考題
    router-view.container-fluid
</template>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
@import "@/scss/_function.scss";
#app {
  // max-width: wh(1080);
}
</style>
