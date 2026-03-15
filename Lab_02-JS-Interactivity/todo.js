function completeTask(taskId) {

    let task = document.getElementById(taskId);
    task.classList.toggle("completed");

    applyCompletedStyle();
}

function removeTask(taskId) {

    let task = document.getElementById(taskId);
    task.style.display = "none";
}

function applyCompletedStyle() {

    let tasks = document.getElementsByClassName("task");

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].classList.contains("completed")) {
            tasks[i].style.backgroundColor = "#e0f2fe";
        } else {
            tasks[i].style.backgroundColor = "#f9fafb";
        }
    }
}
