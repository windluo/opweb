<template>
	<div>
        <div class="sidebar-c" v-if="$store.state.limitusertype==2">
            <el-row class="sidebar-tac">
                <el-col :span="24">
                    <el-menu default-active="2" class="el-menu-vertical-demo"
                        :default-active='defaultactive'
                        :router="true"
                        :theme='"dark"'
                        @select="handleSelect"
                        @open="handleOpen" 
                        @close="handleClose"
                    >
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>基金产品</template>
                            <el-menu-item index="/fundslists">产品列表</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
		<div class="sidebar-c" v-if="$store.state.limitusertype==1">
			<el-row class="sidebar-tac">
			  	<el-col :span="24">
			    	<el-menu default-active="2" class="el-menu-vertical-demo"
			    		:default-active='defaultactive'
			    		:router="true"
			    		:theme='"dark"'
			    		@select="handleSelect"
			    		@open="handleOpen" 
			    		@close="handleClose"
			    	>
			      		<el-submenu index="1">
			        		<template slot="title"><i class="el-icon-message"></i>基金产品</template>
				        	<el-menu-item index="/fundslists">产品列表</el-menu-item>
				        	<el-menu-item index="/managers">基金经理</el-menu-item>
			      		</el-submenu>
                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-message"></i>基金管理人</template>
                            <el-menu-item index="/managerCompanyList">管理人列表</el-menu-item>
                        </el-submenu>
			    	</el-menu>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
  	export default {
  		data (){
  			return {
  				defaultactive: ""
  			}
  		},

    	methods: {
    		handleSelect(key, keyPath){
    			console.log(key, keyPath);
    		},

      		handleOpen(key, keyPath) {
        		console.log(key, keyPath);
      		},

      		handleClose(key, keyPath) {
        		console.log(key, keyPath);
      		},

      		switchDefaultActive (path){
      			let res = "/index";		//默认首页
      			switch(path){
      				case "/fundslists":case "/fund": res = "/fundslists"; break;
      				case "/managers": res = "/managers"; break;
                    case "/managerCompanyList": res = "/managerCompanyList"; break;
      				default: res = "/index";break;
      			}

      			return res;
      		}
    	},

    	mounted (){
    		this.defaultactive = this.switchDefaultActive(this.$route.path);
    	}
  	}
</script>