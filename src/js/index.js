import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from '../libs/store.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../css/index.css'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)

import topbar from '../components/topbar.vue'
import sidebar from '../components/sidebar.vue'
import main from '../components/main.vue'
import fundslists from '../components/fundslists.vue'
import fund from '../components/fund.vue'
import managers from '../components/managers.vue'
import managerCompanyList from '../components/managerCompanyList.vue'
import company from '../components/company.vue'

//不具名的情况下，不用link
//先配置好routes
//再创建 router 实例
//不然，视图死活不出来
const routes = [
	{
		path: '/',
		components: {
			topbar, sidebar, main
		},
		children: [
			{
				path: '/fundslists',
				component: fundslists
			},
			{
				path: '/fund',
				component: fund
			},
			{
				path: '/managers',
				component: managers
			},
			{
				path: '/managerCompanyList',
				component: managerCompanyList
			},
			{
				path: '/company',
				component: company
			}
		]
	}
]

//创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
	routes
})

new Vue({
	router,
	store,
  	el: '#app'
})