import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types.js'
import * as getters from './getters'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
	limitusertype: -1,			//用户类型：-1未知，1可访问所有页面，2受限用户（目前仅可访问产品列表页、详情页）
	MC_FUND: types.MC_FUND,		//基金详情页的基金管理人
	IMC_FUND: types.IMC_FUND,	//基金详情页的投顾管理人
	MC_MANAGERS: types.MC_MANAGERS,		//基金经理也的管理人
	MANAGERS_MANAGERS: types.MANAGERS_MANAGERS,
	MANAGERS_FUND: types.MANAGERS_FUND
}

const mutations = {
	[types.SET_LIMITUSERTYPE] (state, data){
		state.limitusertype = data;
	},

	[types.SET_CURMANAGERCOMPANY] (state, payload){
		state[payload.whichmc] = payload.data;
	},

	[types.SET_MANAGERS] (state, payload){
		state[payload.whichmanager] = payload.data;
	}
}

export default new Vuex.Store({
	state,
	getters,
  	actions,
	mutations
})