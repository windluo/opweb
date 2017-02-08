<template>
	<div class="mod-c">
		<div class="search-c">
			<router-link :to='{path: "/company"}' class="add-a ml0" v-if="tonew">新增经理</router-link>
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
		      	label="名称"
		      	width="180px">
		      	<template scope="scope">
		      		<a class="btn-a ml0" :class={notbtn:tonew} @click="getcurmanager(scope.row)">{{scope.row.name}}</a>
		      	</template>
		    </el-table-column>
		    <el-table-column
		      	prop="avatar"
		      	align="center"
		      	label="头像"
		      	width="180px">
		      	<template scope="scope">
		      		<div class="avatar-c"><img :src="scope.row.avatar"></div>
		      	</template>
		    </el-table-column>
		    <el-table-column
		      	prop="descriptionstr"
		      	align="center"
		      	label="描述">
		    </el-table-column>
		    <el-table-column
		      	align="center"
		      	label="操作"
		      	width="180px"
		      	v-if="tonew">
		      	<template scope="scope">
		      		<a class="btn-a" @click="editIt(scope.row)">编辑</a>
		      		<a class="btn-a" @click="delIt(scope.row)">删除</a>
		      	</template>
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

	    <el-dialog title="编辑基金经理" v-model="dialogshow" custom-class="dialog600">
		  	<el-form :model="getManagerManagers">
		    	<el-form-item label="名称" :label-width="formLabelWidth">
		      		<el-input v-model="getManagerManagers.name" auto-complete="off"></el-input>
		    	</el-form-item>
		    	<el-form-item label="头像" :label-width="formLabelWidth">
					<el-upload
					  	action="http://jsonplaceholder.typicode.com/posts/"
					  	type="drag"
					  	:thumbnail-mode="true"
					  	:on-preview="handlePreview"
					  	:on-remove="handleRemove"
					  	:before-upload="beforeUpload"
					  	:on-success="uploadSuccess"
					  	:default-file-list="fileList"
					>
					  	<i class="el-icon-upload"></i>
					  	<div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
					  	<div class="el-upload__tip" slot="tip">{{uploadmsg}}</div>
					</el-upload>
		    	</el-form-item>
		    	<el-form-item label="描述" :label-width="formLabelWidth">
		      		<div class="el-textara-c">
		      			<textarea class="el-textarea" v-model="getManagerManagers.description" auto-complete="off"></textarea>
		      		</div>
		    	</el-form-item>
		  	</el-form>
		  	<div slot="footer" class="dialog-footer">
		    	<el-button @click="dialogshow=false">取 消</el-button>
		    	<el-button type="primary" @click="dialogConfirm">确 定</el-button>
		  	</div>
		</el-dialog>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import '../../libs/vuefilter.js'

  	export default{
  		data (){
  			return {
  				showloading: true,
  				tableData: [],
  				total: 0,	//总数
  				size: 0,	//每页数量
  				currentPage: 1,		//当前页
  				dialogshow: false,
  				formLabelWidth: '80px',
  				fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
  				uploadmsg: '只能上传jpg/png文件，且不超过500kb'
  			}
  		},

  		props: [
  			'tonew',		//是否显示新增按钮，仅管理人列表页需要新增按钮
  			'whichmanager'		//当前是谁要用manager
  		],

  		computed: {
            ...mapGetters([
            	'getMcManagers',
                'getManagerManagers'
            ])
        },

        watch: {
        	getManagerManagers (){
        		
        	},

        	getMcManagers (val){
                this.getLists();
            }
        },

  		methods: {
  			handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
		    },

		    handleCurrentChange(val) {
		        this.currentPage = val;
		        this.getLists();
		    },

		    getLists (){
		    	this.showloading = true;
		    	//获取数据列表
		    	var that = this;
		    	var url = gl.domain.managers + "?from=" + (that.currentPage - 1) * that.size + "&mcId=" + that.getMcManagers.id;
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
		    		this.tableData[i].descriptionstr = gl.fn.limittext(this.tableData[i].description, 10);
		    	}
		    },

		    getcurmanager (data){
		    	// this.$store.dispatch('setCurManager', {data: data, whichmanager: this.whichmanager});
		    },

		    editIt (data){
		    	this.$store.dispatch('setCurManager', {data: data, whichmanager: this.whichmanager});
		    	this.dialogshow = true;
		    },

		    dialogConfirm (){
		    	this.dialogshow = false;
		    },

		    delIt (data){

		    },

		    handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },

		    handlePreview(file) {
		        console.log(file);
		    },

		    beforeUpload (file){
		    	console.log(file);
		    	if(file.size / 1024 > 500)  {
		    		this.uploadmsg = '文件过大，文件不得超过500KB';
		    		return false;
		    	}
		    	if(!gl.fn.testImg(file.type)){
		    		this.uploadmsg = '文件格式不对，仅限jpg、png';
		    		return false;
		    	}

		    	return true;
		    },

		    uploadSuccess (response, file, fileList){
		    	this.uploadmsg = '上传成功';
		    }
  		},

  		mounted (){
  			this.getLists();
  		}
  	}
</script>