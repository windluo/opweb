<template>
	<div>
		<curposition>
			<span slot='ptitle'>基金管理人</span>
			<span slot='ctitle'>基金管理人列表</span>
		</curposition>

		<mclists :tonew='tonew'></mclists>
	</div>
</template>

<script>
	import curposition from './comms/curposition.vue'
	import mclists from './comms/mclists.vue'

  	export default{
  		data (){
  			return {
  				key: '',
  				showloading: true,
  				tableData: [],
  				total: 0,	//总数
  				size: 0,	//每页数量
  				currentPage: 1,		//当前页
  				checked: true,
  				display: true,		//true=不包含隐藏的基金产品，不设置表示查询所有基金产品
  				tonew: true 	//是否显示新增按钮
  			}
  		},

  		components: {
  			curposition, mclists
  		}
  	}
</script>