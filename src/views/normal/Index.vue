<template lang="pug">
	.text-center(v-if="!list.length")
		button.btn.btn-primary(disabled)
			span.spinner-border.spinner-border-sm(role="status" aria-hidden="true")
			|Loading...
	.pm.container-fluid(v-else)
		template(v-if="type == 'step1'")
			h1.text-center {{title}}
			.row.h5 選擇題數：
				button.btn.btn-sm.btn-success(@click="onAllTest") 全部
			.form-row.form-inline.mb-2
				.form-group.col-3
					input.form-control.col(type="tel" v-model.number="startNum")
				.form-group.col-1 到
				.form-group.col-3
					input.form-control.col(type="tel" v-model.number="endNum")
			.row.h5 模式：
			.form-row.form-inline.mb-2
				.custom-control.custom-radio.custom-control-inline.mr-5
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
					input.form-control.col-5(type="tel" v-model.number="qNum" :disabled="countType=='all'")
			button.btn.btn-lg.btn-success.my-3(:class="{'btn-block': isMobile}" @click.prevent="onTest") {{startBtnValue}}
		template(v-else-if="type == 'step2'")
			.row
				.h5 {{title}}：
					button.btn.btn-sm.btn-secondary.ml-2(@click="onBack") 返回
			Practice(v-if="isTest" :questions="testQuestions" :callback="onBack" :total="total")
			Reading(v-else :questions="testQuestions" :callback="onBack")
</template>
<script>
import axio from 'axios'
import Practice from '@/components/practice/Index.vue'
import Reading from '@/components/reading/Index.vue'
import TestList from '@/constants/list.js'
export default {
	data () {
		return {
			title: '',
			list: [],
			testQuestions: [],
			type: 'step1',
			startNum: 1,
			endNum: 50,
			countType: 'all',
			modeType: 'test',
			qNum: 50,
			total: 0
		}
	},
	components: {
		Practice,
		Reading
	},
	watch: {
		$route: {
			immediate: true,
			handler (newValue, oldValue) {
				this.checkTestType()
			}
		}
	},
	mounted () {
	},
	computed: {
		isMobile () {
			return this.$store.state.isMobile
		},
		isTest () {
			return this.modeType === 'test'
		},
		startBtnValue () {
			return this.isTest ? '開始測試' : '開始閱讀'
		}
	},
	methods: {
		checkTestType () {
			let obj = TestList[this.$route.params.type]
			if (!obj) {
				window.alert('目前沒有該測驗資料，請重新選取！')
				this.$router.push('/')
				return
			}
			this.title = obj.title
			this.getJson(obj.jsonPath)
		},
		getJson (path) {
			axio.get(`/json/${path}`).then(response => {
				this.list = [...response.data[0]]
				this.onBack()
			})
		},
		onAllTest () {
			this.startNum = 1
			this.endNum = this.list.length
		},
		onTest () {
			let qTotal = 0
			let msg = `數字需介於1~${this.list.length}`
			if (this.startNum < 1 || this.startNum > this.list.length) {
				window.alert(`開始${msg}}`)
				return
			}
			if (this.endNum < 1 || this.endNum > this.list.length) {
				window.alert(`結束${msg}}`)
				return
			}
			this.testQuestions = []
			for (let tempNum = this.startNum; tempNum <= this.endNum; tempNum++) {
				qTotal += 1
				this.testQuestions.push(this.list[tempNum - 1])
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
