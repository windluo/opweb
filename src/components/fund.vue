<template>
	<div>
		<curposition>
			<span slot='ptitle'>基金产品</span>
			<span slot='ctitle'>{{curpostitle}}</span>
		</curposition>

		<div class="mod-c">
            <p class="title">管理人类型</p>
            <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <div class="grid-content grid-content-ex">
                        <span class="title-sp">管理类型</span>
                        <div class="dropdown-c required el-icon-caret-bottom el-icon--right" @click="showSelect('managerType')">
                            <span class="dropdown-val">{{managerTypestr}}</span>
                            <ul class="dropdown-ul" v-show="showflag=='managerType'">
                                <li class="dropdown-li" v-for="(data, index) in initvalue.managerType" @click="choseSelect('managerType', index)">{{data.value}}</li>
                            </ul>
                        </div>
                    </div>
                </el-col>

                <el-col :xs="12" :sm="12" :md="12" :lg="12">
                    <div class="grid-content grid-content-ex">
                        <span class="title-sp">基金管理人</span>
                        <div class="dropdown-c el-icon-caret-bottom el-icon--right" :class="{required: managerType==3||managerType==4||managerType==5}" @click="showSelect('MC_FUND')">
                            <span class="dropdown-val">{{getMcFund.name}}</span>
                            <a class="cancel-a" @click.stop="cancelSelect('MC_FUND')" v-show="managerType!=3&&managerType!=4&&managerType!=5">×</a>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="12">
                    <div class="grid-content grid-content-ex grid-content-right">
                        <span class="title-sp">投资顾问</span>
                        <div class="dropdown-c el-icon-caret-bottom el-icon--right" :class="{required: managerType==2}" @click="showSelect('IMC_FUND')">
                            <span class="dropdown-val">{{getImcFund.name}}</span>
                            <a class="cancel-a" @click.stop="cancelSelect('IMC_FUND')" v-show="managerType!=2">×</a>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <div class="mc-list-c">
                        <div class="mc-list" v-show="showflag=='MC_FUND'||showflag=='IMC_FUND'">
                            <mclists :whichmc='whichmc'></mclists>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="mod-c mtop">
            <p class="title">基金经理</p>
            <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <!-- <div class="grid-content grid-content-ex">
                        <div class="dropdown-c el-icon-caret-bottom" @click="showSelect('MC_FUND')">
                            <span class="dropdown-val">{{getMcFund.name}}</span>
                            <a class="cancel-a" @click.stop="cancelSelect('MC_FUND')" v-show="managerType!=3&&managerType!=4&&managerType!=5">×</a>
                        </div>
                    </div> -->
                </el-col>
            </el-row>
        </div>
	</div>
</template>

<script>
    import { mapGetters } from 'vuex'
	import curposition from './comms/curposition.vue'
    import mclists from './comms/mclists.vue'
    import { MC_FUND, IMC_FUND } from '../libs/types.js'
    import initvalue from '../libs/initvalue.js'

	export default{
		data (){
			return {
				id: '',
				curpostitle: '',
                managerType: '',
                managerTypestr: '',
                showflag: false,
                whichmc: ''
			}
		},

        computed: {
            initvalue (){
                return initvalue;
            },

            ...mapGetters([
                'getMcFund',
                'getImcFund'
            ])
        },

        watch: {
            getMcFund (){
                this.showflag = false;
            },

            getImcFund (){
                this.showflag = false;
            }
        },

		components: {
  			curposition, mclists
  		},

  		methods: {
  			getId (){
  				this.id = this.$route.query.id;
  				this.setCurposition();
  			},

  			setCurposition (){
  				if(this.id){
  					//有ID，显示对应的名称
  					this.curpostitle = '产品' + this.id;
                    //获取对应的数据
                    this.getDetails();
  				}else{
  					//没有ID，新增产品
  					this.curpostitle = '新增产品';
  				}
  			},

            getDetails (){

            },

            showSelect (type){
                if(!this.showflag){
                    this.showflag = type;
                }else{
                    if(this.showflag != type) this.showflag = type;
                    else this.showflag = false;
                }
                if(type == 'MC_FUND') this.whichmc = MC_FUND;
                if(type == 'IMC_FUND') this.whichmc = IMC_FUND;
            },

            cancelSelect (type){
                switch(type){
                    case 'MC_FUND':
                        this.whichmc = MC_FUND;
                        this.$store.dispatch('setCurManagerCompany', {data: {}, whichmc: this.whichmc});
                        break;
                    case 'IMC_FUND':
                        this.whichmc = IMC_FUND;
                        this.$store.dispatch('setCurManagerCompany', {data: {}, whichmc: this.whichmc});
                        break;
                    default: break;
                }
            },

            choseSelect (type, index){
                switch(type){
                    case 'managerType': 
                        //顾问管理必有投资顾问
                        //受托管理、主动管理、被动管理必有基金管理人
                        //其他情况待定
                        this.managerTypestr = initvalue.managerType[index].value;
                        this.managerType = initvalue.managerType[index].id;
                        break;
                    default: break;
                }
            },

            getManagers (){

            }
  		},

  		mounted (){
  			this.getId();
  		}
	}
</script>