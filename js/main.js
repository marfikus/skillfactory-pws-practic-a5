
$(document).ready(function() {

	let receivedText = 0; // то, что приняли
	let resultText = 0; // то, что будет выводиться на странице
	let fields = []; // общий массив найденных полей

	let $dataInputs = $('.data-inputs'); // блок для полей ввода
	let $result = $('.result'); // блок для вывода текста
	let $btnCreateText = $('.btn-create-text'); // кнопка замены полей в тексте

	$.getJSON(
		'https://api.jsonbin.io/b/5e905926172eb643896166e7',
		function(data) {
			receivedText = data.text;

			// убираем индикатор загрузки:
			$('.loading-indicator').remove();

			let curStrFields = 0; // поля найденные в текущей строке

			// бежим по элементам (строкам) полученного массива,
			// ищем все поля для заполнения:
			for (let str of data.text) {
				// const regexp = new RegExp("\{+\}", "ig");
				// curStrFields = receivedText[0].match(/{(.[^{}]+)}/ig);
				curStrFields = str.match(/{(.[^{}]+)}/ig);
				// console.log(curStrFields);

				// если результат есть:
				if (curStrFields !== null) {
					// console.log(curStrFields.length);

					// добавляем найденные поля в общий массив,
					// попутно фильтруя повторяющиеся поля:
					for (let curStrField of curStrFields) {
						let repeatField = false;
						for (let field of fields) {
							if (curStrField === field) {
								repeatField = true;
								break;
							}
						}

						// если поле уникально, то добавляем его в общий массив:
						if (repeatField === false) {
							fields.push(curStrField);

							// ну и создаём поле в форме:
							let fieldName = curStrField.substr(1, curStrField.length-2);
							$dataInputs.append(`<input type="text" name="${fieldName}" placeholder="${fieldName}" required>`);
						}
					}
					// fields = fields.concat(curStrFields);
				}
			}
			// console.log(fields.length);
			// console.log(fields);

			// собираем строки принятого массива в общий текст:
			resultText = receivedText.join(' ');
			// console.log(resultText);
			$result.text(resultText);

			// разлочиваем кнопку:
			$btnCreateText.removeAttr('disabled');
		}
	);

	$btnCreateText.click(function() {
		// собираем строки принятого массива в общий текст:
		resultText = receivedText.join(' ');

		// и заменяем поля текста на значения из полей формы:
		for (let field of fields) {
			let fieldName = field.substr(1, field.length-2);
			let fiedlValue = $(`input[name=${fieldName}]`).val();
			// console.log('fiedlValue:', fiedlValue);
			resultText = resultText.replace(new RegExp(field,'g'), fiedlValue);
		}
		// console.log(resultText);

		$result.text(resultText);
	});
});

