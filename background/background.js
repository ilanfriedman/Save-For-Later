function onCreated() {
	if (browser.runtime.lastError) {
		console.log(`Error: ${browser.runtime.lastError}`);
	} else {
		console.log("Item created successfully");
	}
}
function onRemoved() {
	console.log("Item removed successfully");
}
function onError(error) {
	console.log(`Error: ${error}`);
}

var checkedState = false;

browser.contextMenus.create({
	id: "save-for-later",
	type: "checkbox",
	title: "Save for Later",
	contexts: [
		"page",
		"link",
		"tab"
	],
	checked: false,
}, onCreated);

function addToArray(tabURL) {
	if (localStorage.getItem('tabs') == null) {
		var tabArray = [];
	} else {
		var tabArray = JSON.parse(localStorage.getItem('tabs'));
	}
	tabArray.push(tabURL);
	saveToList(tabArray);
}

function saveToList(tabArray) {
	localStorage.setItem('tabs', JSON.stringify(tabArray));
}

browser.contextMenus.onClicked.addListener(function (info, tab) {
	addToArray(info.pageUrl);
	console.log(localStorage.getItem('tabs'));
	// info.wasChecked
	// info.pageUrl
});
