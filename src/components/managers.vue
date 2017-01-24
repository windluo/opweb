<template>
	<curposition>
		<span slot='ptitle'>基金产品</span>
		<span slot='ctitle'>{{curpostitle}}</span>
	</curposition>
</template>

<script>
	import curposition from './comms/curposition.vue'

	export default{
		data (){
			return {
				curpostitle: ''
			}
		},

		components: {
  			curposition
  		},

  		methods: {

  		},

  		mounted (){
  			this.curpostitle = '基金经理';
  		}
	}
</script>