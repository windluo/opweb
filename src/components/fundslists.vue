<template>
	<div>
		<curposition>
			<span slot='ptitle'>基金产品</span>
			<span slot='ctitle'>基金产品列表</span>
		</curposition>

		<div class="search-c">
			<el-input v-model="key" size="small" placeholder="请输入内容"></el-input>
			<el-button type="primary" size="small" icon="search" @click='search'>搜索</el-button>
			<router-link :to='{path: "/fund"}' class="add-a">新增产品</router-link>
		</div>
		<el-table
			v-loading="showloading"
    		element-loading-text="拼命加载中"
		    :data="tableData"
		    border
		    style="width: 100%">
		    <el-table-column
		      	prop="index"
		      	align="center"
		      	label="序号"
		      	width="180px">
		    </el-table-column>
		    <el-table-column
		      	prop="name"
		      	align="center"
		      	label="名称">
		      <template scope="scope">
		      		<router-link :to='{path: "/fund", query: {id: scope.row.id}}'>{{scope.row.name}}</router-link>
		      </template>
		    </el-table-column>
		    <el-table-column
		      	prop="code"
		      	align="center"
		      	label="编号">
		    </el-table-column>
		    <el-table-column
		      	prop="contactStartDate"
		      	align="center"
		      	label="成立日期">
		    </el-table-column>
		</el-table>
		<el-pagination
	      	@size-change="handleSizeChange"
	      	@current-change="handleCurrentChange"
	      	:current-page="currentPage3"
	      	:page-size="10"
	      	layout="total, prev, pager, next, jumper"
	      	:total="100">
	    </el-pagination>
	</div>
</template>

<script>
	import curposition from './comms/curposition.vue'

  	export default{
  		data (){
  			return {
  				key: '',
  				showloading: true,
  				tableData: [
  					{index: 1, id: "00001", name: '恒益富通3号证券投资基金1', code: 'SD1363', contactStartDate: '2015-12-14'},
  					{index: 1, id: "00002", name: '恒益富通3号证券投资基金2', code: 'SD2363', contactStartDate: '2015-12-14'},
  					{index: 1, id: "00003", name: '恒益富通3号证券投资基金3', code: 'SD3363', contactStartDate: '2015-12-14'}
  				],
  				currentPage1: 5,
		        currentPage2: 5,
		        currentPage3: 5,
		        currentPage4: 4
  			}
  		},

  		components: {
  			curposition
  		},

  		methods: {
  			handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		    },

		    handleCurrentChange(val) {
		        this.currentPage = val;
		        console.log(`当前页: ${val}`);
		    },

		    search (){
		    	console.log(this.key);
		    }
  		},

  		mounted (){
  			setTimeout(() => {
  				this.showloading = false;
  			}, 2000)
  		}
  	}
</script>