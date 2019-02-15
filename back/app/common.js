function safeJsonParser(jsonstr) {
	try {
		return JSON.parse(jsonstr);
	} catch(e) {
		return null;
	}
}
