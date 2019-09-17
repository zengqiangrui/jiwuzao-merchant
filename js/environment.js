var environment = 'prod'
var ap = '/jiwuzao-merchant'
var major = 'https://api.jiwuzao.com'
var manager = 'http://106.52.109.239:10020'
var cdnUploadUrl = 'http://upload-z2.qiniu.com/'
var cdnPrefix = 'http://cdn.jiwuzao.com'
var ws = 'wss://api.jiwuzao.com'

if(environment == 'local'){
	major = 'http://127.0.0.1:10010'
	manager = 'http://127.0.0.1:10020'
	ws = 'ws://127.0.0.1:10010'
}

if(environment == 'test'){
	major = 'http://www.kauuze.xyz:10011'
	manager = 'http://www.kauuze.xyz:10021'
	socket = 'http://www.kauuze.xyz:10031'
}
