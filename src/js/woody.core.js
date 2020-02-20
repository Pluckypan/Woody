var Action = {

	create: function(id, name, data) {
		var action = {};
		action.id = id;
		action.name = name;
		action.data = data;
		action.info = function() {
			let msg = "[id=" + id + ",name=" + name + "]";
			alert(msg);
		}
		return action;
	}
};

const ACTION_BOOKMARK = Action.create(0, "Bookmark");


const charArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
	'K',
	'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

function generateName(an) {
	var res = "";
	for (var ia = 0; ia < an; ia++) {
		var id = Math.ceil(Math.random() * 35);
		res += charArray[id];
	}
	return res;
}

function getFavicon(doc) {
	var links = doc.getElementsByTagName("link");
	if (!links || links.length == 0) return "";
	var res = "";
	for (var i = 0; i < links.length; i++) {
		var link = links[i];
		if (link.rel && link.rel.indexOf("icon") >= 0 &&
			link.type && link.type.indexOf("icon") >= 0 &&
			link.href) {
			res = link.href;
			break;
		}
	}
	return res;
}

function getPageCover(doc) {
	return doc.images && doc.images.length > 0 ? doc.images[0].src : '';
}

function transformWith(source) {
	var isTab = source.selected && source.active;
	return {
		"cid": "root",
		"id": generateName(15),
		"name": source.title,
		"desc": isTab ? '' : source.description,
		"tag": [],
		"hot": false,
		"url": isTab ? source.url : source.location.href,
		"order": 0,
		"icon": isTab ? source.favIconUrl : getFavicon(source),
		"cover": isTab ? '' : getPageCover(source),
		"type": 0,
		"create_time": ''
	};
}
