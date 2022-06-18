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
  if (currentCalc.textContent != "" && lastCalc.textContent === "") {
    round = 1;
    operator = opsBtn;
    firstOperand = currentCalc.textContent;

    // Display
    lastCalc.textContent = firstOperand.concat(" ", operator);
    currentCalc.textContent = "";
    console.log("BEO1");
  } else if (lastCalc.textContent != "" && secondOperand == "") {
    operator = opsBtn;
    firstOperand = lastCalc.textContent.split(" ")[0];
    secondOperand = currentCalc.textContent;
    operate(operator, firstOperand, secondOperand);

    // Display
    lastCalc.textContent = "";
    lastCalc.textContent = lastCalc.textContent.concat(
      roundedCalc,
      " ",
      operator
    );
    currentCalc.textContent = "";
    // secondOperand = "";
    console.log("BEO2", operator, firstOperand, secondOperand);
  }

  // else if (lastCalc.textContent != "" && secondOperand != "") {
  //   operator = opsBtn;
  //   firstOperand = currentCalc.textContent;
  //   secondOperand = lastCalc.textContent.split(" ")[0];
  //   console.log(secondOperand);
  //   operate(operator, firstOperand, secondOperand);

  //   // Display
  //   lastCalc.textContent = "";
  //   lastCalc.textContent = lastCalc.textContent.concat(
  //     roundedCalc,
  //     " ",
  //     operator
  //   );
  //   currentCalc.textContent = "";
  //   console.log("BEO3", operator, firstOperand, secondOperand);
  //   // firstOperand = "";
  //   // secondOperand = "";
  // }
}

function evaluate() {
  if (operator && round == 1) {
    firstOperand = lastCalc.textContent.split(" ")[0];
    secondOperand = currentCalc.textContent;
    currentCalc.textContent = operate(operator, firstOperand, secondOperand);
    round++;

    // Display
    lastCalc.textContent = lastCalc.textContent.concat(
      " ",
      currentCalc.textContent
    );
    statusMsg.textContent = " ";
    lastCalc.textContent = "";
    console.log("bro1");
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
    console.log("bro2");
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

  // Check decimals and length

  roundedCalc = Math.round(result * 1000) / 1000;

  if (
    (roundedCalc % 1 != 0 && roundedCalc.toString().length <= 11) ||
    (roundedCalc % 1 === 0 && roundedCalc.toString().length <= 11)
  ) {
    return roundedCalc;
  } else if (
    (roundedCalc % 1 != 0 && roundedCalc.toString().length > 11) ||
    (roundedCalc % 1 === 0 && roundedCalc.toString().length > 11)
  ) {
    return roundedCalc.toExponential(3);
  }
}

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
