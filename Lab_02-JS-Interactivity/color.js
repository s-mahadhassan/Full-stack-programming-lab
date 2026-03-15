/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
function addColors() {

    let colors = [
        document.getElementById("color1").value,
        document.getElementById("color2").value,
        document.getElementById("color3").value
    ];

    let container = document.getElementById("boxContainer");

    for (let i = 0; i < colors.length; i++) {

        if (colors[i] !== "") {

            let box = document.createElement("div");
            box.className = "color-box";
            box.style.backgroundColor = colors[i];

            container.appendChild(box);
        }
    }

    displayBrowserInfo();
}

function clearBoxes() {
    document.getElementById("boxContainer").innerHTML = "";
    document.getElementById("browserInfo").innerText = "";
}

function displayBrowserInfo() {

    let info = "Window Width: " + window.innerWidth +
               " | Window Height: " + window.innerHeight +
               " | Browser: " + navigator.userAgent;

    document.getElementById("browserInfo").innerText = info;
}


