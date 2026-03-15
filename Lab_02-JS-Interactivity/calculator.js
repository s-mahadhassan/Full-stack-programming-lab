function calculate() {

    let n1 = parseFloat(document.getElementById("num1").value);
    let n2 = parseFloat(document.getElementById("num2").value);
    let op = document.getElementById("operation").value;

    let resultBox = document.getElementById("resultBox");

    if (isNaN(n1) || isNaN(n2)) {
        resultBox.innerText = "Please enter valid numbers.";
        resultBox.style.backgroundColor = "#fee2e2";
        return;
    }

    if (op === "/" && n2 === 0) {
        resultBox.innerText = "Division by zero is not allowed.";
        resultBox.style.backgroundColor = "#fee2e2";
        return;
    }

    let result;

    if (op === "+") result = n1 + n2;
    else if (op === "-") result = n1 - n2;
    else if (op === "*") result = n1 * n2;
    else if (op === "/") result = n1 / n2;

    resultBox.innerText = "Result: " + result;

    if (result >= 0) {
        resultBox.style.backgroundColor = "#d1fae5";
    } else {
        resultBox.style.backgroundColor = "#fee2e2";
    }
}

function resetCalc() {
    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("resultBox").innerText = "";
    document.getElementById("resultBox").style.backgroundColor = "#f3f4f6";
}

