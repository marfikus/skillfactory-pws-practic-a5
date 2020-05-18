$(document).ready(function() {

	let receivedText = 0;

	$.getJSON(
		'https://api.jsonbin.io/b/5e905926172eb643896166e7',
		function(data) {
			receivedText = data.text;
		}
	);

	$('.btn-create-text').click(function() {
		for (let i = 0; i < receivedText.length; i++) {
			console.log(receivedText[i]);
		}
	});

});

