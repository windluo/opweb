<template>
	<div>
		<curposition>
			<span slot='ptitle'>管理人详情详情</span>
			<span slot='ctitle'>{{curpostitle}}</span>
		</curposition>
	</div>
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
		}
	}
</script>