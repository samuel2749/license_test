<template lang="pug">
	.text-center(v-if="!pmData.length")
		button.btn.btn-primary(disabled)
			span.spinner-border.spinner-border-sm(role="status" aria-hidden="true")
			|Loading...
	.pm.container(v-else)
		h1.text-center 專案管理 測試
		template(v-if="type == 'step1'")
			.row.custom-control.custom-checkbox.form-control-lg(v-for="(item, index) in pmData" :key="`question${index}`")
				input.custom-control-input(type="checkbox" :id="`q${index}`" :value="index" v-model="questions")
				label.custom-control-label(:for="`q${index}`") {{`0${index + 1} ${item.length}題`}}
			button.btn.btn-lg.btn-block.btn-success(@click.prevent="onTest") 測驗開始
		Practice(v-else-if="type == 'step2'" :questions="testQuestions" :callback="onBack" )
</template>
<script>
import axio from 'axios'
import Practice from '@/components/practice/Index.vue'
export default {
	data () {
		return {
			pmData: [],
			questions: [],
			testQuestions: [],
			type: 'step1'
		}
	},
	components: {
		Practice
	},
	mounted () {
		axio.get('/json/pm.json').then(response => {
			this.pmData = [...response.data]
		})
	},
	methods: {
		onTest () {
			this.testQuestions = []
			this.questions.forEach(index => {
				this.testQuestions = this.testQuestions.concat(this.pmData[index])
			})
			this.type = 'step2'
		},
		onBack () {
			this.type = 'step1'
		}
	}
}
</script>
<style lang="scss">
</style>
