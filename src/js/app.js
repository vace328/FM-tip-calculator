// Get all the elements
// let a = document.querySelector('input[name="tip-amount"]:checked').value;
// let tipAmountField = document.querySelector('input[name="tipAmount"]:checked');
let btn = document.getElementById("check");

let billAmountField = document.getElementById('bill-amount'); 
let tipBtns = document.tipCalculator.tipAmount;
let numOfPeopleField = document.getElementById('number-of-people');

let tipAmountSelected = null;


let error1 = document.getElementById("error-1");
let tipPerPerson = 0;
let totalPerPerson = 0;
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
function calculateTipPerPerson(totalBill, tip, numberOfPeople) {
  let tipPP = totalBill * tip / 100 / numberOfPeople;
  return tipPP;
}
function calculateTotalPerPerson(totalBill, numberOfPeople, tipPerPercent) {
  totalPP = (totalBill / numberOfPeople) + calculateTipPerPerson(totalBill, tipPerPercent, numberOfPeople);
//   console.log(totalPP);
  return totalPP;
}

// Function to check if the field is empty
//  FUnction to calculate and display results

btn.addEventListener("click", () => {
    let bill = billAmountField.value;    
    let people = numOfPeopleField.value;
    // let bill = stringToNumber(billAmountField.value);    
    // let people = stringToNumber(numOfPeopleField.value);
  // If empty or is not a number, display error message
  if (!notEmpty(bill) || bill == 0) {
    error1.textContent = `Can't be 0`;
  } else if (!onlyDigits(bill)) {
    error1.textContent = "Has to be a number";
  } else {
    error1.textContent = "";
    // billAmountVal = stringToNumber(bill);
    // console.log(bill);
    // console.log(people);
    
  }
  console.log(typeof(calculateTipPerPerson(bill, tipAmountSelected, people)));
  console.log(calculateTotalPerPerson(bill, people, tipAmountSelected));
//   console.log(calculateTotalPerPerson(142.55, 5, 4.27));



});


for (let i = 0; i < tipBtns.length; i++) {
    tipBtns[i].addEventListener('change', function() {
        // (tipAmountSelected) ? console.log(tipAmountSelected.value): null;
        if (this !== tipAmountSelected) {
            tipAmountSelected = +this.value;
        }
        // console.log(typeof(tipAmountSelected));
        // console.log(tipAmountSelected);
    });
}