<template lang="pug">
	.reading.container
		.card.row.mb-3.border-primary(v-for="(item, index) in questions" :key="`q-${index}`")
			.card-header
				h3.font-weight-bold {{index + 1}}:
			.card-body
				h5.card-title.text-primary.font-weight-bold {{item.question}}
				.text-center(v-if="item.img")
					img(:src="`./images/${item.img}`" class="img-fluid")
				p.card-text(
					v-for="(option, optionIndex) in item.option"
					:key="`option-${optionIndex}`"
					:class="optionIndex|correct(item.answer)"
					) {{optionIndex+1}}：{{option}}
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
	filters: {
		correct (val, arr) {
			return arr.indexOf((val + 1) + '') > -1 ? 'bg-info text-white' : ''
		}
	},
	computed: {
	},
	methods: {
	}
}
</script>
<style lang="scss">
</style>
