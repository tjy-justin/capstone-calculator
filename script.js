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
decimalBtn.addEventListener("click", setDecimal);

// Functions

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
    return result.toExponential(3);
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

function setNegative() {
  if (currentCalc.textContent) {
    currentCalc.textContent = (currentCalc.textContent * -1).toString();
  }
}

// EXTRA CREDIT

function setDecimal() {
  if (
    !currentCalc.textContent.includes(".") &&
    currentCalc.textContent.length <= 10
  ) {
    currentCalc.textContent = currentCalc.textContent.concat("", ".");
  }
}

function deleteNumber() {
  currentCalc.textContent = currentCalc.textContent.toString().slice(0, -1);
}

// window.addEventListener("keydown", convertKeys);

// function convertKeys(e) {
//   if (e.key === "Escape") clearCalc();
//   if (e.key === "Backspace") deleteNumber();
//   if (e.key === ".") setDecimal();
//   if (e.key === "=" || e.key === "Enter") evaluate();
//   if (e.key >= 0 && e.key <= 9) setNumber(e.key);
//   if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
//     operate(convertOps(e.key));
// }

// function convertOps(operator) {
//   if (operator === "/") return "÷";
//   if (operator === "*") return "×";
//   if (operator === "-") return "-";
//   if (operator === "+") return "+";
// }
