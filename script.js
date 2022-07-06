// Defaults

let firstOperand = "";
let secondOperand = "";
let currentOps = null;
let resetCalc = false;

// Selectors

const statusMsg = document.querySelector(".statusMsg");
const lastCalc = document.querySelector(".lastCalc");
const currentCalc = document.querySelector(".currentCalc");
const clearBtn = document.querySelector(".clearBtn");
const negBtn = document.querySelector(".negBtn");
const delBtn = document.querySelector(".delBtn");
const numBtn = document.querySelectorAll(".numBtn");
const opsBtn = document.querySelectorAll(".opsBtn");
const equalBtn = document.querySelector(".equalBtn");
const decimalBtn = document.querySelector(".decimalBtn");

// Rounding and calculation

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, x, y) {
  // following no-param-reassign rule:
  const a = Number(x);
  const b = Number(y);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      return divide(a, b);
    default:
      return null;
  }
}

function roundCalc(number) {
  return Math.round(number * 1000) / 1000;
}

function evaluate() {
  if (currentOps === null || resetCalc) return;
  if (currentOps === "÷" && currentCalc.textContent === "0")
    statusMsg.textContent = ">   You can't divide by a zero!";

  secondOperand = currentCalc.textContent;
  currentCalc.textContent = roundCalc(
    operate(currentOps, firstOperand, secondOperand)
  );

  lastCalc.textContent = `${firstOperand} ${currentOps} ${secondOperand} = `;
  currentOps = null;
}

// User inputs

function resetScreen() {
  currentCalc.textContent = "";
  resetCalc = false;
}

function clearCalc() {
  currentCalc.textContent = "0";
  lastCalc.textContent = "";
  statusMsg.textContent = " ";
  firstOperand = "";
  secondOperand = "";
  currentOps = null;
}

function setNegative() {
  currentCalc.textContent = (currentCalc.textContent * -1).toString();
}

function deleteNumber() {
  currentCalc.textContent = currentCalc.textContent.toString().slice(0, -1);
}

function setNumber(number) {
  if (currentCalc.textContent.length >= 10) {
    statusMsg.textContent = ">   Number limit reached.";
  } else if (currentCalc.textContent === "0" || resetCalc) {
    resetScreen();
    currentCalc.textContent += number;
  } else {
    currentCalc.textContent += number;
  }
}

function setOperator(operator) {
  if (currentOps !== null) evaluate();
  firstOperand = currentCalc.textContent;
  currentOps = operator;
  lastCalc.textContent = `${firstOperand} ${currentOps}`;
  resetCalc = true;
}

function setDecimal() {
  if (resetCalc) resetScreen();
  if (currentCalc.textContent === "") currentCalc.textContent = "0";
  if (currentCalc.textContent.includes(".")) return;
  currentCalc.textContent += ".";
}

// Keyboard support

function convertOps(opsKey) {
  switch (opsKey) {
    case "+":
      return "+";
    case "-":
      return "-";
    case "*":
      return "×";
    case "/":
      return "÷";
    default:
      return null;
  }
}

function convertKeys(e) {
  if (e.key === "Escape") clearCalc();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === ".") setDecimal();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key >= 0 && e.key <= 9) setNumber(e.key);
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperator(convertOps(e.key));
}

// Event Listeners

clearBtn.addEventListener("click", clearCalc);
negBtn.addEventListener("click", setNegative);
delBtn.addEventListener("click", deleteNumber);
window.addEventListener("keydown", convertKeys);

numBtn.forEach((button) =>
  button.addEventListener("click", () => setNumber(button.textContent))
);
opsBtn.forEach((button) =>
  button.addEventListener("click", () => setOperator(button.textContent))
);

decimalBtn.addEventListener("click", setDecimal);
equalBtn.addEventListener("click", evaluate);
