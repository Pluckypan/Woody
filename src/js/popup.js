function output(msg) {
	document.getElementById("divMsg").innerHTML = msg;
}

var background = chrome.extension.getBackgroundPage();

function getBookmark(byAction) {
	if (byAction) {
		background.currentTabAction(ACTION_BOOKMARK, function(resp) {
			output(JSON.stringify(resp, null, "\t"));
		});
	} else {
		background.currentTabInfo(function(tab) {
			output(JSON.stringify(tab, null, "\t"));
		}, true);
	}
}

window.onload = function() {
	// 获取书签
	getBookmark(false);
	document.getElementById("btnTab").onclick = function() {
		getBookmark(true);
	};
	// 通知测试
	document.getElementById("btnNotify").onclick = function() {
		background.simpleNotify("Woody", "cool woody.")
	};

}
