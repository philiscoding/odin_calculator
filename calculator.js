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


/*VARIABLES */
let firstNum;
let secondNum;
let operator;
let displayValue;
let displayText = "";



//if second number does not exist & last item of display
//is operator, do nothing
//when = is clicked -> perform calculation
//if there is only a number and equal is clicked -> do nothing
//if there is a number and operator -> do nothing




//whenever a number is clicked -> update display
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector(".display");
const equal = document.querySelector(".equal");

//whenever a number is clicked -> update display
numbers.forEach(number => {
    number.addEventListener("click", updateDisplay, );
});

//set number values to do math
numbers.forEach(number => {
    number.addEventListener("click", setValues)
});


//whenever operator is clicked -> update display
operators.forEach(operator => {
    operator.addEventListener("click", updateDisplay)
});

//set operator value to do math
operators.forEach(operator => {
    operator.addEventListener("click", setValues)
});

equal.addEventListener("click", updateDisplay);

function updateDisplay(e) {
    let clickedBtn = e.target;
    if (clickedBtn.dataset.attribute != "equal") {
        displayText += e.target.textContent;
        display.textContent = displayText;
    }


    if (clickedBtn.dataset.attribute == "equal") {
        display.textContent = performOperation();
    }
}

function performOperation() {
    if (firstNum && secondNum && operator) {
        let result = operate(firstNum, secondNum, operator);
        displayValue = result;
        firstNum = result;
        secondNum = null;
        operator = null;
        return result;
    }
}

function resetValues() {

}

//sets firstNum, secondNum, operator
function setValues(e) {
    let clickedBtn = e.target;

    //Sets display values in order to get numbers later
    if (displayValue === undefined) {
        displayValue = +clickedBtn.textContent;
    } else {
        displayValue += clickedBtn.textContent;
    }

    //Sets first and second number
    if (clickedBtn.dataset.attribute == "number") {
        if (!operator) {
            firstNum = +displayValue;
            console.log(`first num: ${firstNum}`);
            console.log(`operator: ${operator}`);
        } else {
            secondNum = +displayValue.slice(firstNum.toString().length + 1);
            console.log("length:" + firstNum.length);
            console.log(`first num: ${firstNum}, operator: ${operator.toString()}, second num: ${secondNum}`);
        }
    }

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
        console.log(operator);
    }
}
