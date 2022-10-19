//GRID SIZE
const squareContainer = document.querySelector(".squareContainer");
const sizeElement = document.querySelector(".size");
let size = sizeElement.value;

//GRID COLOR STUFF
const color = document.querySelector(".Color");
const clearGrid = document.querySelector(".clearGrid");

//ACTIONS
let draw = false;

//POPULATE THE GRID
function fillcontainer(size) {
	squareContainer.style.setProperty("--size", size);
	for (let i = 0; i < size * size; i++) {
		const square = document.createElement("div");
		square.classList.add("square");

		//SO YOU CAN DRAG THE MOUSE OVER TO DRAW
		square.addEventListener("mouseover", () => {
			if (!draw) {
				return;
			}
			square.style.backgroundColor = color.value;
		});
		//SO YOU CAN CLICK TO COLOR AND TO FILL THE CLICKED BOX WITH COLOR WHEN YOU CLICK > DRAG
		square.addEventListener("mousedown", () => {
			square.style.backgroundColor = color.value;
		});
		squareContainer.appendChild(square);
	}
}

//DRAWING EVENT LISTENERS
window.addEventListener("mousedown", () => (draw = true));
window.addEventListener("mouse", () => (draw = false));
window.addEventListener("mouseup", () => (draw = false));

//CLEAR GRID BUTTON
clearGrid.addEventListener("click", () => {
	squareContainer.innerHTML = "";
	fillcontainer(size);
});

fillcontainer(size);
