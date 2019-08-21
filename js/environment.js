var environment = 'local'
var ap = '/jiwuzao-merchant'
var major = 'http://106.52.109.239:10010'
var manager = 'http://106.52.109.239:10020'
var socket = 'http://106.52.109.239:10030'
var cdnUploadUrl = 'http://upload-z2.qiniu.com/'
var cdnPrefix = 'http://cdn.jiwuzao.com'
var ws = 'ws://api.jiwuzao.com'

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
