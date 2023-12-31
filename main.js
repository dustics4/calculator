let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.getElementById('equalsBtn');
const clearButton = document.getElementById('clearBtn');
const deleteButton = document.getElementById('deleteBtn');
const pointButton = document.getElementById('pointBtn');
const lastOperationScreen = document.getElementById('lastOperationScreen');
const currentOperationScreen = document.getElementById('currentOperationScreen');

//upon click run the function
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
pointButton.addEventListener('click', appendPoint)

//upon clicking the buttons , show the number on the current operation screen
numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)
//upon clicking the operators , do the operator
operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

//this functions resets the current screen, it is used in other functions after doing something
function resetScreen() {
   currentOperationScreen.textContent = ''
   shouldResetScreen = false
}

//Convert number to string and slice each character e.g 2918 - take away 8 from the end
function deleteNumber() {
   currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, 1)
}

//Allows you to add a point into the number.
function appendPoint() {
   if (shouldResetScreen) resetScreen()
   if (currentOperationScreen.textContent === '')
     currentOperationScreen.textContent = '0'
   if (currentOperationScreen.textContent.includes('.')) return
   currentOperationScreen.textContent += '.'
 }

 //This allows you to clear the text within the screen. Making sure the current screen is 0 and the last one is empty as it should be
 function clear() {
   currentOperationScreen.textContent = '0'
   lastOperationScreen.textContent = ''
   firstOperand = ''
   secondOperand = ''
   currentOperation = null
 }

//If a number is selected add this to the current screen. If it is equal to 0, then it should reset the screen.
function appendNumber(number) {
 if (currentOperationScreen.textContent === '0' || shouldResetScreen)
   resetScreen()
 currentOperationScreen.textContent += number
}
//when running this function it resets the screen
function resetScreen() {
 currentOperationScreen.textContent = ''
 shouldResetScreen = false
}

//
function appendPoint() {
 if (shouldResetScreen) resetScreen()
 if (currentOperationScreen.textContent === '')
   currentOperationScreen.textContent = '0'
 if (currentOperationScreen.textContent.includes('.')) return
 currentOperationScreen.textContent += '.'
}

function setOperation(operator) {
 if (currentOperation !== null) evaluate()
 firstOperand = currentOperationScreen.textContent
 currentOperation = operator
 lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
 shouldResetScreen = true
}

//function created to help when trying to divide by 0.
function evaluate() {
 if (currentOperation === null || shouldResetScreen) return
 if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
   alert("Can't do that mate :)");
   return
 }
 secondOperand = currentOperationScreen.textContent
 currentOperationScreen.textContent = roundResult(
   operate(currentOperation, firstOperand, secondOperand)
 )
 lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
 currentOperation = null
}
//This is equal to 0 - helps with setting up the equals button, as it shouldn't work if you divide by 0
function roundResult(number) {
 return Math.round(number * 1000) / 1000
}

//Function that adds
function add(a,b){
   return a + b;
}

//Function that subtracts
function subtract(a,b){
  return a - b;
}

//Function that multiplies
function multiply(a, b) {
   return a * b;
}

//function that divides
function divide(a, b) {
   return a / b;
}

//Calculates the numbers when an operator is chosen
function operate(operator, a , b) {
   a = Number(a);
   b = Number(b);

   switch(operator) {
      case '+':
         return add(a,b)
      case '-':
         return subtract(a,b)
      case 'x':
         return multiply(a,b)
      case '%':
         if (b === 0) return null
         else return divide(a,b)
      default:
         return null
   }
}