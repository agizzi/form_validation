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

function isDateTodayorLater(date) {
	let now = new Date();
	let userDate = new Date(date);
	console.log(now);
	return userDate <= now;
}

function validateCardNumber(number) {
	var regex = new RegExp('^[0-9]{16}$');
	if (!regex.test(number)) return false;

	return luhnCheck(number);
}

function luhnCheck(val) {
	var sum = 0;
	for (var i = 0; i < val.length; i++) {
		var intVal = parseInt(val.substr(i, 1));
		if (i % 2 == 0) {
			intVal *= 2;
			if (intVal > 9) {
				intVal = 1 + intVal % 10;
			}
		}
		sum += intVal;
	}
	return sum % 10 == 0;
}

function sumOfDays(startDay, field) {
	// clearErrorMsgs(totalField);
	let now = new Date(startDay);
	let amount = Number(field.value);
	let sum = 0;
	let totalField = query('#total');
	let totalParagraph = document.createElement('p');
	clearErrorMsgs(totalField);
	totalParagraph.classList.add('text-success', 'error-message');

	for (let i = 1; i <= amount; i++) {
		if (now.getDay() === 6 || now.getDay() === 0) {
			sum += 7;
		} else {
			sum += 5;
		}
		now.setDate(now.getDate() + 1);
		totalParagraph.innerText = `Success! Your form has been submitted. Your total is ${sum} dollars.`;
		totalField.appendChild(totalParagraph);
	}
	return sum;
}

let validityPoints;

query('#parking-form').addEventListener('submit', function(event) {
	event.preventDefault();
	let nameTextField = query('#name');
	let nameText = nameTextField.value.trim();
	if (!nameText) {
		markInvalid(nameTextField, 'Oops! You forgot to add your name.');
	} else {
		markValid(nameTextField);
		validityPoints = 1;
		console.log(validityPoints);
	}
});

query('#parking-form').addEventListener('submit', function(event) {
	event.preventDefault();
	let carFields = query('.input-group').children;
	let carBox = [];

	for (i = 0; i < carFields.length; i++) {
		carBox.push(carFields[i].value);
		// console.log(carBox);
		if (!carBox[i]) {
			markInvalid(carFields[i].parentNode, 'Oops! All Fields are required');
		} else if (carBox[0] < 1900 || (carBox[0] > 2020 || isNaN(carBox[0]))) {
			markInvalid(carFields[i].parentNode, 'Oops! please enter a valid year.');
		} else {
			markValid(carFields[0].parentNode);
			// console.log(carBox[i]);
			validityPoints += 1;
			console.log(validityPoints);
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
	} else if (isDateTodayorLater(dateText)) {
		markInvalid(dateTextField, 'Oops! Your date needs to be in the future.');
	} else {
		markValid(dateTextField);
		validityPoints += 1;
		console.log(validityPoints);
	}
	console.log(dateText);
});

query('#parking-form').addEventListener('submit', function(event) {
	event.preventDefault();
	let daysTextField = query('#days');
	let daysText = daysTextField.value.trim();
	// console.log(daysText);
	if (!daysText) {
		markInvalid(daysTextField, 'Oops! We need to know how many days you need a pass.');
	} else if (isNaN(daysText) || daysText < 1 || daysText > 30) {
		markInvalid(daysTextField, 'Oops! The number of days must be a number between 1 and 30.');
	} else {
		markValid(daysTextField);
		validityPoints += 1;
		console.log(validityPoints);
	}
});

query('#parking-form').addEventListener('submit', function(event) {
	event.preventDefault();
	let creditCardField = query('#credit-card');
	let creditCardText = creditCardField.value.trim();
	// console.log(creditCardText);
	if (!creditCardText || validateCardNumber(creditCardText) === false) {
		markInvalid(creditCardField, 'Oops! We need a valid credit card number to process your payment.');
	} else {
		markValid(creditCardField);
		validityPoints += 1;
		console.log(validityPoints);
	}
});

query('#parking-form').addEventListener('submit', function(event) {
	event.preventDefault();
	let cvvField = query('#cvv');
	let cvvText = cvvField.value.trim();
	// console.log(cvvText);
	if (!cvvText || isNaN(cvvText) || cvvText.length !== 3) {
		markInvalid(cvvField, 'Oops! We need your three digit code on the back of your credit card.');
	} else {
		markValid(cvvField);
		validityPoints += 1;
		console.log(validityPoints);
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
		validityPoints += 1;
		console.log(validityPoints);
	}
});

query('#parking-form').addEventListener('submit', function(event) {
	event.preventDefault();
	// const fieldContainer = field.parentNode;
	let daysTextField = query('#days');
	let totalField = query('#total');
	let dateTextField = query('#start-date');
	let dateText = dateTextField.value;
	if (validityPoints === 9) {
		total = sumOfDays(dateText, daysTextField);
	} else {
		clearErrorMsgs(totalField);
	}
	// console.log(totalParagraph.innerHTML);
	console.log(total);
});
