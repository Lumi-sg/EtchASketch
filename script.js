//GRID SIZE
const container = document.querySelector(".squareContainer");
const sizeElement = document.querySelector(".size");
let size = sizeElement.value;

//GRID COLOR
const color = document.querySelector(".Color");

//ACTIONS
let draw = false;

function fillcontainer(size) {
	container.style.setProperty("--size", size);
	for (let i = 0; i < size * size; i++) {
		const square = document.createElement("div");
		square.classList.add("square");

		square.addEventListener("mouseover", function () {
			if (!draw) {
				return;
			}
			square.style.backgroundColor = color.value;
		});
		square.addEventListener("mousedown", function () {
			square.style.backgroundColor = color.value;
		});
		container.appendChild(square);
	}
}

window.addEventListener("mousedown", () => (draw = true));
window.addEventListener("mouse", () => (draw = false));

window.addEventListener("mouseup", () => (draw = false));

fillcontainer(size);
