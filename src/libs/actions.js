import * as types from './types'

//设置用户权限
export const setLimitusertype = ({ commit }, data) => {
  	commit(types.SET_LIMITUSERTYPE, data)
}

//设置当前选中的基金管理人数据
export const setCurManagerCompany = ({ commit }, payload) => {
	commit(types.SET_CURMANAGERCOMPANY, payload)
}

//设置当前选中的基金管理人数据
export const setCurManager = ({ commit }, payload) => {
	commit(types.SET_MANAGERS, payload)
}