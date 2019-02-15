$(document).ready(function() {
	$("#options").click(function() {
    //popup页面无法直接与content-script交互 需要借助background
  	var bg = chrome.extension.getBackgroundPage();
		chrome.runtime.openOptionsPage(function() {});
	});
});
