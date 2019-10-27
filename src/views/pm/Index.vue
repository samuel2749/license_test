<template lang="pug">
	.pm.container
		h1.text-center 專案管理 測試
		.row.custom-control.custom-checkbox.form-control-lg(v-for="(item, index) in pmData" :key="`question${index}`")
			input.custom-control-input(type="checkbox" :id="`q${index}`" :value="item" v-model="questions")
			label.custom-control-label(:for="`q${index}`") {{`0${index + 1} ${item.length}題`}}
		button.btn.btn-lg.btn-block.btn-success(@click.prevent="onTest") 測驗開始
</template>
<script>
import axio from 'axios'
export default {
	data () {
		return {
			pmData: [],
			questions: [],
			testQuestions: [],
			type: 'step1'
		}
	},
	mounted () {
		axio.get('/json/pm.json').then(response => {
			this.pmData = [...response.data]
		}).catch(error => {
			console.log(error)
		})
	},
	methods: {
		onTest () {
			this.testQuestions = []
			this.questions.forEach(item => {
				this.testQuestions = this.testQuestions.concat(item)
			})
		}
	}
}
</script>
<style lang="scss">
</style>
