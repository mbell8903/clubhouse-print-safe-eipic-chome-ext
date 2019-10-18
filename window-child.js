// Get the url param for the ids
const urlParams = new URLSearchParams(window.location.search).get("id");
console.log(urlParams);

if (urlParams) {
	// Convert url params to a list of numbers
	const epicList = (urlParams.split(",") || []).map(function (id) {
		return parseInt(id, 10);
	});
	console.log(epicList);

	chrome.storage.sync.get({
		apiKey: ""
	}, function (items) {
		const apiKey = items.apiKey;

		if (apiKey) {

			// Make the API call for members for rendering
			$.get(`https://api.clubhouse.io/api/v2/members?token=${apiKey}`, function (members) {
				if (members) {

					// Make the API call and create the page for printing
					$.get(`https://api.clubhouse.io/api/v2/epics?token=${apiKey}`, function (epics) {
						if (epics) {
							const $epicsList = $("#epics-list");
							const converter = new showdown.Converter();
							let idx = 1;

							epics.forEach(function (epic) {
								if (epicList.includes(epic.id)) {
									let html = '';
									html += `<h2 class="epic-name">#${idx++} ${epic.name}</h2>`;
									html += `<p class="epic-url"><a href="https://app.clubhouse.io/teralogics/epic/${epic.id}" target="_blank">https://app.clubhouse.io/teralogics/epic/${epic.id}</a></p>`;
									html += `<p class="epic-deadline">${epic.deadline}</p>`;
									html += `<p class="epic-owners">`;
									epic.owner_ids.forEach(function (ownerId) {
										members.forEach(function (member) {
											if (member.id === ownerId) {
												if (member.profile.display_icon) {
													html += `<img src="${member.profile.display_icon.url}" alt="${member.profile.name}" height="24" width="24" class="avatar">`;

												} else {
													html += `<img src="https://www.gravatar.com/avatar/${member.profile.gravatar_hash}.jpg?s=48&amp;d=identicon" alt="${member.profile.name}" height="24" width="24" class="avatar">`;
												}
											}
										});
									});
									html += `</p>`;
									html += converter.makeHtml(epic.description);
									$epicsList.append(html);
								}
							});
						}
					});
				}
			});
		} else {
			alert('Clubhouse API key required. You can add one via the extension options.');
		}
	});
}

// Bind print function to print button
$(".btn-print").on("click", function () {
	window.print();
});


