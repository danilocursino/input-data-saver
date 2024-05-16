const url = window.location.href;
const inputs = document.querySelectorAll("input:not([type=file]):not(disabled), textarea:not(disabled), select:not(disabled)");


chrome.storage.sync.get({
	list: []
}, (data) => {
	if ((inputs) && (!data.list.includes(url))) {
		function eventHandler(event) {
			let input = event.target;
			let name = (input.name) ? input.name : input.id;

			localStorage.setItem('FIS-' + url + '-' +  name, input.value);
		}

		function addListener(input, listeners) {
			listeners.forEach((listen) => {
				input.addEventListener(listen, eventHandler);
			});
		}


		inputs.forEach((input) => {
			let hasNameOrId = (input.name) ? input.name : ((input.id) ? input.id : null)
			
			if (hasNameOrId) {			
				let inputValue = localStorage.getItem('FIS-' + url + '-' +  hasNameOrId);
				if (inputValue) input.value = inputValue;

				addListener(input, ['input']);
			}
		});
	}
});