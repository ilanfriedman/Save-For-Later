$(document).ready(function () {
	const newItem = document.querySelector('#add-site');
	const clear = document.querySelector('#clear-all');
	var tabArray = [];

	newItem.addEventListener('click', () => {
		getCurrentURL();
	})
	clear.addEventListener('click', () => {
		clearStorage();
	})

	function getCurrentURL() {
		browser.tabs.query({
			currentWindow: true,
			active: true
		})
			.then((tabs) => {
				var tabURL = tabs[0].url;
				tabArray.push(tabURL)
				saveToList(tabArray);
			})
	}

	function saveToList(tabURL) {
		localStorage.setItem('tabs', JSON.stringify(tabURL));
	}

	$("clear-all").onclick
	function clearStorage() {
		localStorage.clear();
		// Add warning pop-up of some kind here
	}

	function onCreated() {
		console.log(`Page Created!`);
	}
	function onError(e) {
		console.log(`Something got fucky: ${e}`);
	}

	//TESTS:

	const addTest = document.querySelector('#add-test');
	addTest.addEventListener('click', () => {
		populateStorage();
		//setTimeout(() => {
		getCurrentURL();
		//}, 2000);
	})
	function populateStorage() {
		//localStorage.setItem();
	}
	function tabsTest() {
		let createTab = browser.tabs.create({
			url: "https://google.com"
		});
		createTab.then(onCreated, onError)
	}
})