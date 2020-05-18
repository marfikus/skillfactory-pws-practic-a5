function checkRepeatField(field) {

}

$(document).ready(function() {

	let receivedText = 0;

	$.getJSON(
		"https://api.jsonbin.io/b/5e905926172eb643896166e7",
		function(data) {
			// receivedText = data.text;

			let fields = [];
			let curStrFields = 0;

			for (let str of data.text) {
				// const regexp = new RegExp("\{+\}", "ig");
				// curStrFields = receivedText[0].match(/{(.[^{}]+)}/ig);
				curStrFields = str.match(/{(.[^{}]+)}/ig);
				console.log(curStrFields);

				if (curStrFields !== null) {
					console.log(curStrFields.length);

					for (let curStrField of curStrFields) {
						let repeatField = false;
						for (let field of fields) {
							if (curStrField === field) {
								repeatField = true;
								break;
							}
						}

						if (repeatField === false) {
							fields.push(curStrField);

							let fieldName = curStrField.substr(1, curStrField.length-2);
							$(".data-inputs").append(`<input type="text" name="${fieldName}" placeholder="${fieldName}">`);
						}
					}
					// fields = fields.concat(curStrFields);
				}
			}

			console.log(fields.length);
			console.log(fields);

			let resultText = data.text.join(' ');
			console.log(resultText);
			for (let field of fields) {
				let fieldName = field.substr(1, field.length-2);
				let fiedlValue = $(`input[name=${fieldName}]`).val();
				console.log("fiedlValue:", fiedlValue);
				resultText = resultText.replace(new RegExp(field,'g'), fiedlValue);
			}
			console.log(resultText);

			$('.result').text(resultText);
			

			// let str = receivedText[0];
			// let results = str.matchAll(/{(.[^{}]+)}/i);
			// results = Array.from(results);
			// console.log(results);
		}
	);



	$(".btn-create-text").click(function() {
		// for (let i = 0; i < receivedText.length; i++) {
			// console.log(receivedText[0].match);
		// }
		console.log(receivedText);
	});

});

