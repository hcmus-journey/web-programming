function calculate() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const errorMessage = document.getElementById('error-message');
    const operation = document.querySelector('input[name="operation"]:checked');
    const alert = document.getElementById('alert');
    const resultOutput = document.getElementById('result');
    
    // Clear previous error messages
    errorMessage.innerHTML = '';
    alert.style.visibility = 'hidden';
    resultOutput.value = '';

    if (!checkValidInput(num1Input, num2Input, operation)) {
        alert.style.visibility = 'visible'
        return;
    }

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
                errorMessage.innerHTML = 'Không thể chia cho 0';
                alert.style.visibility = 'visible'
                return;
            }
            result = num1 / num2;
            break;
    }
    resultOutput.value = result; // Display the result
}

function checkValidInput(num1Input, num2Input, operation) {
    const errorMessage = document.getElementById('error-message');

    if (!isDecimalNumber(num1Input.value)) {
        errorMessage.innerHTML = 'Giá trị nhập ở ô <i>Số thứ nhất</i> không phải là số';
        num1Input.focus();
        return false;
    }
    if (!isDecimalNumber(num2Input.value)) {
        errorMessage.innerHTML = 'Giá trị nhập ở ô <i>Số thứ hai</i> không phải là số';
        num2Input.focus();
        return false;
    }
    if (!operation) {
        errorMessage.innerHTML = 'Vui lòng chọn phép toán';
        return false;
    }

    return true;
}

function isDecimalNumber(num) {
    return !isNaN(num) && !isNaN(parseFloat(num)) && !num.includes(' '); 
}