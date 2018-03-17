function httpRequestGET(url, callback) {
	var xhr = new XMLHttpRequest();

	xhr.open('GET', url, true);
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			callback(xhr.responseText);
		}
	}
	xhr.send();
}

function httpRequestPOST(url, data, callback) {
	var xhr = new XMLHttpRequest();

	xhr.open('POST', url, true);
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			callback(xhr.responseText);
		}
	}
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	xhr.send(encodeFormData(data));
}

function encodeFormData(data) {
	if(!data) return '';
	var pairs = [];
	for(var name in data) {
		if(!data.hasOwnProperty(name)) continue;
		if(typeof data[name] === 'function') continue;
		var value = data[name].toString();
		name = encodeURIComponent(name.replace('%20', '+'));
		value = encodeURIComponent(value.replace('%20', '+'));
		pairs.push(name + '=' + value);
	}
	return pairs.join('&');
}