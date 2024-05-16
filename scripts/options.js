import { updateDisabled } from "./func.js";

let selectTag = document.querySelector('#disabledSites');

document.querySelector('#removeAll').addEventListener('click', () => {
	selectTag.innerHTML = "";
	chrome.storage.sync.set({
			list: []
	});
});

document.querySelector('#removeSelected').addEventListener('click', () => {
	chrome.storage.sync.get({
			list: []
	}, (data) => {
		let list = data.list;

		Array.prototype.forEach.call(selectTag.options, (option, i) => {
			if (option.selected) {
				list = updateDisabled(list, option.value);
				selectTag.remove(i);
			}
		});
	});
});

chrome.storage.sync.get({
		list: []
}, (data) => {
	let siteList = data.list;

	if (siteList.length > 0) {
		siteList.map((site, i) => {
			 selectTag.options[i] = new Option(site, site);
		});

		selectTag.options[0].selected = true;
	}
});