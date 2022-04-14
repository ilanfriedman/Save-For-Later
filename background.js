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
	checked: checkedState
}, onCreated);

browser.contextMenus.onClicked.addListener((info, tab) => {
	checkedState = !checkedState;
	console.log("Checkbox: " + checkedState);

});
