<template>
	<div>
		<curposition>
			<span slot='ptitle'>基金产品</span>
			<span slot='ctitle'>{{curpostitle}}</span>
		</curposition>

		<div class="mod-c">
			<el-row :gutter="10">
				<el-col :xs="12" :sm="12" :md="12" :lg="12">
		            <div class="grid-content grid-content-ex">
		                <span class="title-sp">基金管理人</span>
		                <div class="dropdown-c el-icon-caret-bottom el-icon--right" @click="showSelect()">
		                    <span class="dropdown-val">{{getMcManagers.name}}</span>
		                </div>
		            </div>
		        </el-col>
		        <el-col :xs="24" :sm="24" :md="24" :lg="24">
		            <div class="mc-list-c">
		                <div class="mc-list" v-show="showflag">
		                    <mclists :whichmc='whichmc'></mclists>
		                </div>
		            </div>
		        </el-col>
	        </el-row>
		</div>
		<managerlists :tonew="tonew" :whichmanager="whichmanager"></managerlists>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import curposition from './comms/curposition.vue'
	import mclists from './comms/mclists.vue'
	import managerlists from './comms/managerlists.vue'
	import { MC_MANAGERS, MANAGERS_MANAGERS } from '../libs/types.js'

	export default{
		data (){
			return {
				curpostitle: '',
				whichmc: MC_MANAGERS,
				whichmanager: MANAGERS_MANAGERS,
				showflag: false,
				tonew: true
			}
		},

		computed: {
            ...mapGetters([
                'getMcManagers'
            ])
        },

        watch: {
            getMcManagers (){
                this.showflag = false;
            }
        },

		components: {
  			curposition, mclists, managerlists
  		},

  		methods: {
  			showSelect (){
  				this.showflag = !this.showflag;
  			}
  		},

  		mounted (){
  			this.curpostitle = '基金经理';
  		}
	}
</script>