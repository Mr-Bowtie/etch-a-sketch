const gridDiv = document.getElementById("gridContainer");
const resize = document.getElementById("resetBtn");
const clear = document.getElementById("clearBtn");
const body = document.querySelector("body");

let colorChoice = "default";
let mousePosition = -1;
let mouseDown = false;


function layoutGrid(size) {
    gridDiv.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridDiv.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i !== (size ** 2); i++) {
        var div = document.createElement("DIV");
        div.className = "gridUnit";
        div.id = `${i}`;
        div.setAttribute("draggable", "false");
        gridDiv.appendChild(div);
    }
    document.querySelectorAll(".gridUnit").forEach(cell => cell.addEventListener("mouseover", updateMousePosition));
}

function updateMousePosition() { 
    mousePosition = this.id;
    console.log(`${mousePosition}`)
}

function toggleButton(e) {
    colorChoice = e.target.id;
}

function clearGrid() {
    document.querySelectorAll(".gridUnit").forEach(cell => {
    cell.style.backgroundColor = "";
    cell.style.opacity = null;
    });

}

function rebuildGrid() {
    while (gridDiv.firstChild){
        gridDiv.removeChild(gridDiv.firstChild);
    }
    let gridSize = prompt("How many squares per side would you like this grid to be? (Max 100)");
    layoutGrid(gridSize);
}

function colorCell(cell) {
    if (colorChoice === "default") {
        cell.style.backgroundColor = "black";
    }
    else if (colorChoice === "randColorBtn") {
        cell.style.backgroundColor = randomizedColor();
    }
    else if (colorChoice === "shadingBtn") {
        darken(cell);
    }
}

function randomizedColor() {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return ("#" + randomColor);
}

function darken(cell) {

    if (!cell.style.opacity) {
        cell.style.opacity = 0
    }

    if (!cell.style.backgroundColor) {
        cell.style.backgroundColor = "black";
    }


    if (cell.style.opacity < 1) {
        cell.style.opacity = Number(cell.style.opacity) + 0.1;
    }
}

function mouseDownHandler() {
    if (mousePosition >= 0) {
        colorCell(document.getElementById(`${mousePosition}`));
    }
    mouseDown = true;
}

function mouseOverHandler() {
   if (mouseDown == true && mousePosition >= 0) {
        colorCell(document.getElementById(`${mousePosition}`));
   }
}

function mouseUpHandler() {
    mouseDown = false; 
}

function mouseLeaveHandler() {
    mousePosition = -1;
}

body.addEventListener("mousedown", mouseDownHandler);
gridDiv.addEventListener("mouseover", mouseOverHandler);
body.addEventListener("mouseup", mouseUpHandler);
body.addEventListener("dragover", mouseOverHandler);
gridDiv.addEventListener("mouseleave", mouseLeaveHandler);
resize.addEventListener("click", rebuildGrid);
clear.addEventListener("click", clearGrid);
document.querySelectorAll(".colorOption").forEach(button => button.addEventListener("click", toggleButton));

layoutGrid(10);
