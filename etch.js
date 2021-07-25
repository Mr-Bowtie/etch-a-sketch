const gridDiv = document.getElementById("gridContainer");
const resize = document.getElementById("resetBtn");
const clear = document.getElementById("clearBtn");
let colorChoice = "default";


function layoutGrid(size) {
    gridDiv.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridDiv.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i !== (size ** 2); i++) {
        var div = document.createElement("DIV");
        div.className = "gridUnit";
        gridDiv.appendChild(div);
    }
    document.querySelectorAll(".gridUnit").forEach(cell => cell.addEventListener("mouseover", colorChange));
}

function toggleButton(e) {
    colorChoice = e.target.id;
}

function clearGrid() {
    document.querySelectorAll(".gridUnit").forEach(cell => cell.style.backgroundColor = "");
    console.log("click");
}

function getGridSize() {
    let gridSize = prompt("How many squares per side would you like this grid to be? (Max 100)");
    layoutGrid(gridSize);
}

function colorChange() {
    if (colorChoice === "default") {
        this.style.backgroundColor = "darkgrey";
    }
    else if (colorChoice === "randColorBtn") {
        this.style.backgroundColor = randomizedColor();
    }
    else if (colorChoice === "shadingBtn") {
        darken(this);
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

resize.addEventListener("click", getGridSize);
clear.addEventListener("click", clearGrid);
document.querySelectorAll(".colorOption").forEach(button => button.addEventListener("click", toggleButton));

getGridSize();
