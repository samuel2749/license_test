<template lang="pug">
	.text-center(v-if="!erpData.length")
		button.btn.btn-primary(disabled)
			span.spinner-border.spinner-border-sm(role="status" aria-hidden="true")
			|Loading...
	.pm.container(v-else)
		template(v-if="type == 'step1'")
			h1.text-center ERP
			.row.h5 選擇題數：
			.row.form-inline
				.form-group.col-3
					label.col-form-label 題數：
				.form-group.col-3
					input.form-control(type="number" v-model="startNum")
				.form-group.col-1 到
				.form-group.col-3
					input.form-control(type="number" v-model="endNum")
			.row.h5 模式：
				.custom-control.custom-radio.custom-control-inline
					input.custom-control-input(type="radio" id="radio-read" name="mode" value="read" v-model="modeType")
					label.custom-control-label(for="radio-read") 閱讀
				.custom-control.custom-radio.custom-control-inline
					input.custom-control-input(type="radio" id="radio-test" name="mode" value="test" v-model="modeType")
					label.custom-control-label(for="radio-test") 測試
			.row.h5 測驗題數：
			.form-row.form-inline(:class="{'form-uncontrol': !isTest}")
				.custom-control.custom-radio.custom-control-inline
					input.custom-control-input(type="radio" id="radio-all" name="testTotal" value="all" v-model="countType")
					label.custom-control-label(for="radio-all") 全部
				.col-8.form-inline
					.custom-control.custom-radio.custom-control-inline
						input.custom-control-input(type="radio" id="radio-num" name="testTotal" value="limit" v-model="countType")
						label.custom-control-label(for="radio-num") 題數
					input.form-control.col-5(type="text" v-model="qNum" :disabled="countType=='all'")
			button.btn.btn-lg.btn-block.btn-success.my-3(@click.prevent="onTest") {{startBtnValue}}
		template(v-else-if="type == 'step2'")
			.row
				.h5 ERP：
					button.btn.btn-sm.btn-secondary.ml-2(@click="onBack") 返回
			Practice(v-if="isTest" :questions="testQuestions" :callback="onBack" :total="total")
			Reading(v-else :questions="testQuestions" :callback="onBack")
</template>
<script>
import axio from 'axios'
import Practice from '@/components/practice/Index.vue'
import Reading from '@/components/reading/Index.vue'
export default {
	data () {
		return {
			erpData: [],
			testQuestions: [],
			type: 'step1',
			startNum: 1,
			endNum: 50,
			countType: 'all',
			modeType: 'read',
			qNum: 50,
			total: 0
		}
	},
	components: {
		Practice,
		Reading
	},
	mounted () {
		axio.get('/json/erp.json').then(response => {
			this.erpData = [...response.data[0]]
		})
	},
	computed: {
		isTest () {
			return this.modeType === 'test'
		},
		startBtnValue () {
			return this.isTest ? '開始測試' : '開始閱讀'
		}
	},
	methods: {
		onTest () {
			let qTotal = 0
			let msg = `數字需介於1~${this.erpData.length}`
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
				qTotal += 1
				this.testQuestions.push(this.erpData[qNum - 1])
			}
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
	.form-uncontrol{
		position: relative;
		opacity: 0.5;
		&::after{
			content: '';
			position: absolute;
			display: block;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 10;
		}
	}
</style>
