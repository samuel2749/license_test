<template lang="pug">
	.text-center(v-if="!erpData.length")
		button.btn.btn-primary(disabled)
			span.spinner-border.spinner-border-sm(role="status" aria-hidden="true")
			|Loading...
	.pm.container(v-else)
		h1.text-center ERP 測試
		template(v-if="type == 'step1'")
			.row
				.form-inline
					.form-group.col-3
						label.col-form-label 題數：
					.form-group.col-3
						input.form-control(type="number" v-model="startNum")
					.form-group.col-1 到
					.form-group.col-3
						input.form-control(type="number" v-model="endNum")
			button.btn.btn-lg.btn-block.btn-success(@click.prevent="onTest") 測驗開始
		Practice(v-else-if="type == 'step2'" :questions="testQuestions" :callback="onBack" )
</template>
<script>
import axio from 'axios'
import Practice from '@/components/practice/Index.vue'
export default {
	data () {
		return {
			erpData: [],
			testQuestions: [],
			type: 'step1',
			startNum: 1,
			endNum: 50
		}
	},
	components: {
		Practice
	},
	mounted () {
		axio.get('/json/erp.json').then(response => {
			this.erpData = [...response.data[0]]
		}).catch(error => {
			console.log(error)
		})
	},
	methods: {
		onTest () {
			var msg = `數字需介於1~${this.erpData.length}`
			if (this.startNum < 1 || this.startNum > this.erpData.length) {
				window.alert(`開始${msg}}`)
				return
			}
			if (this.endNum < 1 || this.endNum > this.erpData.length) {
				window.alert(`結束${msg}}`)
				return
			}
			this.testQuestions = []
			for (let qNum = this.startNum; qNum <= this.endNum; qNum++) {
				this.testQuestions.push(this.erpData[qNum - 1])
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
