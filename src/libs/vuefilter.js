import Vue from 'vue'

//限制文本长度
Vue.filter('limittext', function(value, end){
	console.log(value);
	return value.substr(0, end);
})