<script>
import axio from 'axios'
import erp from '../erp/Index'
export default {
	extends: erp,
	data () {
		return {
			title: '推土機'
		}
	},
	mounted () {
	},
	methods: {
		getJson () {
			axio.get('/json/bulldozer.json').then(response => {
				this.list = [...response.data[0]]
			})
		}
	}
}
</script>
