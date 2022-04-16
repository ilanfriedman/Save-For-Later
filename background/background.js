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

function removeFromArray(tabURL) {
	if (localStorage.getItem('tabs') == null) {
		throw new Error('Nulls should be caught before they get here... so how the hell did this happen');
	}
	var tabArray = JSON.parse(localStorage.getItem('tabs'));
	tabArray = tabArray.filter(e => (e != tabURL));
	removeFromList(tabArray);
}

function saveToList(tabArray) {
	localStorage.setItem('tabs', JSON.stringify(tabArray));
}

function removeFromList(tabArray) {
	localStorage.setItem('tabs', JSON.stringify(tabArray));
}

browser.contextMenus.onClicked.addListener(function (info, tab) {
	if (localStorage.getItem('tabs') == null) {
		addToArray(info.pageUrl);
	} else if (!JSON.parse(localStorage.getItem('tabs')).includes(info.pageUrl)) {
		addToArray(info.pageUrl);
	} else {
		removeFromArray(info.pageUrl);
	}
});

browser.contextMenus.onShown.addListener(function (info, tab) {
	if (JSON.parse(localStorage.getItem('tabs')).includes(info.pageUrl)) {
		browser.contextMenus.update("save-for-later", {
			checked: true,
		});
	} else {
		browser.contextMenus.update("save-for-later", {
			checked: false,
		});
	}
	browser.contextMenus.refresh();
})

browser.runtime.onStartup.addListener(() => {
	for (var tab in JSON.parse(localStorage.getItem('tabs'))) {
		browser.tabs.create({
			url: tab
		});
	}
});