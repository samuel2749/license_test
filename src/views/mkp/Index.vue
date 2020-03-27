<script>
import axio from 'axios'
import erp from '../erp/Index'
export default {
	extends: erp,
	data () {
		return {
			title: 'MKP'
		}
	},
	mounted () {
	},
	methods: {
		getJson () {
			axio.get('/json/mkp.json').then(response => {
				this.list = [...response.data[0]]
			})
		}
	}
}
</script>
