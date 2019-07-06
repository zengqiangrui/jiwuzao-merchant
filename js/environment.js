var environment = 'local'
var ap = '/jiwuzao-merchant'
var major = 'http://106.52.109.239:10010'
var manager = 'http://106.52.109.239:10020'
var socket = 'http://106.52.109.239:10030'
var cdnUploadUrl = 'http://upload-z2.qiniu.com/'
var cdnPrefix = 'http://cdn.jiwuzao.com'
var cdnAccesskey = '80VH0Goc4ICFTHACWiKZKssLfYQYba8l4vdVIpyP'

if(environment == 'local'){
	major = 'http://127.0.0.1:10010'
	manager = 'http://127.0.0.1:10020'
	socket = 'http://127.0.0.1:10030'
}

if(environment == 'test'){
	major = 'http://www.kauuze.xyz:10011'
	manager = 'http://www.kauuze.xyz:10021'
	socket = 'http://www.kauuze.xyz:10031'
}
