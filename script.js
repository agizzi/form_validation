function query(selector) {
	return document.querySelector(selector);
}

function queryAll(selector) {
	return document.querySelectorAll(selector);
}

function markValid(field) {
	clearErrorMsgs(field);
	field.parentNode.classList.remove('input-invalid');
	field.parentNode.classList.add('input-valid');
}

function markInvalid(field, errorMsg) {
	const fieldContainer = field.parentNode;
	clearErrorMsgs(field);
	fieldContainer.classList.remove('input-valid');
	fieldContainer.classList.add('input-invalid');

	if (errorMsg) {
		const errorParagraph = document.createElement('p');
		errorParagraph.classList.add('input-hint', 'text-danger', 'error-message');
		errorParagraph.innerText = errorMsg;
		fieldContainer.appendChild(errorParagraph);
	}
}

function clearErrorMsgs(field) {
	const fieldContainer = field.parentNode;
	for (let msg of fieldContainer.querySelectorAll('.error-message')) {
		msg.remove();
	}
}

// function validCarYear(field) {
// 	const fieldContainer = field.parentNode;
// 	clearErrorMsgs(field);
// 	if ((field = '')) {
// 		return;
// 	} else if (isNaN(field)) {
// 		markInvalid(fieldContainer, 'Oops! The year must be a number.');
// 		// } else {
// 		// 	markValid(field);
// 		// }
// 	}
// }

query('#parking-form').addEventListener('submit', function(event) {
	event.preventDefault();
	let nameTextField = query('#name');
	let nameText = nameTextField.value.trim();
	if (!nameText) {
		markInvalid(nameTextField, 'Oops! You forgot to add your name.');
	} else {
		markValid(nameTextField);
	}
});

query('#parking-form').addEventListener('submit', function(event) {
	event.preventDefault();
	let carFields = query('.input-group').children;
	let carBox = [];

	for (i = 0; i < carFields.length; i++) {
		carBox.push(carFields[i].value);
		console.log(carBox);
		if (!carBox[i]) {
			markInvalid(carFields[i].parentNode, 'Oops! All Fields are required');
		} else if (carBox[0] < 1900 || (carBox[0] > 2020 || isNaN(carBox[0]))) {
			markInvalid(carFields[i].parentNode, 'Oops! please enter a valid year.');
		} else {
			markValid(carFields[0].parentNode);
			console.log(carBox[i]);
		}
	}
});

query('#parking-form').addEventListener('submit', function(event) {
	event.preventDefault();
	let dateTextField = query('#start-date');
	let dateText = dateTextField.value;
	// console.log(dateText);
	if (!dateText) {
		markInvalid(dateTextField, 'Oops! You need to add a date.');
	} else {
		markValid(dateTextField);
	}
});

query('#parking-form').addEventListener('submit', function(event) {
	event.preventDefault();
	let daysTextField = query('#days');
	let daysText = daysTextField.value.trim();
	// console.log(daysText);
	if (!daysText) {
		markInvalid(daysTextField, 'Oops! We need to know how many days you need a pass.');
	} else {
		markValid(daysTextField);
	}
});

query('#parking-form').addEventListener('submit', function(event) {
	event.preventDefault();
	let creditCardField = query('#credit-card');
	let creditCardText = creditCardField.value.trim();
	// console.log(creditCardText);
	if (!creditCardText) {
		markInvalid(creditCardField, 'Oops! We need a valid credit card number to process your payment.');
	} else {
		markValid(creditCardField);
	}
});

query('#parking-form').addEventListener('submit', function(event) {
	event.preventDefault();
	let cvvField = query('#cvv');
	let cvvText = cvvField.value.trim();
	// console.log(cvvText);
	if (!cvvText) {
		markInvalid(cvvField, 'Oops! We need your three digit code on the back of your credit card.');
	} else {
		markValid(cvvField);
	}
});

query('#parking-form').addEventListener('submit', function(event) {
	event.preventDefault();
	let expirationField = query('#expiration');
	let expirationText = expirationField.value.trim();
	// console.log(expirationText);
	if (!expirationText) {
		markInvalid(expirationField, 'Oops! We need the expiration date of your credit card');
	} else {
		markValid(expirationField);
	}
});
