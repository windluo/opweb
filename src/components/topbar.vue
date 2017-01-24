<template>
	<div class="topbar">
		<div class="user-info">
			<span class="user-name">{{username}}</span>
			<a href="javascipt:void(0);" class="btn-a" @click="logout">退出</a>
		</div>
	</div>
</template>

<script>
	export default{
		data (){
			return {
				username: ''
			}
		},

		methods: {
			logout: () => console.log("退出"),

			getUsername () {
				this.username = this.$store.state.username;
			}
		},

		mounted (){
			this.getUsername();
		}
	}
</script>