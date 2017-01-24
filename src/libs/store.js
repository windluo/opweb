import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	username: "张三丰"
}

const mutations = {

}

export default new Vuex.Store({
	state,
	mutations
})