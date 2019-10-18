chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.message === 'clicked_browser_action') {
		// Single epic
		const detailsSection = document.getElementById("epic-details-section");

		// Ensure this is the single epic page
		if (detailsSection) {
			let $printEpicButton = $("#print-epic");

			// Doesnt exists need to add the button
			if (!$printEpicButton.length) {
				$printEpicButton = $("<button id=\"print-epic\" class=\"action print micro flat-white\"><span class=\"fa fa-print\"></span> Print</button>");
				$printEpicButton.on("click", printWindow);
				const $detailsSection = $(detailsSection);
				$detailsSection.prepend($printEpicButton);
			}
		}

		// Epic list
		const listingSection = document.getElementById("epics");

		// Ensure this is the epic list page
		if (listingSection) {
			let $printEpicListButton = $("#print-epic-list");

			// Doesnt exists need to add the button
			if (!$printEpicListButton.length) {
				$printEpicListButton = $("<button id=\"print-epic-list\" class=\"action print mini flat-white\"><span class=\"fa fa-print\"></span> Print</button>");
				$printEpicListButton.on("click", printWindow);

				const $filterList = $("#page-dropdown-filters > .filter-group.stretch");
				$filterList.prepend($printEpicListButton);
			}
		}
	}
});

function printWindow() {
	const $epics = $('[data-model="Epic"]');
	const epicList = [];

	$.each($epics, function (i, epic) {
		const epicId = $(epic).attr("data-id");
		epicList.push(epicId);
	});


	if ($epics.length && epicList.length) {
		const extensionUrl = chrome.runtime.getURL("window-child.html");
		window.open(`${extensionUrl}?id=${epicList.join(",")}`, "_blank")
	}
}
