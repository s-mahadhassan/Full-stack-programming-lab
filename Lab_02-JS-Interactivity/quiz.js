let answer1 = "4";
let answer2 = "islamabad";
let answer3 = "yes";

function checkQ1() {
    let user = document.getElementById("q1").value;
    return user == answer1;
}

function checkQ2() {
    let user = document.getElementById("q2").value.toLowerCase();
    return user == answer2;
}

function checkQ3() {
    let user = document.getElementById("q3").value.toLowerCase();
    return user == answer3;
}

function checkQuiz() {
    let score = 0;

    if (checkQ1()) score++;
    if (checkQ2()) score++;
    if (checkQ3()) score++;

    let message = "";

    if (score == 3) {
        message = "Excellent! Full Marks";
    } 
    else if (score == 2) {
        message = "Good Job";
    } 
    else {
        message = "Try Again";
    }

    document.getElementById("result").innerText =
        "Your Score: " + score + "/3\n" + message;
}

function resetQuiz() {
    document.getElementById("q1").value = "";
    document.getElementById("q2").value = "";
    document.getElementById("q3").value = "";
    document.getElementById("result").innerText = "";
}
