//GRID SIZE
const squareContainer = document.querySelector(".squareContainer");
const sizeElement = document.querySelector(".size");
let size = sizeElement.value;

//GRID COLOR STUFF
const color = document.querySelector(".Color");
const clearGridButton = document.querySelector(".clearGrid");

//ERASER STUFF
const eraserButton = document.querySelector(".eraser");
let eraser = false;

eraserButton.addEventListener("click", () => {
	if (eraser === false) {
		eraser = true;
		document.querySelector(".eraser").style.backgroundColor =
			"rgb(27, 206, 45)";
	} else if (eraser === true) {
		eraser = false;
		document.querySelector(".eraser").style.backgroundColor = "";
	}
});

//COLOR GRABBER
// let grab = false;
// const colorGrabber = document.querySelector(".grabber");
// colorGrabber.addEventListener("input", (e) => {
// 	color.value = e.target.value;
// });

//ACTIONS
let draw = false;

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
			} else {
				square.style.backgroundColor = color.value;
			}
		});
		//SO YOU CAN CLICK TO COLOR AND TO FILL THE CLICKED BOX WITH COLOR WHEN YOU CLICK > DRAG
		square.addEventListener("mousedown", () => {
			if (eraser) {
				square.style.backgroundColor = "";
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
	squareContainer.innerHTML = "";
	fillContainer(size);
	eraser = false;
	document.querySelector(".eraser").style.backgroundColor = "";
}

//ADJUST SIZE OF GRID

sizeElement.addEventListener("keyup", () => {
	if (sizeElement.value <= 64) {
		size = sizeElement.value;
		clearGrid();
	} else {
		alert("Please enter a number between 1 and 64.");
	}
});

fillContainer(size);
