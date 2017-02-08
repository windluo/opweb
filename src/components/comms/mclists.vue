<template>
	<div class="mod-c">
		<div class="search-c">
			<el-input v-model="key" size="small" placeholder="请输入内容"  @keyup.enter.native='search'></el-input>
			<el-button type="primary" size="small" icon="search" @click='search'>搜索</el-button>
			<router-link :to='{path: "/company"}' class="add-a" v-if="tonew">新增管理人</router-link>
			<el-checkbox v-model="checked" checked @change="displayFn">不显示隐藏的产品</el-checkbox>
		</div>
		<el-table
			v-loading="showloading"
    		element-loading-text="拼命加载中"
		    :data="tableData"
		    :stripe="true"
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
		      		<router-link :to='{path: "/company", query: {id: scope.row.id}}' v-if="tonew">{{scope.row.name}}</router-link>
		      		<a class="btn-a" @click="getcurmc(scope.row)" v-if="!tonew">{{scope.row.name}}</a>
		      	</template>
		    </el-table-column>
		    <el-table-column
		      	prop="registNo"
		      	align="center"
		      	label="编号"
		      	width="180px">
		    </el-table-column>
		    <el-table-column
		      	prop="establishDate"
		      	align="center"
		      	label="成立日期"
		      	width="180px">
		    </el-table-column>
		</el-table>
		<el-pagination
	      	@size-change="handleSizeChange"
	      	@current-change="handleCurrentChange"
	      	:current-page="currentPage"
	      	:page-size="size"
	      	layout="total, prev, pager, next, jumper"
	      	:total="total">
	    </el-pagination>
	</div>
</template>

<script>
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
  				display: true		//true=不包含隐藏的基金产品，不设置表示查询所有基金产品
  			}
  		},

  		props: [
  			'tonew',		//是否显示新增按钮，仅管理人列表页需要新增按钮
  			'whichmc'		//当前是谁要用mc
  		],

  		methods: {
  			handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		    },

		    handleCurrentChange(val) {
		        this.currentPage = val;
		        this.getLists();
		    },

		    search (){
		    	//重置当前页为1
		    	this.currentPage = 1;
		    	this.getLists();
		    },

		    displayFn (){
		    	//重置当前页为1
		    	this.currentPage = 1;
		    	this.display = this.checked ? true : '';
		    	this.getLists();
		    },

		    getLists (){
		    	this.showloading = true;
		    	//获取数据列表
		    	var that = this;
		    	var url = gl.domain.managerCompanys + "?from=" + (that.currentPage - 1) * that.size + "&display=" + that.display + "&key=" + that.key;
		    	gl.fn.getData({
		    		http: that.$http,
		    		url: url,
		    		successfn: function(data){
		    			that.tableData = data.dataList;
		    			that.total = data.total;
		    			that.size = data.size;

		    			that.dataConvert();
		    			that.showloading = false;
		    		}
		    	})
		    },

		    dataConvert (){
		    	for(var i = 0; i < this.tableData.length; i++){
		    		this.tableData[i].index = ((this.currentPage - 1) * this.size + i + 1);
		    		this.tableData[i].establishDate = gl.fn.dateConvert(this.tableData[i].establishDate);
		    	}
		    },

		    getcurmc (data){
		    	this.$store.dispatch('setCurManagerCompany', {data: data, whichmc: this.whichmc});
		    }
  		},

  		mounted (){
  			this.getLists();
  		}
  	}
</script>