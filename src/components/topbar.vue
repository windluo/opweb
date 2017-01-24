<template>
	<div class="topbar">
		<div class="user-info">
			<span class="user-name">张三那封</span>
			<a href="javascipt:void(0);" class="btn-a" @click="logout">退出</a>
		</div>
	</div>
</template>

<script>
	export default{
		methods: {
			logout: () => console.log("退出")
		}
	}
</script>