document.addEventListener('DOMContentLoaded', function() {
    const errorMessageNum1 = document.getElementById('error-message-num1');
    const errorMessageNum2 = document.getElementById('error-message-num2');

    errorMessageNum1.hidden = false;
    errorMessageNum1.innerHTML = 'Vui lòng nhập giá trị vào ô <i>Số thứ nhất</i>';
    
    errorMessageNum2.hidden = false;
    errorMessageNum2.innerHTML = 'Vui lòng nhập giá trị vào ô <i>Số thứ hai</i>';
});


function calculate() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operation = document.querySelector('input[name="operation"]:checked');
    const resultOutput = document.getElementById('result');
    const errorMessage = document.getElementById('error-message-radio');

    if (!validateOperation(operation) || 
    !validateInput('num1', 'Số thứ nhất') || 
    !validateInput('num2', 'Số thứ hai')) {
        return;
    }

    resultOutput.value = '';

    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);

    let result;
    switch (operation.value) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 === 0) {
                errorMessage.hidden = false;
                errorMessage.innerHTML = 'Không thể chia cho 0';
                return;
            }
            result = num1 / num2;
            break;
    }
    resultOutput.value = result; // Display the result
}

function validateInput(inputId, fieldName) {
    const inputElement = document.getElementById(inputId);
    const errorMessage = document.getElementById('error-message-' + inputId);
    const resultOutput = document.getElementById('result');

    if (inputElement.value === "") {
        errorMessage.hidden = false;
        errorMessage.innerHTML = `Vui lòng nhập giá trị vào ô <i>${fieldName}</i>`;
        resultOutput.value = '';
        return false;
    }

    if (!isDecimalNumber(inputElement.value)) {
        errorMessage.hidden = false;
        errorMessage.innerHTML = `Giá trị nhập ở ô <i>${fieldName}</i> không phải là số`;
        resultOutput.value = '';
        return false;

    }
    errorMessage.hidden = true;
    errorMessage.innerHTML = '';
    
    return true;
}


function validateOperation(operation) {
    const errorMessage = document.getElementById('error-message-radio');

    if (!operation) {
        errorMessage.hidden = false;
        errorMessage.innerHTML = 'Vui lòng chọn phép toán';
        return false;
    }
        errorMessage.hidden = true;
    return true;
}

function isDecimalNumber(num) {
    return !isNaN(num) && !isNaN(parseFloat(num)) && !num.includes(' '); 
}