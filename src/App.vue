<template lang="pug">
  .container#app
    ul.nav.nav-pills.justify-content-center.sticky-top.bg-light.mb-4
      li.nav-item
        router-link.nav-link(to="./" :class="{active: $route.name === 'home'}") Home
      li.nav-item
        router-link.nav-link(to="./mkp" :class="{active: $route.name === 'mkp'}") MKP 考題
      li.nav-item
        router-link.nav-link(to="./ebc" :class="{active: $route.name === 'ebc'}") EBC 考題
      li.nav-item
        router-link.nav-link(to="./erp" :class="{active: $route.name === 'erp'}") ERP 考題
      li.nav-item
        router-link.nav-link(to="./pm" :class="{active: $route.name === 'pm'}") 專案管理 考題
    router-view
    .row
      .col-12.pt-5.pb-3.text-center Copyright 1.0.1 By Samuel 2019-12-1
</template>
<script>
export default {
	data () {
		return {

		}
	},
	mounted () {
	}
}
</script>
<style lang="scss">
@import "~bootstrap/scss/bootstrap";
@import "@/scss/_function.scss";
</style>
