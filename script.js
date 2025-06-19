const currDisplay = document.querySelector(".curr-display");
const prevDisplay = document.querySelector(".prev-display");
const numbers = document.querySelectorAll(".number");
const operands = document.querySelectorAll(".operation");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".delete");
const equalBtn = document.querySelector(".equal");
let operation;

function appendNumber(number) {
  if (number === "." && currDisplay.innerText.includes(".")) return;
  currDisplay.innerText += number;
}

function chooseOperation(operand) {
  if (currDisplay.innerText === "") return;
  compute(operand);
  operation = operand;
  prevDisplay.innerText = currDisplay.innerText + " " + operand;
  currDisplay.innerText = "";
}

function clearDisplay() {
  currDisplay.innerText = "";
  prevDisplay.innerText = "";
}

function compute() {
  let result;
  const previousValue = parseFloat(prevDisplay.innerText);
  const currentValue = parseFloat(currDisplay.innerText);
  if (isNaN(previousValue) || isNaN(currentValue)) return;

  switch (operation) {
    case "+":
      result = previousValue + currentValue;
      break;
    case "-":
      result = previousValue - currentValue;
      break;
    case "*":
      result = previousValue * currentValue;
      break;
    case "/":
      result = previousValue / currentValue;
      break;
    default:
      return;
  }

  currDisplay.innerText = result;
  prevDisplay.innerText = "";
}

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    appendNumber(number.innerText);
  });
});

operands.forEach((operand) => {
  operand.addEventListener("click", () => {
    chooseOperation(operand.innerText);
  });
});

clearBtn.addEventListener("click", () => {
  clearDisplay();
});

equalBtn.addEventListener("click", () => {
  compute();
});

delBtn.addEventListener("click", () => {
  if (currDisplay.innerText !== "") {
    currDisplay.innerText = currDisplay.innerText.slice(0, -1);
  } else if (prevDisplay.innerText !== "") {
    // Separate the number and the operator
    const parts = prevDisplay.innerText.trim().split(" ");
    if (parts.length === 2) {
      currDisplay.innerText = parts[0];  // Move number back
      operation = undefined;
      prevDisplay.innerText = "";
    }
  }
});
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || key === ".") {
    appendNumber(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    chooseOperation(key);
  } else if (key === "Enter" || key === "=") {
    e.preventDefault();
    compute();
  } else if (key === "Backspace") {
    if (currDisplay.innerText !== "") {
      currDisplay.innerText = currDisplay.innerText.slice(0, -1);
    } else if (prevDisplay.innerText !== "") {
      const parts = prevDisplay.innerText.trim().split(" ");
      if (parts.length === 2) {
        currDisplay.innerText = parts[0];
        operation = undefined;
        prevDisplay.innerText = "";
      }
    }
  } else if (key === "Escape") {
    clearDisplay();
  }
});
