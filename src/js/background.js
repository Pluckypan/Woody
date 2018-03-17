chrome.contextMenus.create({
	"title": "同步至七牛云",
	"type": "normal", //菜单项类型 "checkbox", "radio","separator"
	"contexts": ["image"], //菜单项影响的页面元素 "anchor","image"
	"onclick": function(info, tab) {
		uploadImageInBackground(info.srcUrl, function(code) {
			sendSyncCommond(code);
		});
	}
});

chrome.contextMenus.create({
	"title": "查看图片同步列表",
	"type": "normal", //菜单项类型 "checkbox", "radio","separator"
	"contexts": ["all"], //菜单项影响的页面元素 "anchor","image"
	"onclick": function(info, tab) {
		var params = getUploadParams(info.srcUrl);
		if(!params) {
			sendSyncCommond(2);
		} else {
			window.open("../list.html");
		}

	}
});

chrome.contextMenus.create({
	"title": "偏好设置",
	"type": "normal", //菜单项类型 "checkbox", "radio","separator"
	"contexts": ["all"], //菜单项影响的页面元素 "anchor","image"
	"onclick": function(info, tab) {
		window.open("../options.html");
	}
});

function getImageArray(callback) {
	var defPixel = getDefaultPixel(); 
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id, {
			"action": "getImageArray",
			"data": {
				"pixel": defPixel
			}
		}, function(response) {
			callback(response);
		});
	});
}

function sendSyncCommond(code) {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id, {
			"action": "uploadTips",
			"code": code
		}, function(response) {});
	});
}

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		switch(request.action) {
			case "optionsPage":
				chrome.runtime.openOptionsPage(function() {});
				break;
			default:
				break;
		}
	}
);

// 0 成功 1 失败 2 参数未配置 3 showloading 4 hideloading
function uploadImageInBackground(aurl, callback) {
	var params = getUploadParams(aurl);
	if(!params) {
		callback(2);
		return;
	}
	var str = JSON.stringify(params);
	var base64str = BASE64.encoder(str);
	callback(3);
	httpRequestPOST("http://1991th.com/uploader/fetch.php", {
		"qiniu": base64str
	}, function(jsonstr) {
		callback(4);
		var mdata = safeJsonParser(jsonstr);
		if(mdata && mdata.error == 0) {
			callback(0);
		} else {
			callback(1);
		}
	});
}