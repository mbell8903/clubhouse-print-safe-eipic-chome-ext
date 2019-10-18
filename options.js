// Restores select box and checkbox state using the preferences stored in chrome.storage.
document.addEventListener('DOMContentLoaded', function () {
	// Use default value apiKey = ''
	chrome.storage.sync.get({
		apiKey: ''
	}, function(items) {
		document.getElementById('apiKey').value = items.apiKey;
	});
});

// Saves options to chrome.storage
document.getElementById('save').addEventListener('click', function () {
	const apiKey = document.getElementById('apiKey').value;

	chrome.storage.sync.set({
		apiKey: apiKey
	}, function() {
		// Update status to let user know options were saved.
		const status = document.getElementById('status');

		status.textContent = 'Options saved.';

		setTimeout(function() {
			status.textContent = '';
		}, 750);
	});
});
