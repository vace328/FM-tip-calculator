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

let tipAmountSelected = null;
let tipIsSelected = false;
let radioBtnStatus = [];

// let tipPerPerson = 0;
// let totalPerPerson = 0;
// let billAmountVal = 0;

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


function calculateTipPerPerson(totalBill, tip, numberOfPeople) {
  totalBill = stringToNumber(totalBill);
  tip = stringToNumber(tip);
  numberOfPeople = stringToNumber(numberOfPeople);

  if (tip === 0) {
    return 0;
   
  } else {
    return (totalBill * tip) / 100 / numberOfPeople;
  }

  // let tipPP = (totalBill * tip) / 100 / numberOfPeople;
  // return tipPP;
}

function calculateTotalPerPerson(totalBill, numberOfPeople, tipPercent) {
  totalBill = stringToNumber(totalBill);
  tipPercent = stringToNumber(tipPercent);
  numberOfPeople = stringToNumber(numberOfPeople);

  let totalPP =
    totalBill / numberOfPeople +
    calculateTipPerPerson(totalBill, tipPercent, numberOfPeople);
  return totalPP;
}

//  FUnction to calculate and display results

btn.addEventListener("click", (i) => {
  let bill = billAmountField.value;
  let people = numOfPeopleField.value;
  
  // let bill = stringToNumber(billAmountField.value);
  // let people = stringToNumber(numOfPeopleField.value);

  // validateCustomRadioField(customRadio, customRadioErrorContainer);
  // validateTipOptions(tipIsSelected, customRadioErrorContainer);
  VCRF(tipIsSelected, customRadio, customRadioErrorContainer);
  for (let i = 0; i < allInputFields.length; i++) {
    validateFormField(allInputFields[i], errorContainers[i]);
  }

  if (customRadio.value.length > 0) {
    tipBtns[5].setAttribute("value", customRadio.value);
    tipBtns[5].checked = true;
  }

  if (bill == 0 || people == 0 || bill == "undefined" || people == "undefined" || tipIsSelected == false) {
    totalPerPersonField.textContent = "0";
    tipPerPersonField.textContent = "0";
  } else {
    totalPerPersonField.textContent = calculateTotalPerPerson(bill, people, tipAmountSelected);
    tipPerPersonField.textContent = calculateTipPerPerson(bill, tipAmountSelected, people);
  }
  
  
});

// Get radio value
for (let i = 0; i < tipBtns.length; i++) {
  console.log( tipBtns[i].checked);
  tipBtns[i].addEventListener("change", function () {
    // (tipAmountSelected) ? console.log(tipAmountSelected.value): null;
    if (this !== tipAmountSelected) {
    //   this.setAttribute("checked", "");
	console.log(this);
      tipAmountSelected = this.value;
      tipIsSelected = true;
      validateTipOptions(tipIsSelected, customRadioErrorContainer);
      // customRadioErrorContainer.textContent="";
    }

    if (tipBtns[i].id !== "tip-other") {
      // tipBtns[i].removeAttribute("checked");
      customRadio.value = null;
      customRadio.setAttribute("placeholder", "Custom");
      // customRadio.style.border = "unset";
      customRadio.classList.remove("custom-radio-accent");
      ;
    }
   	console.log(tipAmountSelected);
  });
}


customRadio.addEventListener("input", function (evt) {
  if (validateCustomRadioField(customRadio, customRadioErrorContainer)) {    
    document.getElementById("tip-other").value = customRadio.value;
    document.getElementById("tip-other").checked = true;
    tipAmountSelected = customRadio.value;
    tipIsSelected = true;
    console.log(tipAmountSelected);
	  // this.style.borderColor = "hsl(172, 67%, 45%)";
    customRadio.classList.add("custom-radio-accent");
  }
});
