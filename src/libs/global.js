import Vue from 'vue'
let gl = {};

gl.domain = {
	logout: "/sso/api/users/logout",
	session: "/op/api/users/session",
	aclurls: "/op/api/users/acl/urls",
	funds: "/op/api/funds",
	managers: "/op/api/managers",
	managerCompanys: "/op/api/managerCompanys"
}

gl.fn = {
	referLink (url){
		//用来防IE下a标签异常
		let reg = new RegExp(/(edge)\/((\d+)?[\w\.]+)/i); //edge
		if( !!window.ActiveXObject || "ActiveXObject" in window || reg.test(navigator.userAgent) ){ 
		    let referLink = document.createElement('a');
		    referLink.href = url;
		    document.body.appendChild(referLink);
		    referLink.style.display = "none";
		    referLink.click();
		}else{
			window.location.href = url;
		}	
	},

	comfirm (msg){
		//引用ElementUI
		Vue.prototype.$confirm(msg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            gl.fn.referLink("/sso");
        }).catch(() => {

        })
	},

	logOut (opts){
		let xpbtoken = gl.fn.getCookie("xpbtoken");
		let domain = "";
		if(location.hostname.indexOf("xinpibao.com") != -1){
			domain = "domain=.xinpibao.com;";
		}
        gl.fn.setCookie("xpbtoken", "clean", domain);

		opts.url = gl.domain.logout;
		opts.options = {
			headers: {xpbtoken: xpbtoken}
		}

		opts.http.get(opts.url, opts.options).then(res => {
			if(res.data.code == 0){
				gl.fn.referLink("/sso");
			}else{
				gl.fn.comfirm(res.data.message || '连接失败')
			}
		})
	},

	offline (){
        gl.fn.comfirm('当前用户未登录，请前往登录')
	},

	limitUser (opts){
		gl.fn.getData(opts);
	},

	getData (opts){
		//vue-resource get 数据
		//http: this.$http，url: 数据源地址，data: 提给后台的数据，转换后的数据
		//successfn: 成功回调，failfn: 失败回调
		opts.http.get(opts.url, opts.options||{}).then(res => {
			if(res.data.code == 0){
				//有可能存在code为0，data不存在的情况
				let data = res.data.data || res.data.dataList;
				if(!data) gl.fn.offline();
				if(data && typeof opts.successfn == 'function') opts.successfn(res.data);
			}else if(res.data.code == -102){
				//
				gl.fn.offline();
			}else{
				//其他异常情况处理
				console.log(res.data.message);
			}
		}, res=> {
			// error callback
			
		})
	},

	setCookie (name, value, domain){ 
	    let Days = 1/48; 
	    let exp = new Date(); 
	    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
	    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ";path=/;" + domain;
	},

	getCookie (name){ 
	    let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	 
	    if(arr=document.cookie.match(reg)){
	        return unescape(arr[2]);
	    }
	    else 
	        return null; 
	},

	delCookie (name){ 
	    let exp = new Date(); 
	    exp.setTime(exp.getTime() - 1); 
	    let cval = gl.fn.getCookie(name);
	    if(cval!=null){
	        document.cookie= name + "=" + cval+";expires=" + exp.toGMTString() + ";path=/"; 
	    }
	},

	/*转换日期*/
	dateConvert (str){
		if(!str) return;
		return str.split(" ")[0].substr(0, 4) + "-" + str.split(" ")[0].substr(4, 2) + "-" + str.split(" ")[0].substr(6, 2);
	},

	limittext (val, len){
		if(!val) return;
		if(val.length <= len) return val;

		return val.substr(0, len) + "...";
	},

	// testImg(val){
	// 	var reg = /^(.*)\.(jpg|jpeg|png)$/;
	// 	return reg.test(val);
	// }
	testImg (val){
		var reg = /^image\/(jpg|jpeg|png)$/;
		return reg.test(val);
	}
}

module.exports = gl;