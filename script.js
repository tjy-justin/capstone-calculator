let operator;
let firstOperand;
let secondOperand;
let round = 1;
let result;

// Listeners

let statusMsg = document.querySelector(".statusMsg");
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
    statusMsg.textContent = ">   Number limit reached.";
  } else if (operator === "÷" && numBtn === "0") {
    statusMsg.textContent = ">   You can't divide by a zero!";
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
  } else if (lastCalc.textContent) {
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
    statusMsg.textContent = " ";
  } else if (
    lastCalc.textContent === "" ||
    currentCalc.textContent === "NaN" ||
    operator === ""
  ) {
    statusMsg.textContent = ">   Enter at least two operands.";
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

  // Check decimals first
  // This code is a holy spaghetti mess, I'm sure it can be refactored!

  roundedCalc = Math.round(result * 1000) / 1000;
  console.log(roundedCalc);
  console.log(roundedCalc % 1);
  console.log(roundedCalc.toString().length);

  if (roundedCalc % 1 != 0 && result.toString().length < 11) {
    return Math.round(result * 1000) / 1000;
  }
}

//  else {
//     if (roundedCalc % 1 != 0) {
//       return roundedCalc.toExponential(3);
//     } else if (roundedCalc.toString().length >= 12) {
//       return roundedCalc.toExponential(3);
//     } else {
//       return Math.round(result * 1000) / 1000;
//     }
//   }

function clearCalc() {
  currentCalc.textContent = "";
  lastCalc.textContent = "";
  statusMsg.textContent = " ";
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

// Keyboard support

window.addEventListener("keydown", convertKeys);

function convertKeys(e) {
  if (e.key === "Escape") clearCalc();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === ".") setDecimal();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key >= 0 && e.key <= 9) setNumber(e.key);
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperator(convertOps(e.key));
}

function convertOps(opsKey) {
  if (opsKey === "+") return "+";
  if (opsKey === "-") return "-";
  if (opsKey === "*") return "×";
  if (opsKey === "/") return "÷";
}
