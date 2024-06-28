/*Operators */



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

function pow(a, b) {
    return a ** b;
}

function operate(a, b, operator) {
    return operator(a, b);
}

//add event listeners to all buttons
//if number buttons are clicked, update display
//if AC -> clear display
//if undo -> remove last number pressed from display
//if point -> add point
//if equal -> perform calculation

/*VARIABLES */
let firstNum;
let secondNum;
let operator;
let displayValue = "";
let result;


/* DOM STUFF */
const numbers = document.querySelectorAll(".number");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operator");


numbers.forEach(button => {
    button.addEventListener("click", updateDisplay);
});
operators.forEach(operator => {
    operator.addEventListener("click", updateDisplay)
})

//loop over operators
//attach event listeners
//when clicked, update the display with operator that was clicked
//also update firstNum and operator

function updateDisplay(e) {

    if (e.target.textContent === "0") {
        //handle buggy 0 stuff
        switch (displayValue) {
            case "0":
                return;
        }
    }

    if (e.target.dataset.attribute == "operator") {
        // cant chain multiple operators in a row
        switch (displayValue.at(-1)) {
            case "/":
            case "-":
            case "+":
            case "x":
                return
        }

    }

    display.textContent += e.target.textContent;
    displayValue += e.target.textContent;

    if (e.target.dataset.attribute === "operator") {

        if (typeof firstNum == "number") {
            secondNum = +displayValue.slice(0, displayValue.length - 1);
            operator = displayValue.at(-1);

            switch (operator) {
                case "/":
                    operator = divide;
                    break;
                case "x":
                    operator = multiply;
                    break;
                case "+":
                    operator = add;
                    break;
                case "-":
                    operator = subtract;
            }


        }

        firstNum = +displayValue.slice(0, displayValue.length - 1);
        operator = displayValue.at(-1);

        if (firstNum && secondNum && operator) {
            let result = operate(firstNum, secondNum, operator);
            console.log(result);
        }

        displayValue = "";

    }



}
