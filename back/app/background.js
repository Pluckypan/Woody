chrome.contextMenus.create({
	"title": "偏好设置",
	"type": "normal", //菜单项类型 "checkbox", "radio","separator"
	"contexts": ["all"], //菜单项影响的页面元素 "anchor","image"
	"onclick": function(info, tab) {
		window.open("../options.html");
	}
});
