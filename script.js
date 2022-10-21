//GRID SIZE
const squareContainer = document.querySelector(".squareContainer");
const sizeElement = document.querySelector(".size");
let size = sizeElement.value;

//GRID LINES
const gridLineButton = document.querySelector(".gridLines");
let gridlines = true;

gridLineButton.addEventListener("click", () => {
	if (gridlines === true) {
		turnGridlinesOff();
	} else if (gridlines === false) {
		turnGridlinesOn();
	}
});

//GRID COLOR STUFF
const color = document.querySelector(".Color");
const clearGridButton = document.querySelector(".clearGrid");
let draw = false;

//RAINBOW
const rainbowButton = document.querySelector(".rainbow");
let rainbow = false;

rainbowButton.addEventListener("click", () => {
	if (rainbow === false) {
		turnRainbowOn();
	} else if (rainbow === true) {
		turnRainbowOff();
	}
});
//ERASER STUFF
const eraserButton = document.querySelector(".eraser");
let eraser = false;

eraserButton.addEventListener("click", () => {
	if (eraser === false) {
		turnEraserOn();
	} else if (eraser === true) {
		turnEraserOff();
	}
});

//POPULATE THE GRID
function fillContainer(size) {
	squareContainer.style.setProperty("--size", size);
	for (let i = 0; i < size * size; i++) {
		const square = document.createElement("div");
		square.classList.add("square");

		//SO YOU CAN DRAG THE MOUSE OVER TO DRAW
		square.addEventListener("mouseover", () => {
			if (!draw) {
				return;
			}
			if (eraser) {
				square.style.backgroundColor = "";
			} else if (rainbow) {
				rainbowBrush(square);
			} else {
				square.style.backgroundColor = color.value;
			}
		});
		//SO YOU CAN CLICK TO COLOR AND TO FILL THE CLICKED BOX WITH COLOR WHEN YOU CLICK > DRAG
		square.addEventListener("mousedown", () => {
			if (eraser) {
				square.style.backgroundColor = "";
			} else if (rainbow) {
				rainbowBrush(square);
			} else {
				square.style.backgroundColor = color.value;
			}
		});
		squareContainer.appendChild(square);
	}
}

//DRAWING EVENT LISTENERS
window.addEventListener("mousedown", () => (draw = true));
window.addEventListener("mouseup", () => (draw = false));

//CLEAR GRID BUTTON
clearGridButton.addEventListener("click", clearGrid);

function clearGrid() {
	if (window.confirm("Are you sure you want to clear the grid?")) {
		squareContainer.innerHTML = "";
		fillContainer(size);
		turnEraserOff();
		turnRainbowOff();
	} else {
		return;
	}
}

//ADJUST SIZE OF GRID

sizeElement.addEventListener("keyup", () => {
	if (sizeElement.value <= 64) {
		size = sizeElement.value;
		squareContainer.innerHTML = "";
		fillContainer(size);
		turnEraserOff();
		turnRainbowOff();
	} else {
		alert("Please enter a number between 1 and 64.");
	}
});

//HELPER FUNCTIONS

function turnEraserOn() {
	turnRainbowOff();
	eraser = true;
	document.querySelector(".eraser").style.backgroundColor = "rgb(27, 206, 45)";
}

function turnEraserOff() {
	eraser = false;
	document.querySelector(".eraser").style.backgroundColor = "";
}

function turnRainbowOn() {
	turnEraserOff();
	rainbow = true;
	rainbowButton.classList.add("rainbowButtonAnimation");
}

function turnRainbowOff() {
	rainbow = false;
	document.querySelector(".rainbow").style.color = "";
	rainbowButton.classList.remove("rainbowButtonAnimation");
}

function rainbowBrush(square) {
	const randomRed = Math.floor(Math.random() * 256);
	const randomGreen = Math.floor(Math.random() * 256);
	const randomBlue = Math.floor(Math.random() * 256);
	square.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}

function turnGridlinesOn() {
	gridlines = true;
	squareContainer.classList.add("gridLines");
}

function turnGridlinesOff() {
	gridlines = false;
	squareContainer.classList.remove("gridLines");
}
fillContainer(size);
turnGridlinesOn();
