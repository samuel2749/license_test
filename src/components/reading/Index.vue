<template lang="pug">
	.reading.container
		.card.row.mb-3.border-primary(v-for="(item, index) in questions" :key="`q-${index}`")
			.card-header
				.row(:class="titleFontSize")
					.font-weight-bold.col-6 {{index + 1}}:
					.col-6.text-right
						button.btn-secondary(@click="gotoTop") TOP
			.card-body
				.card-title.text-primary.font-weight-bold(:class="titleFontSize") {{item.question}}
				.text-center(v-if="item.img")
					img(:src="`./images/${item.img}`" class="img-fluid")
				p.card-text(
					v-for="(option, optionIndex) in item.option"
					:key="`option-${optionIndex}`"
					:class="getOtherClass(item.answer, optionIndex)"
					) {{optionIndex+1}}：{{option}}
</template>
<script>
import VueScrollTo from 'vue-scrollto'
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
	},
	computed: {
		isMobile () {
			return this.$store.state.isMobile
		},
		titleFontSize () {
			return !this.isMobile ? 'h3' : 'h5'
		}
	},
	methods: {
		gotoTop () {
			VueScrollTo.scrollTo('body', 500, { easing: 'linear' })
		},
		getOtherClass (arr, index) {
			var classObj = {
				h5: !this.isMobile
			}
			if (arr.indexOf((index + 1) + '') > -1) {
				classObj['bg-info'] = true
				classObj['text-white'] = true
			}
			return classObj
		}
	}
}
</script>
<style lang="scss">
</style>
