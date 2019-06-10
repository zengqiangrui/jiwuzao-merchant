function bodyScale() {
				var devicewidth = document.documentElement.clientWidth;
				var scale = devicewidth / 1440;
				document.body.style.zoom = scale;
			}
window.onload = window.onresize = function () {
	bodyScale();
};
layui.use(['form'], function () {
var form = layui.form
var msg = '不符合规则'
form.verify({
	require(value){
		value = value.trim()
		if(!value || /^\s$/.test(value)){
			return msg
		}
	},
	password(value){
		if(!/^[a-zA-Z0-9^%&',;=$\x22\(\)\[\]\|\{\}\+\-\*!@#_/<>\.:\?]{8,32}$/.test(value) || /^[0-9]*[1-9][0-9]*$/.test(value)){
			return '非纯数字8-32位'
		}
	},
	msCode(value){
		if(!/^[0-9]{6}$/.test(value)){
			return msg
		}
	},
	nickName(value){
		var temp = value.trim()
		if(!temp || /^\s$/.test(temp)){
			return '不能为空'
		}
		if(temp != value){
			return '汉字字母数字_-'
		}
		if(/^[0-9]*[1-9][0-9]*$/.test(temp)){
			return '不能是纯数字'
		}
		if(!/^[a-zA-Z0-9_-\u4e00-\u9fa5]{2,8}$/.test(value)){
			return '汉字字母数字_-(2-8位)'
		}
	},
	positive(value){
		if(!/^[0-9]*[1-9][0-9]*$/.test(value)){
			return msg
		}
	},
	decimal(value){
		if(!/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/.test(value)){
			return msg
		}
	},
	age(value){
		var temp = value.trim()
		if(!temp || /^\s$/.test(temp)){
			return '不能为空'
		}
		if(!/^((1[01][0-9])|(120)|([1-9][0-9])|([0-9]))$/.test(value)){
			return msg
		}
	},
	phone(value){
		if(!/^[1][0-9]{10}$/.test(value)){
			return msg
		}
	},
	idcard(value){
		if(!/^[1-9]\d{5}(19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$/.test(value)){
			return msg
		}
	},
	orderNo(value){
		var temp = value.trim()
		if(!temp || /^\s$/.test(temp)){
			return '不能为空'
		}
		if(/^[a-zA-Z0-9]{8,32}$/.test(value)){
			return msg
		}
	},
	trueName(value){
		if(!/^[\u4e00-\u9fa5]{2,15}$/.test(value)){
			return msg
		}
	},
	bankNo(value){
		if(parseInt(value) < 1000000000000000 || 999999999999999999 > parseInt(value)){
			return msg
		}
	},
	qq(value){
		var temp = value.trim()
		if(!temp || /^\s$/.test(temp)){
			return '不能为空'
		}
		if(!/^[1-9][0-9]{4,14}$/.test(value)){
			return msg
		}
	},
	wxId(value){
		var temp = value.trim()
		if(!temp || /^\s$/.test(temp)){
			return '不能为空'
		}
		if(!/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(value)){
			return msg
		}
	},
	url(value){
		var temp = value.trim()
		if(!temp || /^\s$/.test(temp)){
			return '不能为空'
		}
		if(!/^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/.test(value)){
			return msg
		}
	},
	stringMax20(value){
		var temp = value.trim()
		if(!temp || /^\s$/.test(temp)){
			return '不能为空'
		}
		if(value.length > 20){
			return '超过长度'
		}
	},
	stringMax250(value){
		var temp = value.trim()
		if(!temp || /^\s$/.test(temp)){
			return '不能为空'
		}
		if(value.length > 250){
			return '超过长度'
		}
	}
})
})
function htmlEncode(html) {
return html.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
}
function storageSet(key,value,interval,expire){
	if(interval && expire){
		var endTime = dateAdd(new Date(),interval,expire)
	}else{
		var endTime = dateAdd(new Date(),'y',100)
	}
	var obj = {
		data:value,
		endTime:endTime
	}
	localStorage.setItem(key,JSON.stringify(obj))
}
function storageGet(key){
	var content = localStorage.getItem(key)
	if(!content){
		return
	}
	if(!content.trim()){
		return
	}
	var obj = JSON.parse(content)
	if(obj.endTime < new Date().getTime()){
		return
	}
	return obj.data
}
function storageGetForce(key){
	var content = localStorage.getItem(key)
	if(!content){
		return
	}
	if(!content.trim()){
		return
	}
	var obj = JSON.parse(content)
	return obj.data
}
function storageRemove(key){
	localStorage.removeItem(key)
}
function dateFormat(date,format){
	if(!date){
		return ''
	}
	if((date+'').length == 13){
		date = new Date(parseInt(date))
	}
	if(date.getTime() == new Date(null).getTime() || !date.getTime()){
		return ''
	}
	var paddNum = function(num){
	  num += ""
	  return num.replace(/^(\d)$/,"0$1")
	}
	var cfg = {
	   yyyy : date.getFullYear()
	  ,MM : paddNum(date.getMonth() + 1)
	  ,dd : paddNum(date.getDate())
	  ,hh : paddNum(date.getHours())
	  ,mm : paddNum(date.getMinutes())
	  ,ss : paddNum(date.getSeconds())
	}
	format || (format = "yyyy-MM-dd hh:mm:ss")
	return format.replace(/([a-z])(\1)*/ig,function(m){return cfg[m]})
}

function dateAdd(date,interval, number) {
	if(!date){
		return ''
	}
	if((date+'').length == 13){
		date = new Date(parseInt(date))
	}
	number = parseInt(number)
    switch (interval) {
    case "y": {
        date.setFullYear(date.getFullYear() + number)
        return date.getTime()
        break
    }
    case "M": {
        date.setMonth(date.getMonth() + number)
        return date.getTime()
        break
    }
    case "d": {
        date.setDate(date.getDate() + number)
        return date.getTime()
        break
    }
    case "h": {
        date.setHours(date.getHours() + number)
        return date.getTime()
        break
    }
    case "m": {
        date.setMinutes(date.getMinutes() + number)
        return date.getTime()
        break
    }
    case "s": {
        date.setSeconds(date.getSeconds() + number)
        return date.getTime()
        break
    }
    }
}
function dateView(date){
	if(!date){
		return ''
	}
	if((date+'').length == 13){
		date = new Date(parseInt(date))
	}
	if(date.toDateString() != new Date().toDateString()){
		return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
	}
	var mill = new Date().getTime() - date.getTime() 
	if(mill < 1000*60*60){
		return parseInt(mill/(1000*60)) + "分钟前"
	}
	return parseInt(mill/(1000*60*60)) + "小时前"
}
function getYearStartAndEndMill(date){
	if(!date){
		return ''
	}
	var arr = []
	var currentYear = new Date(dateFormat(date,'yyyy') + '-01-01 00:00:00')
	arr.push(currentYear.getTime())
	arr.push(dateAdd(currentYear,'y',1)-1)
	return arr;
}
function getMonthStartAndEndMill(date){
	if(!date){
		return ''
	}
	var arr = []
	var currentMonth = new Date(dateFormat(date,'yyyy-MM') + '-01 00:00:00')
	arr.push(currentMonth.getTime())
	arr.push(dateAdd(currentMonth,'M',1)-1)
	return arr;
}
function getDayStartAndEndMill(date){
	if(!date){
		return ''
	}
	var arr = []
	var currentDay = new Date(dateFormat(date,'yyyy-MM-dd') + ' 00:00:00')
	arr.push(currentDay.getTime())
	arr.push(dateAdd(currentDay,'d',1)-1)
	return arr;
}
$.ajaxSetup({
	type:'POST',
	cache:false,
	contentType: 'application/json',
    dataType:'json',
    timeout : 15000,
    error:function(XMLHttpRequest, textStatus, errorThrown){
		var status = XMLHttpRequest.status
		if(status == 401){
			storageRemove('userPrivateDto')
			storageRemove('accessToken')
			location.href = ap + "/login.html"
		}else if(status == 403){
			var state = XMLHttpRequest.responseJSON.state
			try {
				var data = XMLHttpRequest.responseJSON.data
			}catch(err){
			}
			if(data){
				layer.msg(state + data)
			}else{
				layer.msg(state)
			}
		}else{
			layer.msg('请求异常:' + status)
		}
    }
})
//由于会传Authorization,仅针对我们后台
function post(useMask,path,data){
	if(useMask != false){
		var mask = layer.load(1,{shade:[0.1, 'gray']})
	}
	console.log('请求内容：' + JSON.stringify(data))
	return $.ajax({
		url: path,
		beforeSend: function (xhr) {  
			xhr.setRequestHeader('Authorization',storageGet('accessToken'))
		},
		data:JSON.stringify(data),
		complete:function(XMLHttpRequest,textStatus){
			try{
				if(XMLHttpRequest.responseJSON){
					console.log('响应内容：' + JSON.stringify(XMLHttpRequest.responseJSON))
				}
			}catch(e){
			}
			if(useMask != false){
				layer.close(mask)
			}
		}
	})
}

function handleRequest(request,success){
	request.then(function(result){
		if(result.state != 'success'){
			layer.msg(result.message)
		}else{
			success(result)
		}
	})
}

function uploadImg(success,style){
	console.log(1)
	var input = document.createElement("input");
	input.type = "file";
	input.click();
	input.onchange = function(){
		var formData = new FormData()
		var file = input.files[0];
		var suffix = file.name.substring(file.name.lastIndexOf('.')) 
		formData.append('file',file)
		
		if(suffix != '.jpg' && suffix != '.png' && suffix != '.jpeg'){
			layer.msg('上传格式不正确')
			return
		}
		//验证图片大小
		if(file.size>1024*1024*2){
			layer.msg("图片大小不能超过2m")
			return false
		}
		
		var request = post(false,major + '/upload/upToken',{'suffix':suffix})
		handleRequest(request,function(result){
			var token = result.data.upToken
			var key = result.data.key
			formData.append("token",token);
			formData.append("key",key);
			$.ajax({
				type: "POST",
				url: cdnUploadUrl,
				data: formData,
				mimeType: "multipart/form-data",
				contentType: false,
				cache: false,
				processData: false,
				success:function(){
					var url = cdnPrefix + '/' + key;
					var styleUrl;
					var square = url + '?imageView2/1/w/200/h/200/q/50|imageslim'
					if(style){
						styleUrl = url + "?imageView2/2/w/" + style.width + "/h/" + style.height + "/q/" + style.quality  + "|imageslim"
					}else{
						styleUrl = null
					}
					success(url,square,styleUrl)
				}
			})
		})
	}
}

function getImage(url,style){
	var styleUrl
	var square = url + '?imageView2/1/w/200/h/200/q/50|imageslim'
	if(style){
		styleUrl = url + "?imageView2/2/w/" + style.width + "/h/" + style.height + "/q/" + style.quality + "|imageslim"
	}else{
		styleUrl = null
	}
	return {'square':square,'styleUrl':styleUrl}
}

function openImage(src){
	if(!src){
		src = $(this).text()
	}
	console.log(($(this)))
	layer.photos({
		photos: {
			"title": "图片",
			"id": 1,
			"start": 0,
			"data": [{
				"alt": "图片",
				"src": src,
				"thumb":src
			}]
		}
		,anim: 5
	})
}

function createPage(pageId,limit,path,data,success){
	var num = 1,time = new Date().getTime()
	data.page = {"num":num,"size":limit,"time":time}
	var request = post(true,path,data);
	handleRequest(request,function(result){
		layui.use('laypage', function(){
		  var laypage = layui.laypage;
		  laypage.render({
		    elem: pageId
			,limit:limit
		    ,count:result.data.total
			,jump: function(obj, first){
				data.page.num = obj.curr
				if(first){
					success(result.data.content)
				}else{
					handleRequest(post(true,path,data),function(result){
						success(result.data.content)
					})
				}
			}
		  });
		});
		
	})
}
