<template>
	<div>
		<curposition>
			<span slot='ptitle'>基金产品</span>
			<span slot='ctitle'>基金产品列表</span>
		</curposition>

		<flists :tonew='tonew'></flists>
	</div>
</template>

<script>
	import curposition from './comms/curposition.vue'
	import flists from './comms/flists.vue'

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
  				tonew: true 		//是否显示新增按钮，仅产品列表页需要
  			}
  		},

  		components: {
  			curposition, flists
  		}
  	}
</script>