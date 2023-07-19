const container = document.querySelector('.squares-container')
const settings = document.querySelector('.settings')
const gridSizeInput = document.querySelector('#grid-size')
const colorInput = document.querySelector('#color-input')
const singleColorBtn = document.querySelector('#single-color')
const rainbowColorBtn = document.querySelector('#rainbow-color')
const eraserBtn = document.querySelector('#eraser')
const clearBtn = document.querySelector('#clear')
const settingsBtns = document.querySelectorAll('.btn')

let isMousePressed = false
gridSizeInput.value = 16

const setColor = () => {
	const singleColor = colorInput.value
	return singleColor
}

const rand = (min, max) => {
	return Math.round(Math.random() * (max - min + 1)) + min
}

const setRainbowColor = () => `rgb(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)})`

const colorSquares = e => {
	if (isMousePressed && container.contains(e.target) && singleColorBtn.classList.contains('btn-active')) {
		const singleColor = setColor()
		e.target.style.backgroundColor = singleColor
	} else if (isMousePressed && container.contains(e.target) && rainbowColorBtn.classList.contains('btn-active')) {
		e.target.style.backgroundColor = setRainbowColor()
	}
}

const eraseSquares = e => {
	if (isMousePressed && container.contains(e.target) && eraserBtn.classList.contains('btn-active')) {
		e.target.style.backgroundColor = ''
	}
}

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

const setActiveButton = clickedButton => {
	settingsBtns.forEach(btn => {
		btn.classList.remove('btn-active')
	})
	clickedButton.classList.add('btn-active')
}

const clearGrid = button => {
	const squares = document.querySelectorAll('.square')
	squares.forEach(square => {
		square.style.backgroundColor = ''
	})
	setActiveButton(button)
}

setGridSize()
container.addEventListener('mouseup', () => (isMousePressed = false))
container.addEventListener('mouseleave', () => (isMousePressed = false))

container.addEventListener('mousedown', e => {
	isMousePressed = true
	colorSquares(e)
	eraseSquares(e)
})

container.addEventListener('mousemove', e => {
	colorSquares(e)
	eraseSquares(e)
})

gridSizeInput.addEventListener('change', setGridSize)
colorInput.addEventListener('change', setColor)

settings.addEventListener('click', e => {
	const clickedButton = e.target
	if (clickedButton.classList.contains('btn') && clickedButton.id !== 'clear') {
		setActiveButton(clickedButton)
	}
})

clearBtn.addEventListener('click', () => clearGrid(singleColorBtn))
