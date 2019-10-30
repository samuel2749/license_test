<template lang="pug">
	.text-center(v-if="!pmData.length")
		button.btn.btn-primary(disabled)
			span.spinner-border.spinner-border-sm(role="status" aria-hidden="true")
			|Loading...
	.pm.container(v-else)
		h1.text-center 專案管理 測試
		template(v-if="type == 'step1'")
			.row.h5 選擇測試章節：
			.row.custom-control.custom-checkbox.form-control-lg(v-for="(item, index) in pmData" :key="`question${index}`")
				input.custom-control-input(type="checkbox" :id="`q${index}`" :value="index" v-model="questions")
				label.custom-control-label(:for="`q${index}`") {{`0${index + 1} ${item.length}題`}}
			.row.h5 測驗題數：
			.form-row.form-inline
				.custom-control.custom-radio.custom-control-inline
					input.custom-control-input(type="radio" id="radio-all" name="testTotal" value="all" v-model="countType")
					label.custom-control-label(for="radio-all") 全部
				.col-8.form-inline
					.custom-control.custom-radio.custom-control-inline
						input.custom-control-input(type="radio" id="radio-num" name="testTotal" value="limit" v-model="countType")
						label.custom-control-label(for="radio-num") 題數
					input.form-control.col-5(type="text" v-model="qNum" :disabled="countType=='all'")
				button.btn.btn-lg.btn-block.btn-success.my-3(@click.prevent="onTest") 測驗開始
		Practice(v-else-if="type == 'step2'" :questions="testQuestions" :callback="onBack" :total="total")
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
			type: 'step1',
			countType: 'all',
			qNum: 50,
			total: 0
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
	computed: {
		questionTotal () {
			var total = 0
			this.questions.forEach(index => {
				total += this.pmData[index].length
			})
			return total
		}
	},
	methods: {
		onTest () {
			let qTotal = 0
			this.testQuestions = []
			if (this.questions.length === 0) {
				window.alert('請選擇章節!')
				return
			}
			this.questions.forEach(index => {
				let qArr = this.pmData[index]
				this.testQuestions = this.testQuestions.concat(qArr)
				qTotal += qArr.length
			})
			if (this.countType === 'all') {
				this.total = qTotal
			} else if (this.countType === 'limit') {
				if (this.qNum < 10) {
					window.alert('測試題數必須大於10')
					return
				}
				if (this.qNum > qTotal) {
					window.alert(`測試題數必須小於${qTotal}`)
					return
				}
				this.total = parseInt(this.qNum)
			}
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
