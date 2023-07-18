const container = document.querySelector('.squares-container')
const gridSizeInput = document.querySelector('#grid-size')
let isPressed = false
gridSizeInput.value = 5

const colorSquares = (e) => {
	if (isPressed && container.contains(e.target)) {
		e.target.style.backgroundColor = 'red'
	}
}

const setGridSize = () => {
	container.innerHTML = ''
	let gridSize = gridSizeInput.value
    if (gridSize < 2 || gridSize > 10) {
        gridSize = 5
    } 
	for (let i = 0; i < gridSize * gridSize; i++) {
		const square = document.createElement('div')
		square.classList.add('square')
		container.appendChild(square)
	}
	container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
	container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`
}

setGridSize()
container.addEventListener('mousedown', () => (isPressed = true))
container.addEventListener('mouseup', () => (isPressed = false))
container.addEventListener('mouseleave', () => (isPressed = false))
container.addEventListener('mousemove', colorSquares)
container.addEventListener('mousedown', colorSquares)
gridSizeInput.addEventListener('change', setGridSize)
