<template lang="pug">
	.practice.container(v-if="isStart")
		.row
			.h3.text-primary {{`Q${qNum}:`}}
				span.p-2(v-if="!isQuestion" :class="{'text-success': isCorrect, 'text-danger': !isCorrect}") ({{isCorrect? '答對': '答錯'}})
		.row
			.h3.text-primary {{nowQuestion.question}}
		.row
			.col-12.custom-control.h4(v-for="(item, index) in nowQuestion.option" :key="`option${index}`" :class="{'custom-radio': isRadio, 'custom-checkbox': !isRadio}")
				input.custom-control-input(:type="isRadio? 'radio': 'checkbox'" :name="isRadio? 'radio': false" :id="`answer${index}`" :value="(index + 1).toString()" v-model="answers" :disabled="!isQuestion")
				label.custom-control-label.p-1.custom-style-label(:for="`answer${index}`" :class="getOptionOtherClass(index + 1)") {{item}}
				.clearfix
		.row
			button.btn.btn-lg.btn-block.btn-success(@click.prevent="checkAnswer" v-if="isQuestion") 確認
			button.btn.btn-lg.btn-block.btn-info(@click.prevent="nextQuestion" v-else) {{!isEnd? '下一題': '看結果'}}
	.practice.container(v-else)
		.row
			.h3 總題數 {{total}}
			.h3.text-success 答對 {{correctCount}} 題
			.h3.text-danger 答錯 {{total - correctCount}} 題
		.row
			button.btn.btn-lg.btn-block.btn-success(@click.prevent="randomTestList") 再測試一次
			button.btn.btn-lg.btn-block.btn-success(@click.prevent="callback") 返回
		.row.mt-3
			.h3 錯誤題目
			.col-12
				span.bg-info.text-white.ml-3 正確答案
				span.text-danger.ml-3 選擇的答案
			.container-fluid
				.card.row.mb-3.border-primary(v-for="(item, index) in reviewQuestions" :key="`rewivew-q-${index}`")
					.card-body
						h5.card-title.text-primary.font-weight-bold {{item.question}}
						p.card-text(
							v-for="(option, optionIndex) in item.option"
							:key="`option-${optionIndex}`"
							:class="optionIndex|answerFilter(item.answer, item.wrongAnswer)"
							) {{optionIndex+1}}：{{option}}
</template>
<script>
import _ from 'lodash'
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
			qNum: 0,
			testLists: [],
			answers: [],
			reviewQuestions: [],
			nowQuestion: false,
			type: 'ans',
			isStart: false,
			isCorrect: false,
			correctCount: 0
		}
	},
	watch: {
		questions: {
			handler (val) {
				val.length > 0 && this.randomTestList()
			},
			immediate: true
		}
	},
	mounted () {

	},
	filters: {
		answerFilter (val, arr, wrongArr) {
			// return arr.indexOf((val + 1) + '') > -1 ? 'bg-info text-white' : ''
			var classes = []
			if (arr.indexOf((val + 1) + '') > -1) {
				classes.push('bg-info')
				classes.push('text-white')
			}
			if (wrongArr.indexOf((val + 1) + '') > -1) {
				classes.push('text-danger')
			}
			return classes.join(' ')
		}
	},
	computed: {
		isEnd () {
			return this.testLists.length === 0
		},
		isQuestion () {
			return this.type === 'question'
		},
		isRadio () {
			return this.nowQuestion.answer.length === 1
		}
	},
	methods: {
		randomTestList () {
			let tempArr = []
			while (tempArr.length < this.questions.length) {
				tempArr.push(tempArr.length)
			}
			while (this.testLists.length < this.total) {
				let index = _.random(tempArr.length - 1)
				this.testLists.push(this.questions[tempArr[index]])
				tempArr.splice(index, 1)
			}
			this.correctCount = 0
			this.qNum = 0
			this.isStart = true
			this.reviewQuestions = []
			this.nextQuestion()
		},
		nextQuestion () {
			if (this.isEnd) {
				this.isStart = false
				return
			}
			this.answers = []
			this.nowQuestion = { ...this.testLists.shift() }
			this.qNum += 1
			this.type = 'question'
		},
		checkAnswer () {
			this.isCorrect = false
			if (this.isRadio) {
				if (this.answers === this.nowQuestion.answer[0]) {
					this.isCorrect = true
				}
			} else {
				let bol = this.answers.length === this.nowQuestion.answer.length
				bol && this.answers.forEach(item => {
					if (this.nowQuestion.answer.indexOf(item) === -1) {
						bol = false
					}
				})
				if (bol) {
					this.isCorrect = true
				}
			}
			if (this.isCorrect) {
				this.correctCount += 1
			} else {
				this.reviewQuestions.push(_.merge({ wrongAnswer: [].concat(this.answers) }, this.nowQuestion))
			}
			this.type = 'answer'
		},
		getOptionOtherClass (pStr) {
			pStr = pStr.toString()
			if (!this.isQuestion && this.nowQuestion.answer.indexOf(pStr) > -1) {
				let isCorrect = this.isRadio ? this.answers.toString() === pStr : this.answers.indexOf(pStr) > -1
				let cssObj = { 'text-white': true, 'bg-success': isCorrect, 'bg-danger': !isCorrect }
				return cssObj
			} else {
				return false
			}
		}
	}
}
</script>
<style lang="scss">
	.practice{
		.custom-control {
			.custom-style-label{
				&::before, &::after{
					top: 10px;
				}
			}
		}
		.btn{
			margin-top: 20px;
		}
	}
</style>
