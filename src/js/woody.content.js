// content 接收消息
chrome.runtime.onMessage.addListener(function(action, sender, sendResponse) {
	switch (action.id) {
		case ACTION_BOOKMARK.id:
			sendResponse(currentBookmark());
			break;
	}
});

function currentBookmark() {
	return transformWith(document);
}
