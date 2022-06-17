// Functions with initialization priority

function evaluate() {
  if (operator && round == 1) {
    lastCalc.textContent = lastCalc.textContent.concat(
      " ",
      currentCalc.textContent
    );
    secondOperand = currentCalc.textContent;
    currentCalc.textContent = operate(operator, firstOperand, secondOperand);
    round++;
  } else {
    lastCalc.textContent = `${currentCalc.textContent} ${operator} ${secondOperand}`;
    firstOperand = currentCalc.textContent;
    currentCalc.textContent = operate(operator, firstOperand, secondOperand);
  }
}

function clearCalc() {
  currentCalc.textContent = "";
  lastCalc.textContent = "";
  operator = "";
  firstOperand = "";
  secondOperand = "";
  round = 1;
}

function addDecimal() {
  if (
    !currentCalc.textContent.includes(".") &&
    currentCalc.textContent.length <= 10
  ) {
    currentCalc.textContent = currentCalc.textContent.concat("", ".");
  }
}

// Listeners

let operator;
let firstOperand;
let secondOperand;
let round = 1;
let result;

let lastCalc = document.querySelector(".lastCalc");
let currentCalc = document.querySelector(".currentCalc");
let clearBtn = document.querySelector(".clearBtn");
let negBtn = document.querySelector(".negBtn");
let delBtn = document.querySelector(".delBtn");
let numBtn = document.querySelectorAll(".numBtn");
let opsBtn = document.querySelectorAll(".opsBtn");
let equalBtn = document.querySelector(".equalBtn");
let decimalBtn = document.querySelector(".decimalBtn");

clearBtn.addEventListener("click", clearCalc);
delBtn.addEventListener("click", deleteNumber);
negBtn.addEventListener("click", setNegative);

numBtn.forEach((button) =>
  button.addEventListener("click", () => setNumber(button.textContent))
);
opsBtn.forEach((button) =>
  button.addEventListener("click", () => setOperator(button.textContent))
);

equalBtn.addEventListener("click", evaluate);
decimalBtn.addEventListener("click", addDecimal);

// Functions

function operate(operator, firstOperand, secondOperand) {
  let a = parseFloat(firstOperand);
  let b = parseFloat(secondOperand);

  if (operator === "+") {
    result = a + b;
  } else if (operator === "-") {
    result = a - b;
  } else if (operator === "×") {
    result = a * b;
  } else if (operator === "÷") {
    result = a / b;
  }

  if (result.toString().length < 12) {
    return result;
  } else {
    return result.toExponential(5);
  }
}

function setNumber(numBtn) {
  let input = currentCalc.textContent;

  if (input.length >= 10) {
    alert("Max characters entered.");
  } else if (input.length == 0 && operator === "÷" && numBtn === "0") {
    alert("Ha, as intriguing as it sounds, you can't divide by a zero!");
  } else {
    currentCalc.textContent = input.concat("", numBtn);
  }
}

function setOperator(opsBtn) {
  if (currentCalc.textContent) {
    round = 1;
    operator = opsBtn;
    firstOperand = currentCalc.textContent;
    lastCalc.textContent = currentCalc.textContent.concat(" ", operator);
    currentCalc.textContent = "";
  }
}

function deleteNumber() {
  currentCalc.textContent = currentCalc.textContent.toString().slice(0, -1);
}

function setNegative() {
  currentCalc.textContent = (currentCalc.textContent * -1).toString();
}
