const squareContainer = document.querySelector(".squareContainer");
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");
const gridLineButton = document.querySelector(".gridLines");
const color = document.querySelector(".Color");
const rainbowButton = document.querySelector(".rainbow");
const eraserButton = document.querySelector(".eraser");
const clearGridButton = document.querySelector(".clearGrid");
const paintbucket = document.querySelector(".paintbucket");

const defaultGridSize = 16;

//STATES
let gridlines = true;
let draw = false;
let rainbow = false;
let eraser = false;
let clearGridSize;

//EVENT LISTENERS

//DRAWING
window.addEventListener("mousedown", () => (draw = true));
window.addEventListener("mouseup", () => (draw = false));

//UPDATE SLIDER ON PAGE
sizeSlider.onmousemove = (e) => updateSlider(e.target.value);

//NEW GRID SIZE SLIDER
sizeSlider.onchange = (e) => (
	(clearGridSize = e.target.value), updateGridSize(clearGridSize)
);

//GRID LINES
gridLineButton.addEventListener("click", () => {
	if (gridlines === true) {
		turnGridlinesOff();
	} else if (gridlines === false) {
		turnGridlinesOn();
	}
});

//COLOR
color.addEventListener("click", () => {
	turnEraserOff();
	turnRainbowOff();
});

//RAINBOW
rainbowButton.addEventListener("click", () => {
	if (rainbow === false) {
		turnRainbowOn();
	} else if (rainbow === true) {
		turnRainbowOff();
	}
});

//ERASER
eraserButton.addEventListener("click", () => {
	if (eraser === false) {
		turnEraserOn();
	} else if (eraser === true) {
		turnEraserOff();
	}
});

//CLEAR GRID BUTTON
clearGridButton.addEventListener("click", () => {
	if (window.confirm("Are you sure you want to clear the grid?")) {
		updateGridSize(clearGridSize);
	} else {
		return;
	}
});

//FUNCTIONS

//POPULATE THE GRID -MAIN FUNCTION-
function fillContainer(size) {
	squareContainer.style.setProperty("--size", size);
	for (let i = 0; i < size * size; i++) {
		const square = document.createElement("div");
		square.classList.add("square");

		//SO YOU CAN DRAG THE MOUSE OVER TO DRAW
		dragPaint(square);

		//BACKGROUND COLOR
		colorTheCanvas(square);

		//CLICK > DRAG
		clickPaint(square);
	}
}

function colorTheCanvas(square) {
	paintbucket.addEventListener("click", () => {
		square.style.backgroundColor = color.value;
	});
}

function clickPaint(square) {
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

function dragPaint(square) {
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
}
//RAINBOW
function rainbowBrush(square) {
	const randomRed = Math.floor(Math.random() * 256);
	const randomGreen = Math.floor(Math.random() * 256);
	const randomBlue = Math.floor(Math.random() * 256);
	square.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
}

//CHANGE GRID SIZE WITH SLIDER
function updateGridSize(clearGridSize) {
	squareContainer.innerHTML = "";
	if (clearGridSize) {
		turnEraserOff();
		turnRainbowOff();
		fillContainer(clearGridSize);
	} else {
		turnEraserOff();
		turnRainbowOff();
		fillContainer(defaultGridSize);
	}
}
//CHANGE SLIDER VALUE ON PAGE
function updateSlider(value) {
	sizeValue.innerHTML = `Grid Size: ${value} x ${value}`;
}

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

function turnGridlinesOn() {
	gridlines = true;
	squareContainer.classList.add("gridLines");
}

function turnGridlinesOff() {
	gridlines = false;
	squareContainer.classList.remove("gridLines");
}

//ON PAGE LOAD
fillContainer(defaultGridSize);
turnGridlinesOn();
