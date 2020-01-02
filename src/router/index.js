import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import ERP from '@/views/erp/Index.vue'
import PM from '@/views/pm/Index.vue'
import EBC from '@/views/ebc/Index.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/ebc',
		name: 'ebc',
		component: EBC
	},
	{
		path: '/erp',
		name: 'erp',
		component: ERP
	},
	{
		path: '/pm',
		name: 'pm',
		component: PM
	}
]

const router = new VueRouter({
	routes
})

export default router
