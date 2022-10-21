const defaultGridSize = 16;

//GRID SIZE
const squareContainer = document.querySelector(".squareContainer");

//NEW SIZE SLIDER
const sizeValue = document.getElementById("sizeValue");

const sizeSlider = document.getElementById("sizeSlider");

//UPDATE SLIDER ON PAGE
sizeSlider.onmousemove = (e) => updateSlider(e.target.value);

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

color.addEventListener("click", () => {
	console.log("you clicked the color button");
	turnEraserOff();
	turnRainbowOff();
});
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

		//BACKGROUND COLOR
		const paintbucket = document.querySelector(".paintbucket");
		paintbucket.addEventListener("click", () => {
			square.style.backgroundColor = color.value;
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
//NEW GRID SIZE SLIDER
let clearGridSize;
sizeSlider.onchange = (e) => (
	(clearGridSize = e.target.value), updateGridSize(clearGridSize)
);

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

function updateSlider(value) {
	sizeValue.innerHTML = `${value} x ${value}`;
}

//DRAWING EVENT LISTENERS
window.addEventListener("mousedown", () => (draw = true));
window.addEventListener("mouseup", () => (draw = false));

//CLEAR GRID BUTTON
const clearGridButton = document.querySelector(".clearGrid");

clearGridButton.addEventListener("click", () => {
	if (window.confirm("Are you sure you want to clear the grid?")) {
		updateGridSize(clearGridSize);
	} else {
		return;
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
fillContainer(defaultGridSize);
turnGridlinesOn();
