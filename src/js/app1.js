// Get the elements

let btn = document.getElementById("check");

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
// function changeErrorMsg(element, className, errorText) {
//     if(hasClass(element, className)) {
//       element.classList.remove(className);
//       setTimeout(function(){
//         element.classList.add(className);
//         element.innerHTML = errorText;
//       }, 500);
//     } else {
//       element.innerHTML = errorText;
//       element.classList.add(className);
//     }
//   }
function validateFormField(field, error) {
  // let fieldType = field.getAttribute("type");

  if (!notEmpty(field.value) || field.value == 0) {
    error.textContent = `Can't be 0`;
    //   changeErrorMsg(error[serial], "error-on", `Can't be 0`);
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
    // error.textContent = "All coool";
    error.textContent = "";
    field.classList.remove("custom-radio-has-error");
  } 

  if (notEmpty(field.value) && onlyDigits(field.value)) {
    return true;
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
  // console.log( tipBtns[i].checked);
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
    
    if (textFieldsValidated == false || bill == 0 || people == 0 || bill == "undefined" || people == "undefined" || tipIsSelected == false) {
      
      totalPerPersonField.textContent = "0.00";
      tipPerPersonField.textContent = "0.00";
    } else {
      
      totalPerPersonField.textContent = calculateTotalPerPerson(bill, people, tipAmountSelected);
      tipPerPersonField.textContent = calculateTipPerPerson(bill, tipAmountSelected, people);
    }  
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
  if (textFieldsValidated == false || bill == 0 || people == 0 || bill == "undefined" || people == "undefined" || tipIsSelected == false) {      
    totalPerPersonField.textContent = "0.00";
    tipPerPersonField.textContent = "0.00";
  } else {
    
    totalPerPersonField.textContent = calculateTotalPerPerson(bill, people, tipAmountSelected);
    tipPerPersonField.textContent = calculateTipPerPerson(bill, tipAmountSelected, people);
  }  
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
      totalPerPersonField.textContent = "0";
      tipPerPersonField.textContent = "0";
    } else {
      textFieldsValidated = true;
      totalPerPersonField.textContent = calculateTotalPerPerson(bill, people, tipAmountSelected);
      tipPerPersonField.textContent = calculateTipPerPerson(bill, tipAmountSelected, people);
    }  
  }, 500);  
}

// VCRF(tipIsSelected, customRadio, customRadioErrorContainer);