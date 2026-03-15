const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons .btn");

let current = "0";
let previous = null;
let operator = null;

function updateDisplay() {
  display.value = current;
}

function clear() {
  current = "0";
  previous = null;
  operator = null;
  updateDisplay();
}

function appendNumber(num) {
  if (current === "0" && num !== ".") current = num;
  else current += num;
  updateDisplay();
}

function setDecimal() {
  if (!current.includes(".")) current += ".";
  updateDisplay();
}

function setOperator(op) {
  if (operator !== null && previous !== null) {
    current = String(compute(previous, current, operator));
    updateDisplay();
  }
  previous = current;
  operator = op;
  current = "0";
}

function toggleSign() {
  if (current === "0") return;
  current = current.startsWith("-") ? current.slice(1) : "-" + current;
  updateDisplay();
}

function percent() {
  current = String(parseFloat(current) / 100);
  updateDisplay();
}

function compute(a, b, op) {
  const x = parseFloat(a);
  const y = parseFloat(b);
  switch (op) {
    case "+": return x + y;
    case "−": return x - y;
    case "×": return x * y;
    case "÷": return y === 0 ? "Error" : x / y;
    default: return y;
  }
}

function equals() {
  if (operator === null || previous === null) return;
  current = String(compute(previous, current, operator));
  if (current === "Error") current = "0";
  previous = null;
  operator = null;
  updateDisplay();
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.getAttribute("data-action");
    const value = btn.textContent;

    switch (action) {
      case "clear":
        clear();
        break;
      case "number":
        appendNumber(value);
        break;
      case "decimal":
        setDecimal();
        break;
      case "operator":
        setOperator(value);
        break;
      case "toggle":
        toggleSign();
        break;
      case "percent":
        percent();
        break;
      case "equals":
        equals();
        break;
    }
  });
});

updateDisplay();
