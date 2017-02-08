import * as types from './types'

//获取当前用户名
export function getLimitusertype (state){
	return state.limitusertype
}

//获取基金详情页的基金管理人
export function getMcFund(state){
	return state[types.MC_FUND]
}

//基金详情页的投顾管理人
export function getImcFund(state){
	return state[types.IMC_FUND]
}

//基金经理页的管理人
export function getMcManagers(state){
	return state[types.MC_MANAGERS]
}

//基金经理页的经理
export function getManagerManagers(state){
	return state[types.MANAGERS_MANAGERS]
}

//产品详情页的经理
export function getManagerFund(state){
	return state[types.MANAGERS_FUND]
}