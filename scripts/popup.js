import { getDisabled, getCurrentTab } from "./func.js";

let toggleSwitch = document.querySelector("#toggleEnabled");

function toggleButton() {
	getCurrentTab().then((url) => {
		let list = getDisabled();
		let isOnList = list.includes(url);
	});
}

getCurrentTab().then((url) => {
	chrome.storage.sync.get({
		list: []
	}, (data) => {
		toggleSwitch.checked = (!data.list.includes(url));
	});	
});

document.addEventListener('DOMContentLoaded', () => {
	toggleSwitch.addEventListener("change", () => toggleButton());
});