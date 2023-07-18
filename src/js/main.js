const container = document.querySelector('.squares-container')
const gridSizeInput = document.querySelector('#grid-size')
const colorInput = document.querySelector('#color-input')
const singleColorBtn = document.querySelector('#single-color') 
const rainbowColorBtn = document.querySelector('#rainbow-color')
const eraserBtn = document.querySelector('#eraser')
const clearBtn = document.querySelector('#clear')

let isMousePressed = false
let isEraserOn = false
gridSizeInput.value = 16

const setColor = () => {
	const singleColor = colorInput.value
	return singleColor
}

const colorSquares = (e) => {
	if (isMousePressed && container.contains(e.target)) {
		const singleColor = setColor()
		e.target.style.backgroundColor = singleColor
	}
}

// const eraseSquares = (e) => {
// 	if (isMousePressed && container.contains(e.targer) && isEraserOn) {
// 		e.target.style.backgroundColor = ''
// 	}
// }

const setGridSize = () => {
	container.innerHTML = ''
	let gridSize = gridSizeInput.value
    if (gridSize < 2 || gridSize > 100) {
        gridSize = 16
    } 
	for (let i = 0; i < gridSize * gridSize; i++) {
		const square = document.createElement('div')
		square.classList.add('square')
		container.appendChild(square)
	}
	container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
	container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`
}

const clear = () => {
	Array.from(container.children).forEach(child => {
		child.style.backgroundColor = ''
	})
}

const setSingleColor = () => {
	
}

setGridSize()
container.addEventListener('mousedown', () => (isMousePressed = true))
container.addEventListener('mouseup', () => (isMousePressed = false))
container.addEventListener('mouseleave', () => (isMousePressed = false))
container.addEventListener('mousemove', colorSquares)
container.addEventListener('mousedown', colorSquares)
gridSizeInput.addEventListener('change', setGridSize)
colorInput.addEventListener('change', setColor)
clearBtn.addEventListener('click', clear)