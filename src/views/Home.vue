<template lang="pug">
	.home.container(:class="{'text-center': !isMobile}")
		h1.text-center.mb-5 資四甲 證照測驗
		router-link.btn.btn-lg.btn-success(:class="{'btn-block': isMobile}" to="/normal/bulldozer") 推土機 測驗
		router-link.btn.btn-lg.btn-success(:class="{'btn-block': isMobile, 'ml-2': !isMobile}" to="/normal/mkp") MKP 測驗
		router-link.btn.btn-lg.btn-success(:class="{'btn-block': isMobile, 'ml-2': !isMobile}" to="/normal/ebc") EBC 測驗
		router-link.btn.btn-lg.btn-success(:class="{'btn-block': isMobile, 'ml-2': !isMobile}" to="/normal/erp") ERP 測驗
		router-link.btn.btn-lg.btn-success(:class="{'btn-block': isMobile, 'ml-2': !isMobile}" to="/pm") PM 測驗
</template>
<script>
// @ is an alias to /src
export default {
	name: 'home',
	components: {
	},
	mounted () {
	},
	computed: {
		isMobile () {
			return this.$store.state.isMobile
		}
	}
}
</script>
<style lang="scss">
</style>
