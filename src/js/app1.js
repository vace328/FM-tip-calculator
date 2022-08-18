// Get the elements

let resetBtn = document.getElementById("resetBtn");

let errorContainers = document.getElementsByClassName("error");
let allInputFields = document.getElementsByClassName("input-text");
let tipBtns = document.tipCalculator.tipAmount;

let billAmountField = document.getElementById("bill-amount");
let numOfPeopleField = document.getElementById("number-of-people");
let tipPerPersonField = document.getElementById("tip-amount");
let totalPerPersonField = document.getElementById("total-amount");

let customRadio = document.getElementById("custom-radio");
let customRadioErrorContainer = document.getElementById("error-custom");
let error1 = document.getElementById("error-1");

let bill = 0;
let people = 0; 
let textFieldsValidated = false;

let tipAmountSelected = null;
let tipIsSelected = false;




function onlyDigits(input) {
  // Check string for digits
  return /^[0-9.]+$/.test(input.trim());
}
function stringToNumber(str) {
  // Convert string to number
  return +str;
}
function notEmpty(input) {
  // Make sure the string is not empty, 0, or contains only spaces
  return input.trim().length > 0;
}
function calculateTipPerPerson(totalBill, tip, numberOfPeople) {  
  totalBill = stringToNumber(totalBill);
  tip = stringToNumber(tip);
  numberOfPeople = stringToNumber(numberOfPeople);
  if (tip === 0) {
    return 0;   
  } else {
    return ((totalBill * tip) / 100 / numberOfPeople);
  }  
}
function calculateTotalPerPerson(totalBill, numberOfPeople, tipPercent) {
  totalBill = stringToNumber(totalBill);
  tipPercent = stringToNumber(tipPercent);
  numberOfPeople = stringToNumber(numberOfPeople);
 
  let tipPerPerson = calculateTipPerPerson(totalBill, tipPercent, numberOfPeople);
  let totalPP =
  ((totalBill / numberOfPeople) + tipPerPerson);
  return totalPP;
}

function validateFormField(field, error) {
  if (!notEmpty(field.value) || field.value == 0) {
    error.textContent = `Can't be 0`;
   field.classList.add("has-error");
	return false;
  } else if (!onlyDigits(field.value)) {
    error.textContent = "Has to be a number";
    field.classList.add("has-error");
	return false;
  } else {
    error.textContent = "";
    field.classList.remove("has-error");
	return true;
  }
}
function validateTipOptions(status, error) {  
  if (status === false) {
    error.textContent = "Select an option";
  } else {
    // error.textContent = "All coool";
    error.textContent = "";
  }
}

function validateCustomRadioField(field, error) {
  if (!notEmpty(field.value)) {
    field.setAttribute("placeholder", "Custom");    
  } else if (!onlyDigits(field.value)) {
    error.textContent = "Has to be a number";
    field.classList.add("custom-radio-has-error");   
  } else {
    error.textContent = "";
    field.classList.remove("custom-radio-has-error");
  }

  if (notEmpty(field.value) && onlyDigits(field.value)) {
    return true;
  }
}

function VCRF(status, field, error) {
  if (status === false) {
    error.textContent = "Select an option";
  } else if (!notEmpty(field.value)) {
    field.setAttribute("placeholder", "Custom");
  } else if (!onlyDigits(field.value)) {
    error.textContent = "Has to be a number";
    field.classList.add("custom-radio-has-error");   
  } else {
    error.textContent = "";
    field.classList.remove("custom-radio-has-error");
  } 

  if (notEmpty(field.value) && onlyDigits(field.value)) {
    return true;
  }
}

// Display calculated result
function displayResults(textFieldStatus, radioFieldStatus, bill, tip, people) {
  if (textFieldStatus == false || bill == 0 || people == 0 || bill == "undefined" || people == "undefined" || radioFieldStatus == false) {      
    totalPerPersonField.textContent = "0.00";
    tipPerPersonField.textContent = "0.00";
  } else {
    totalPerPersonField.textContent = parseFloat(calculateTotalPerPerson(bill, people, tip)).toFixed(2);
    tipPerPersonField.textContent = parseFloat(calculateTipPerPerson(bill, tip, people)).toFixed(2);
  }  
}

// On keyup, wait for the user to stop typing before validating form fields
function delay(callback, ms) {
  var timer = 0;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}


// Get radio value
for (let i = 0; i < tipBtns.length; i++) {
  tipBtns[i].addEventListener("change", function () {    
    if (this !== tipAmountSelected) {  	
      tipAmountSelected = this.value;
      tipIsSelected = true;
      validateTipOptions(tipIsSelected, customRadioErrorContainer);     
      
    }
    if (tipBtns[i].id !== "tip-other") {
      customRadio.value = null;
      customRadio.setAttribute("placeholder", "Custom");
      customRadio.classList.remove("custom-radio-accent");
    }

    displayResults(textFieldsValidated, tipIsSelected, bill, tipAmountSelected, people);    
  });
}


// Event listeners

customRadio.addEventListener("input", function (evt) {
  if (validateCustomRadioField(customRadio, customRadioErrorContainer)) {    
    document.getElementById("tip-other").value = customRadio.value;
    document.getElementById("tip-other").checked = true;
    tipAmountSelected = customRadio.value;
    tipIsSelected = true;  
    customRadio.classList.add("custom-radio-accent");
  }
  displayResults(textFieldsValidated, tipIsSelected, bill, tipAmountSelected, people);
});

for (let i = 0; i < allInputFields.length; i++) {
  allInputFields[i].onkeyup = delay( (e) => {  
    bill = billAmountField.value;
    people = numOfPeopleField.value; 
    
    // validateFormField(allInputFields[i], errorContainers[i]);
    if (customRadio.value.length > 0) {
      tipBtns[5].setAttribute("value", customRadio.value);
      tipBtns[5].checked = true;
    }
  
    if (!validateFormField(allInputFields[i], errorContainers[i]) || bill == 0 || people == 0 || bill == "undefined" || people == "undefined" || tipIsSelected == false) {
      textFieldsValidated = false;
      totalPerPersonField.textContent = "0.00";
      tipPerPersonField.textContent = "0.00";
    } else {
      textFieldsValidated = true;      

      totalPerPersonField.textContent = parseFloat(calculateTotalPerPerson(bill, people, tipAmountSelected)).toFixed(2);
      tipPerPersonField.textContent = parseFloat(calculateTipPerPerson(bill, tipAmountSelected, people)).toFixed(2);
    }  
  }, 500);  
}

resetBtn.addEventListener("click", function (e) {
  tipPerPersonField.textContent = "0.00";
  totalPerPersonField.textContent = "0.00";
});


















