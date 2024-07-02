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

let isDecimalA = false;
let isDecimalB = false;

/*DOM ELEMENTS*/
const buttons = document.querySelectorAll("button");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector(".display");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const undoBtn = document.querySelector(".undo");

/*update display*/
buttons.forEach(button => {
    button.addEventListener("click", updateDisplay);
})

/*update display*/
equal.addEventListener("click", updateDisplay);

/*reset display */
clear.addEventListener("click", resetDisplay);

//undo button
undoBtn.addEventListener("click", undo);

//set number values to do math
numbers.forEach(number => {
    number.addEventListener("click", setNumbers)
});

//set operator value to do math
operators.forEach(operator => {
    operator.addEventListener("click", setOperator)
});


function updateDisplay(e) {
    let button = e.target;
    let buttonType = e.target.dataset.attribute;

    if (displayValue.length >= 12) {
        return;
    }

    if (displayValue === undefined) {
        if (buttonType == "point") {
            return;
        } else {
            displayValue = buttonType.textContent;
            display.textContent = displayValue;
        }

    } else if (buttonType == "number") {

        displayValue += button.textContent;
        display.textContent = displayValue;
    }


    /* press equal sign */
    if (buttonType == "equal") {
        if (secondNum == 0 && operator == divide) {
            alert("Don't divide by 0. Resetting display for your own safety.");
            resetDisplay();
        } else if (firstNum != undefined && secondNum != undefined && operator) {
            displayValue = performOperation();
            display.textContent = displayValue;
        }
    }

    if (buttonType == "operator" && displayValue != undefined) {
        let lastItem = displayValue[displayValue.length - 1];

        if (secondNum === undefined) {
            if (lastItem == ".") {
                isDecimalA = false;
                displayValue = displayValue.slice(0, displayValue.length - 1);
            }
        }

        if (firstNum != undefined && operator && secondNum == undefined) {
            displayValue = displayValue.slice(0, displayValue.length - 1) + button.textContent;
            display.textContent = displayValue;

        } else if (secondNum != undefined) {
            //dividing by 0 resets display
            if (secondNum == 0 && operator == divide) {
                alert("Don't divide by 0. Resetting display for your own safety.");
                resetDisplay();
            } else {
                //update display with result
                let result = performOperation() + button.textContent;
                displayValue = result;
                display.textContent = displayValue;
            }

        } else {
            displayValue += button.textContent;
            display.textContent = displayValue;
        }

    }

    if (buttonType == "point") {

        //first number
        if (!operator && !isDecimalA || operator && !isDecimalB) {
            displayValue += button.textContent;
            display.textContent = displayValue;
        }
    }
}

function resetDisplay() {
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
    displayValue = undefined;
    isDecimalA = false;
    isDecimalB = false;
    display.textContent = "";
}

function undo() {
    let lastItem = displayValue[displayValue.length - 1];

    //undo last element from display and displayValue
    displayValue = displayValue.toString().slice(0, -1);
    display.textContent = displayValue;

    //undo the first number
    if (secondNum === undefined && !operator) {
        firstNum = displayValue;
        isDecimalA = false;
    }
    //undo operator
    else if (firstNum && operator && secondNum === undefined) {
        operator = undefined;
    } else {
        //unset decimal if we remove a point
        if (lastItem == ".") {
            isDecimalB = false;
        }
        //undo second number by last index
        secondNum = secondNum.toString().slice(0, -1);

        //if second number gets deleted, set it to undefined
        if (secondNum.length === 0) {
            secondNum = undefined
        } else {
            secondNum = secondNum;
        }
    }

    console.log(`displayValue: ${ displayValue}`);
    console.log(`first num: ${firstNum}`);
    console.log(`operator: ${operator}`);
    console.log(`second num: ${secondNum}`);
    console.log(`first num decimal: ${isDecimalA}`);
    console.log(`second num decimal: ${isDecimalB}`);

}

function performOperation() {
    if (firstNum != undefined && secondNum != undefined && operator) {
        let result = operate(+firstNum, +secondNum, operator);
        let stringResult = result.toString();
        firstNum = result;
        secondNum = undefined;
        operator = undefined;
        isDecimalB = false;

        //remove firstNum decimal if its still decimal after operation
        if (!(result.toString().includes("."))) {
            isDecimalA = false;
        }
        //truncate if number is too long
        if (stringResult.length > 12) {
            result = +stringResult.slice(0, 13);
        }

        return result;
    }
}

function setNumbers(e) {
    let button = e.target;
    let buttonType = e.target.dataset.attribute;

    //sets display if it was empty before
    if (!displayValue) {
        displayValue = button.textContent;
        display.textContent = displayValue;
    }

    if (buttonType == "point") {
        //set first number decimal
        if (!operator && !isDecimalA) {
            isDecimalA = true;
            firstNum = displayValue;
        }
        //set second number decimal
        else if (operator) {
            isDecimalB = true;
            secondNum = displayValue.slice(firstNum.toString().length + 1);
            if (secondNum.toString() == "0") {
                if (button.textContent == "0") {
                    secondNum = 0;
                    displayValue = displayValue.slice(0, -1)
                }
            }
        }

    }
    //sets first number
    if (buttonType == "number") {
        if (!operator) {
            if (firstNum == "0.") {
                displayValue = firstNum + button.textContent;
                display.textContent = displayValue;
                firstNum = displayValue;
            }
            if (firstNum == 0 && button.textContent != "0") {
                displayValue = button.textContent;
                display.textContent = displayValue;
                firstNum = displayValue;
            } else {
                firstNum = displayValue;
            }
            if (firstNum == "00") {
                firstNum = 0;
                displayValue = "0";
                display.textContent = displayValue;
            }


        }
        //sets second number
        else {
            secondNum = displayValue.slice(firstNum.toString().length + 1);
            if (secondNum.toString() == "0") {
                if (button.textContent == "0") {
                    secondNum = 0;
                    displayValue = displayValue.slice(0, -1)
                }
            }
        }
    }

}

//sets operator
function setOperator(e) {
    let button = e.target;
    let buttonType = button.dataset.attribute;

    //if display is empty dont set operator
    if (buttonType == "operator") {
        if (displayValue === undefined) {
            return;
        }
    }

    switch (button.textContent) {
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
}
