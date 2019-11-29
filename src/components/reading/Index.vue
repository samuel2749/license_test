<template lang="pug">
	.reading.container
		.row reading
</template>
<script>
export default {
	props: {
		questions: {
			default: () => {
				return {}
			},
			type: Array
		},
		total: {
			default: 0,
			type: Number
		},
		callback: {
			default: () => {},
			type: Function
		}
	},
	data () {
		return {
		}
	},
	watch: {
		questions: {
			handler (val) {
				// val.length > 0 && this.randomTestList()
			},
			immediate: true
		}
	},
	mounted () {

	},
	computed: {
	},
	methods: {
	}
}
</script>
<style lang="scss">
</style>
