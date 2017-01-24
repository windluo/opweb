<template>
	<div>
		<curposition>
			<span slot='ptitle'>基金产品</span>
			<span slot='ctitle'>{{curpostitle}}</span>
		</curposition>

		<p>我是产品{{id}}</p>
	</div>
</template>

<script>
	import curposition from './comms/curposition.vue'

	export default{
		data (){
			return {
				id: "",
				curpostitle: ""
			}
		},

		components: {
  			curposition
  		},

  		methods: {
  			getId (){
  				this.id = this.$route.query.id;
  				this.setCurposition();
  				console.log(this.curpostitle);
  			},

  			setCurposition (){
  				if(this.id){
  					//有ID，显示产品名
  					this.curpostitle = '产品' + this.id;
  				}else{
  					//没有ID，新增产品
  					this.curpostitle = '新增产品';
  				}
  			}
  		},

  		mounted (){
  			this.getId();
  		}
	}
</script>