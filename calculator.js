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

    if (displayValue === undefined) {
        displayValue = buttonType.textContent;
        display.textContent = displayValue;
    } else if (buttonType == "number" ||
        buttonType == "operator") {
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

    if (buttonType == "operator") {
        if (firstNum != undefined && operator) {
            displayValue = displayValue.slice(0, displayValue.length - 2) + button.textContent;
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
        }
    }
    if(buttonType =="point"){

    }

}

function resetDisplay() {
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
    displayValue = undefined;
    display.textContent = "";
}

function undo() {
    //should remove last element from display and displayValue
    displayValue = displayValue.slice(0, -1);
    display.textContent = displayValue;

}

function performOperation() {
    if (firstNum != undefined && secondNum != undefined && operator) {
        let result = operate(firstNum, secondNum, operator);
        firstNum = result;
        secondNum = null;
        operator = null;
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

    //sets first number
    if (buttonType == "number") {
        if (!operator) {
            if (firstNum == 0 && button.textContent != "0") {
                displayValue = button.textContent;
                display.textContent = displayValue;
                firstNum = parseInt(displayValue)
            } else {
                firstNum = parseInt(displayValue);
            }
            if (firstNum == "00") {
                firstNum = 0;
                displayValue = "0";
                display.textContent = displayValue;
            }
            console.log(`displayValue: ${ displayValue}`);
            console.log(`first num: ${firstNum}`);
            console.log(`operator: ${operator}`);

        }
        //sets second number
        else {
            secondNum = +displayValue.slice(firstNum.toString().length + 1);
            if (secondNum.toString() == "0") {
                if (button.textContent == "0") {
                    secondNum = 0;
                    displayValue = displayValue.slice(0, -1)
                }
            }
            console.log(`displayValue: ${displayValue}`);
            console.log(`first num: ${firstNum},operator: ${operator.toString()},second num: ${ secondNum}`);
        }
    }
}

//sets operator
function setOperator(e) {
    let button = e.target;
    let buttonType = e.target.dataset.attribute;

    //dont set operator as first click
    if (buttonType == "operator") {
        if (displayValue === undefined) {
            return
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
        console.log(`displayValue: ${displayValue}`);
        console.log(`first num: ${firstNum}, operator: ${operator.toString()}, second num: ${secondNum}`);
    }
}
