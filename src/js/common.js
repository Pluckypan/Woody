function getListParams(marker, apath) {
	if(!apath || apath.length == 0) {
		apath = "tuchongeter";
	}
	var cfg = getQiniuConfig();
	if(cfg) {
		cfg.PREFIX = apath + "/";
		cfg.MARKER = marker;
		cfg.LIMIT = 20;
	}
	return cfg;
}

function getUploadParams(aurl) {
	var cfg = getQiniuConfig();
	var defDir = getDefaultDir();
	if(cfg) {
		var finalName = defDir + "/" + getFileName(aurl);
		cfg.ORIGIN = aurl;
		cfg.TARGET = finalName;
	}
	return cfg;
}

function getDeleteParams(akey) {
	var cfg = getQiniuConfig();
	if(cfg) {
		cfg.TARGET = akey;
	}
	return cfg;
}

function getMoveParams(origin, target, tobucket) {
	var cfg = getQiniuConfig();
	if(cfg) {
		cfg.ORIGIN = origin;
		cfg.TARGET = target;
		if(tobucket) {
			cfg.TOBUCKET = tobucket;
		}
	}
	return cfg;
}

function getDirectory() {
	var jsonstr = localStorage.ECHO_DIRECTORY;
	if(jsonstr) {
		return safeJsonParser(jsonstr);
	} else {
		return null;
	}
}

function setDirectory(dic) {
	if(dic) {
		localStorage.ECHO_DIRECTORY = JSON.stringify(dic);
	}
}

function setDefaultDir(dir) {
	localStorage.ECHO_DEFAULTDIR = dir;
}

function getDefaultDir() {
	var def = localStorage.ECHO_DEFAULTDIR;
	if(!def || def.indexOf("tuchongeter") < 0) {
		return "tuchongeter";
	} else {
		return def;
	}
}

function getDefaultPixel() {
	var defPixel = localStorage.ECHO_DEFAULT_PIXEL;
	var defPixelName = localStorage.ECHO_DEFAULT_PIXEL_NAME;
	if(!defPixel || !defPixelName) {
		return [240000, "600*400"];
	}
	return [defPixel, defPixelName];
}

function setDefaultPixel(pixel, name) {
	localStorage.ECHO_DEFAULT_PIXEL = pixel;
	localStorage.ECHO_DEFAULT_PIXEL_NAME = name;
}

function getQiniuConfig() {
	var jsonstr = localStorage.ECHO_QINIU;
	if(jsonstr) {
		return JSON.parse(jsonstr);
	} else {
		return null;
	}
}

function setQiniuConfig(ak, sk, bucket, domain) {
	var dic = {
		"AK": ak,
		"SK": sk,
		"BUCKET": bucket,
		"DOMAIN": domain
	};
	localStorage.ECHO_QINIU = JSON.stringify(dic);
}

function getFileName(aurl) {
	if(aurl) {
		var arr = aurl.split("/");
		return arr[arr.length - 1];
	} else {
		return "";
	}
}

function safeJsonParser(jsonstr) {
	try {
		return JSON.parse(jsonstr);
	} catch(e) {
		return null;
	}
}

function getRequest() {
	var url = location.search; //获取url中"?"符后的字串 
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			//1.0.5 decodeURIComponent  ---> unescape 支持中文
			theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

function getQuery(key) {
	var mRequest = getRequest();
	return mRequest[key];
}