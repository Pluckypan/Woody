chrome.contextMenus.create({
	"title": "Woody",
	"type": "normal",
	"contexts": ["all"],
	"onclick": function(info, tab) {
		window.open("../index.html");
	}
});

function currentTabAction(action, callback) {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id, action, callback);
	});
}

function simpleNotify(title, msg) {
	chrome.notifications.create(null, {
		type: 'basic',
		iconUrl: 'logo.png',
		title: title + "",
		message: msg
	});
}

function currentTabInfo(callback, transform) {
	chrome.tabs.getSelected(null, function(tab) {
		if (transform) {
			callback(transformWith(tab))
		} else {
			callback(tab)
		}
	});
}
