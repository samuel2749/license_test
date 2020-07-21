import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import PM from '@/views/pm/Index.vue'
import Normal from '@/views/normal/Index.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/pm',
		name: 'pm',
		component: PM
	},
	{
		path: '/normal/:type',
		name: 'normal',
		component: Normal
	}
]

const router = new VueRouter({
	routes
})

export default router
