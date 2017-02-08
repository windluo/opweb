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
			logout () {
				let that = this;
				gl.fn.logOut({http: that.$http});
			},

			getSession () {
				let that = this;
				let xpbtoken = gl.fn.getCookie("xpbtoken") || "";

				gl.fn.getData({
					http: that.$http,
					url: gl.domain.session,
					options: {
						headers: {xpbtoken: xpbtoken}
					},
					successfn: function(data){
						that.username = data.data.nickname || data.data.email;
						//第一次登录，初始化菜单
						gl.fn.limitUser({
							http: that.$http,
							url: gl.domain.aclurls,
							successfn: function(data){
								if(data.dataList[0] != "*"){
									//受限用户
									that.$store.dispatch('setLimitusertype', 2);
								}else{
									//非受限用户
									that.$store.dispatch('setLimitusertype', 1);
								}
							}
						})
					}
				})
			}
		},

		mounted (){
			this.getSession();
		}
	}
</script>