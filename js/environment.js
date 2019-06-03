var environment = 'dev'
var ap = '/manager'
var major = 'http://www.kauuze.xyz:10010'
var manager = 'http://www.kauuze.xyz:10020'
var socket = 'http://www.kauuze.xyz:10030'
var cdnUploadUrl = 'http://upload-z2.qiniu.com/'
var cdnPrefix = 'http://cdn.jiwuzao.com'
var cdnAccesskey = '80VH0Goc4ICFTHACWiKZKssLfYQYba8l4vdVIpyP'

if(environment == 'local'){
	major = 'http://127.0.0.1:10011'
	manager = 'http://127.0.0.1:10021'
	socket = 'http://127.0.0.1:10031' 
}

if(environment == 'test'){
	major = 'http://www.kauuze.xyz:10011'
	manager = 'http://www.kauuze.xyz:10021'
	socket = 'http://www.kauuze.xyz:10031' 
}
	
