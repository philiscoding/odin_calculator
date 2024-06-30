/*OPERATIONS */
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

function operate(a, b, operator) {
    return operator(a, b);
}

/*VARIABLES */
let firstNum;
let secondNum;
let operator;
let displayValue;

/*DOM ELEMENTS*/
const buttons = document.querySelectorAll("button");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector(".display");
const equal = document.querySelector(".equal");

/*update display*/
buttons.forEach(button => {
    button.addEventListener("click", updateDisplay);
})

/*update display*/
equal.addEventListener("click", updateDisplay);

//set number values to do math
numbers.forEach(number => {
    number.addEventListener("click", setNumbers)
});

//set operator value to do math
operators.forEach(operator => {
    operator.addEventListener("click", setOperator)
});


function updateDisplay(e) {
    let clickedBtn = e.target;

    if (!displayValue) {
        displayValue = clickedBtn.textContent;
        display.textContent = displayValue;
    } else if (clickedBtn.dataset.attribute == "number" ||
        clickedBtn.dataset.attribute == "operator") {
        displayValue += clickedBtn.textContent;
        display.textContent = displayValue;
    }

    /* press equal sign */
    if (clickedBtn.dataset.attribute == "equal") {
        if (firstNum && secondNum && operator) {
            displayValue = performOperation();
            display.textContent = displayValue;
            console.log(`displayValue: ${displayValue}`);
            console.log(`first num: ${firstNum}`);
            console.log(`operator: ${operator}`);
        }
    }

    if (firstNum && operator && clickedBtn.dataset.attribute == "operator") {
        displayValue = displayValue.slice(0, displayValue.length - 2) + clickedBtn.textContent;
        display.textContent = displayValue;
    }

    if (clickedBtn.dataset.attribute == "operator" && firstNum && secondNum && operator) {
        displayValue = performOperation() + clickedBtn.textContent;
        display.textContent = displayValue;
    }

    if (clickedBtn.dataset.attribute ==
        "number" &&
        operator &&
        firstNum &&
        secondNum) {
        display.textContent = displayValue;
    }
}

function performOperation() {
    if (firstNum && secondNum && operator) {
        let result = operate(firstNum, secondNum, operator);
        firstNum = result;
        secondNum = null;
        operator = null;
        return result;
    }
}

function setNumbers(e) {
    let clickedBtn = e.target;

    //sets display if it was empty before
    if (!displayValue) {
        displayValue = clickedBtn.textContent;
        display.textContent = displayValue;
    }

    //Sets first and second number
    if (clickedBtn.dataset.attribute == "number") {
        if (!operator) {
            firstNum = parseInt(displayValue);
            console.log(`displayValue: ${displayValue}`);
            console.log(`first num: ${firstNum}`);
            console.log(`operator: ${operator}`);

        } else {
            secondNum = +displayValue.slice(firstNum.toString().length + 1);
            console.log(`displayValue: ${displayValue}`);
            console.log(`first num: ${firstNum}, operator: ${operator.toString()}, second num: ${secondNum}`);
        }
    }


}
//sets operator
function setOperator(e) {
    let clickedBtn = e.target;

    //Sets operator if operator if operator button is clicked
    if (clickedBtn.dataset.attribute == "operator") {
        switch (clickedBtn.textContent) {
            case "+":
                operator = add;
                break;
            case "-":
                operator = subtract;
                break;
            case "x":
                operator = multiply;
                break;
            case "/":
                operator = divide;
                break;
        }
        console.log(`displayValue: ${displayValue}`);
        console.log(`first num: ${firstNum}, operator: ${operator.toString()}, second num: ${secondNum}`);
    }
}
