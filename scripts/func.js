let printMessage = true;

export function setMessage(message = "") {
	if (printMessage) {
		printMessage = false;
		let disableMessage = document.querySelector("#disableMessage");

		disableMessage.innerHTML = message;
		disableMessage.classList.remove("hidden");

		setTimeout(() => {
			disableMessage.classList.add("hidden");
			printMessage = true;
		}, 5000);
	}
}

export async function getCurrentTab() {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	return tab.url;
}

export function updateDisabled(siteList, url, added = true) {
	if (added) {
		siteList = siteList.filter((value) => {
			return value != url;
		});
	} else {
		siteList.push(url);
	}

	chrome.storage.sync.set({
		list: siteList
	});

	return siteList;
}

export function getDisabled(update = true) {
	let disabledSites = [];

	getCurrentTab().then((url) => {
		chrome.storage.sync.get({
			list: []
		}, (data) => {
			let included = data.list.includes(url);
			
			disabledSites = update ? updateDisabled(data.list, url, included) : data.list;
		});
	});

	return disabledSites;
}

export function isIncluded(url = '') {
	let isIncluded = false;

	getCurrentTab().then((url) => {
		chrome.storage.sync.get({
			list: []
		}, (data) => {
			isIncluded = data.list.includes(url);
		});
	});

	return isIncluded;
}