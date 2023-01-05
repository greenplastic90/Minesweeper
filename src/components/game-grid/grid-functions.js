import { v4 as uuidv4 } from 'uuid'
import { easy, medium, hard } from '../difficulty-options'
import Color from 'color'

export class GameSetup {
	constructor(difficulty, fields, fieldClickedIndex, fieldClickedValue, mineClickedIndex, timer) {
		this.difficulty = difficulty
		this.fields = fields
		this.numberOfFields = this.fields.length
		this.fieldClickedIndex = fieldClickedIndex
		this.fieldClickedValue = fieldClickedValue
		this.mineClickedIndex = mineClickedIndex
		this.numberOfMines = this.difficulty.mines
		this.explodeMineTimer = 0
		this.numberOfFlags = this.fields.reduce((acc, field) => {
			return field.hasFlag ? acc - 1 : acc
		}, this.numberOfMines)

		this.timer = timer //? can be 'reset' 'active' or 'pause'
	}

	activateTimer() {
		this.timer = 'active'
	}
	pauseTimer() {
		this.timer = 'pause'
	}
	resetTimer() {
		this.timer = 'reset'
	}

	isGameWon() {
		if (this.firstClickIndex !== null) {
			const won = this.fields.filter((field) => field.value !== 'mine').every((field) => field.isExposed)
			if (won) this.disableAllFields()
			return won
		}
	}

	isFirstClick() {
		return this.fieldClickedIndex === null
	}

	fieldClicked(index) {
		this.fieldClickedIndex = index
		this.fieldClickedValue = this.fields[index].value

		if (this.fields[index].value === 'mine') {
			this.mineClicked(index)
		}
	}

	mineClicked(index) {
		this.mineClickedIndex = index
		this.exposeMines(index)
		this.disableAllFields()
	}
	generateMinesArray(index) {
		const minesArray = []
		minesArray.push(this.fields[index])

		let indexesOfMinesToExpose = this.fields.filter((field) => field.value === 'mine' && !field.hasFlag).map((field) => field.index)
		//* -1 cause we aready pushed the first index into minesArray
		let numOfMinesToExpose = indexesOfMinesToExpose.length - 1
		let indexToFindMinesAround = index
		while (numOfMinesToExpose > 0) {
			const mineIndex = this.findIndexOfClosestMine(indexToFindMinesAround, minesArray)
			minesArray.push(this.fields[mineIndex])
			indexToFindMinesAround = mineIndex
			numOfMinesToExpose = numOfMinesToExpose - 1
		}

		return minesArray
	}
	findIndexOfClosestMine(index, minesArray) {
		let foundMine = false
		let distance = 1 //* increment by 1
		let width = this.difficulty.horizontal_boxes * distance
		let loops = 3 //* increment by 2
		while (!foundMine) {
			let topStart = index - width - distance
			let bottomStart = index + width - distance

			for (let j = topStart; j <= bottomStart; j = j + width) {
				for (let k = j; k < j + loops; k++) {
					const checkField = this.fields[k]
					//? if found push into array and end for loops
					if (checkField && checkField.value === 'mine' && !checkField.hasFlag && !minesArray.map((mine) => mine.index).includes(checkField.index)) {
						foundMine = true

						return checkField.index
					}
				}
				if (foundMine) break
			}
			if (foundMine) break

			distance = distance + 1
			loops = loops + 2
		}
	}

	exposeMines(index) {
		const minesToExpose = this.generateMinesArray(index)
		const flagsNotCoveringMines = []

		this.fields.forEach((field) => {
			//* create an array of Flags that are not covering mines
			if (field.hasFlag && !field.isMine()) flagsNotCoveringMines.push(field)
		})

		minesToExpose.forEach((mine) => {
			mine.explodeMine(this.explodeMineTimer)

			this.explodeMineTimer = this.explodeMineTimer + this.generateTimeToExposeNextIndexBasedOnLengthOfMinesToExpose()
		})

		flagsNotCoveringMines.forEach((field) => field.exposeFalseFlag(this.explodeMineTimer))
	}
	generateTimeToExposeNextIndexBasedOnLengthOfMinesToExpose() {
		const chanceToBurst = getRandomNum(0, 3)

		if (chanceToBurst < 1) {
			return getRandomNum(0.1, 0.2)
		}
		return getRandomNum(0.3, 0.6)
	}

	generateRandomFieldValueArray(firstClickIndex) {
		const arr = Array.apply(null, Array(this.numberOfFields))
		//* starting index and srounding fields can't have mines
		//* creating an array of indexs that can't have mines (ones surrounding startingIndex)
		const mineFreeIndexs = []

		const topLeftIndex = firstClickIndex - this.difficulty.horizontal_boxes - 1
		const bottomLeftIndex = firstClickIndex + this.difficulty.horizontal_boxes - 1

		for (let i = topLeftIndex; i <= bottomLeftIndex; i = i + this.difficulty.horizontal_boxes) {
			for (let j = i; j < i + 3; j++) {
				mineFreeIndexs.push(j)
			}
		}

		let mineCount = this.numberOfMines
		//* populate array with random mines
		while (mineCount > 0) {
			const randomIndex = Math.floor(Math.random() * this.numberOfFields)
			if (!mineFreeIndexs.includes(randomIndex)) {
				if (!arr[randomIndex]) {
					arr[randomIndex] = 'mine'
					mineCount--
				}
			}
		}

		return this.generateArrayWithValues(arr, this.difficulty.horizontal_boxes)
	}

	generateArrayWithValues(mineArray, width) {
		const arr = mineArray

		arr.forEach((item, i) => {
			if (!(item === 'mine')) {
				let topLeftIndex = i - width - 1
				let bottomLeftIndex = i + width - 1
				let numOfLoops = 3
				//* if indext on the far left side of grid
				if (!(i % width)) {
					topLeftIndex = i - width
					bottomLeftIndex = i + width
					numOfLoops = 2
				}
				//* if index on the far right side of grid
				if (i % width === width - 1) {
					numOfLoops = 2
				}

				let count = 0
				for (let j = topLeftIndex; j <= bottomLeftIndex; j = j + width) {
					for (let k = j; k < j + numOfLoops; k++) {
						if (arr[k] === 'mine') count++
					}
				}
				arr[i] = count
			}
		})

		//* insert value to each field
		this.fields.forEach((field, i) => {
			field.value = arr[i]
		})
	}

	disableAllFields() {
		return this.fields.forEach((field) => {
			field.isDisabled = true
		})
	}

	getAllSurroundingIndexsToExpose(indexWithValueZero, boardWidth) {
		const surroundingIndexsThatAreZero = []
		const surroundingIndexsThatAreZeroThatAreChecked = []
		let allSurroundingIndexsToExpose = []

		const valuesArray = this.fields.map((field) => field.value)

		const getImmediateSurroundingIndexs = (zeroValueIndex) => {
			const surroundingIndexs = this.getFieldsSurroundingIndexWithNoMines(zeroValueIndex, valuesArray, boardWidth)
			allSurroundingIndexsToExpose = [...new Set([...allSurroundingIndexsToExpose, ...surroundingIndexs])]
			surroundingIndexs.forEach((index) => {
				if (valuesArray[index] === 0 && !surroundingIndexsThatAreZero.includes(index)) {
					surroundingIndexsThatAreZero.push(index)
				}
				surroundingIndexsThatAreZeroThatAreChecked.push(zeroValueIndex)
			})
			surroundingIndexsThatAreZero.forEach((index) => {
				if (!surroundingIndexsThatAreZeroThatAreChecked.includes(index)) getImmediateSurroundingIndexs(index)
			})
		}
		getImmediateSurroundingIndexs(indexWithValueZero)

		return allSurroundingIndexsToExpose
	}
	getFieldsSurroundingIndexWithNoMines(i, valuesArray, width) {
		let topLeftIndex = i - width - 1
		let bottomLeftIndex = i + width - 1
		let numOfLoops = 3
		//* if indext on the far left side of grid
		if (!(i % width)) {
			topLeftIndex = i - width
			bottomLeftIndex = i + width
			numOfLoops = 2
		}
		//* if index on the far right side of grid
		if (i % width === width - 1) {
			numOfLoops = 2
		}
		const arrayOfIndexes = []

		for (let j = topLeftIndex; j <= bottomLeftIndex; j = j + width) {
			for (let k = j; k < j + numOfLoops; k++) {
				if ((valuesArray[k] || valuesArray[k] === 0) && valuesArray[k] !== 'mine') arrayOfIndexes.push(k)
			}
		}
		return arrayOfIndexes
	}

	exposeFields(fieldIndexsToExpose) {
		fieldIndexsToExpose.forEach((index) => {
			this.fields[index].isExposed = true
			this.fields[index].hasFlag = false
			this.fields[index].isDisabled = true
		})
	}
	randomShakeArray() {
		const arr = []
		const arrLength = 35

		for (let i = 0; i < arrLength; i++) {
			//* keeps first and last items in the array are 0
			if (i === 0 || i === arrLength - 1) {
				arr.push(0)
			} else {
				arr.push(getRandomNum(-1, 1))
			}
		}
		return arr
	}
}

export class Field {
	constructor(id, index, bgIsLight, value) {
		this.id = id
		this.index = index
		this.value = value
		this.isExposed = false
		this.hasFlag = false
		this.falseFlag = false
		this.bgIsLight = bgIsLight
		//* isDisabled changes when toggleFlag() or exposeFields() are called
		this.isDisabled = false
		this.exposeMineTimer = null
		this.runMineAnimation = false
		this.mineColor = null
		this.falseFlag = false
	}

	toggleFlag() {
		this.hasFlag = !this.hasFlag
	}
	exposeFalseFlag(timer) {
		this.exposeMineTimer = timer
		this.falseFlag = true
	}
	explodeMine(timer) {
		this.exposeMineTimer = timer
		this.runMineAnimation = true

		this.mineColorGenerator()
	}
	mineColorGenerator() {
		class MineColor {
			//? takes a Color class with a color passed in it to run these methods on it
			constructor(colorObj) {
				this.mineColor = colorObj.darken(0.5).desaturate(0.5).hex()
				this.bgColorStart = colorObj.lighten(0.9).hex()
				this.bgColorEnd = colorObj.hex()
			}
		}
		// const blueMine = new MineColor(Color('hsl(215.5,79.3%,63.5%)'))
		// const lightBlueMine = new MineColor(Color('hsl(195, 79%, 69%)'))
		// const pinkMine = new MineColor(Color('hsl(349.5,100%,80.6%)'))
		// const greenMine = new MineColor(Color('hsl(120,46.5%,43.7%)'))
		// const purpleMine = new MineColor(Color('hsl(282.2,100%,48.4%)'))
		// const yellowMine = new MineColor(Color('hsl(60,100%,60%)'))
		// const redMine = new MineColor(Color('hsl(356.5,76.8%,53.9%)'))

		const blueMine = new MineColor(Color('hsl(186.5,79.3%,22.7%)'))
		const purpleMine = new MineColor(Color('hsl(265.6,34.1%,35.1%)'))
		const pinkMine = new MineColor(Color('hsl(338,57.1%,37.5%)'))
		const orangeDarkMine = new MineColor(Color('hsl(12.7,65.9%,44.9%)'))
		const brownMine = new MineColor(Color('hsl(11.7,63.6%,23.7%)'))
		const grayMine = new MineColor(Color('hsl(210,11.1%,21.2%)'))

		const mineColors = [orangeDarkMine, blueMine, purpleMine, pinkMine, brownMine, grayMine]

		const randomColor = mineColors[Math.floor(Math.random() * mineColors.length)]
		this.mineColor = randomColor
	}

	getFieldsSurroundingExludingIndex(numberOfFields, width) {
		let topLeftIndex = this.index - width - 1
		let bottomLeftIndex = this.index + width - 1
		let numOfLoops = 3
		//* if indext on the far left side of grid
		if (!(this.index % width)) {
			topLeftIndex = this.index - width
			bottomLeftIndex = this.index + width
			numOfLoops = 2
		}
		//* if index on the far right side of grid
		if (this.index % width === width - 1) {
			numOfLoops = 2
		}
		const arrayOfIndexes = []

		for (let j = topLeftIndex; j <= bottomLeftIndex; j = j + width) {
			for (let k = j; k < j + numOfLoops; k++) {
				if (k >= 0 && k < numberOfFields) {
					arrayOfIndexes.push(k)
				}
			}
		}
		return arrayOfIndexes
	}
	createBorders(borders, numberOfFields, width, fields) {
		if (this.isExposed && this.value !== 'mine') {
			const surroundingIndexs = this.getFieldsSurroundingExludingIndex(numberOfFields, width)
			const exposedArray = fields.map((field) => field.isExposed)
			const valuesArray = fields.map((field) => field.value)
			let newBorders = { ...borders }

			surroundingIndexs.forEach((fieldIndex) => {
				//* if the field adjacent is not exposed OR it is exposed and the value is mine
				if (!exposedArray[fieldIndex] || (exposedArray[fieldIndex] && valuesArray[fieldIndex] === 'mine')) {
					if (fieldIndex + width === this.index) newBorders = { ...newBorders, top: true }

					if (fieldIndex - width === this.index) newBorders = { ...newBorders, bottom: true }
					if (fieldIndex + 1 === this.index) newBorders = { ...newBorders, left: true }
					if (fieldIndex - 1 === this.index) newBorders = { ...newBorders, right: true }
					//* if the field adjacent is exposed
				} else if (exposedArray[fieldIndex]) {
					if (fieldIndex + width === this.index) newBorders = { ...newBorders, top: false }
					if (fieldIndex - width === this.index) newBorders = { ...newBorders, bottom: false }
					if (fieldIndex + 1 === this.index) newBorders = { ...newBorders, left: false }
					if (fieldIndex - 1 === this.index) newBorders = { ...newBorders, right: false }
				}
			})

			return newBorders
		}
	}
	isMine() {
		return this.value === 'mine'
	}

	generateFieldColors() {
		let bgColor, bgHoverColor, bgColorAnimatedField, valueColor
		//* bgColor, bgHoverColor, bgColorAnimatedField
		if (this.bgIsLight) {
			bgColorAnimatedField = 'field.green_light'
			if (this.isExposed) {
				bgColor = 'field.brown_light'
				//* don't want to add a hover effect if the field is Zero

				if (this.value !== 0) {
					bgHoverColor = 'field.brown_hover_light'
				} else {
					bgHoverColor = ''
				}
			} else {
				bgColor = 'field.green_light'
				bgHoverColor = 'field.green_hover_light'
			}
		} else {
			bgColorAnimatedField = 'field.green_dark'
			if (this.isExposed) {
				bgColor = 'field.brown_dark'
				//* don't want to add a hover effect if the field is Zero
				if (this.value) {
					bgHoverColor = 'field.brown_hover_dark'
				} else {
					bgHoverColor = ''
				}
			} else {
				bgColor = 'field.green_dark'
				bgHoverColor = 'field.green_hover_dark'
			}
		}
		//* valueColor
		if (this.value === 1) valueColor = 'numbers.one'
		if (this.value === 2) valueColor = 'numbers.two'
		if (this.value === 3) valueColor = 'numbers.three'
		if (this.value === 4) valueColor = 'numbers.four'
		if (this.value === 5) valueColor = 'numbers.five'
		if (this.value === 6) valueColor = 'numbers.six'
		if (this.value === 7) valueColor = 'numbers.seven'
		if (this.value === 8) valueColor = 'numbers.eight'

		return { bgColor: bgColor, bgHoverColor: bgHoverColor, bgColorAnimatedField: bgColorAnimatedField, valueColor: valueColor }
	}
}

export class ConfettiSetup {
	constructor(color) {
		this.id = uuidv4()
		this.color = color
		this.numberOfSwings = 0
		this.position = {}
		this.animation = { scale: [0.75, 1, 0.75, 0, 0], transition: {} }
	}

	generateRandomConfetti() {
		this.position.top = getRandomNum(0, 100)
		this.position.bottom = 75 - this.position.top
		this.position.left = getRandomNum(0, 100)
		this.position.right = 60 - this.position.left
		this.color = Color(this.color).lighten(getRandomNum(0.4, 0.9)).hex()
		this.generateAnimation()
	}

	generateAnimation() {
		this.numberOfSwings = getRandomNum(3, 6)
		this.animation.scale[2] = getRandomNum(0.5, 0, 75)
		this.animation.scale[3] = this.animation.scale[2] < 0.625 ? 0 : 0.5
		this.animation.transition.duration = getRandomNum(6, 7)
		this.movement()
	}

	movement() {
		//* if the cofetti is on the left side of the field lauch towards the left and vice versa
		let swingLeft = this.position.left < 50

		this.animation.rotate = swingLeft ? [getRandomNum(-5, -20)] : [getRandomNum(5, 20)]
		//* below generates an array that looks like this [-10, -10, 10, -10, 10]

		for (let i = 0; i < this.numberOfSwings; i++) {
			const firstIndex = this.animation.rotate[0]
			if (i === 0) {
				this.animation.rotate.push(firstIndex)
			} else if (!(i % 2)) {
				this.animation.rotate.push(firstIndex)
			} else {
				this.animation.rotate.push(firstIndex * -1)
			}
		}

		//* left right swing
		this.animation.x = [0]
		let initialSwing
		for (let i = 0; i <= this.numberOfSwings; i++) {
			if (i === 0) {
				initialSwing = swingLeft ? getRandomNum(-10, -50) : getRandomNum(10, 50)
				this.animation.x.push(initialSwing)
			} else {
				const swing = swingLeft ? getRandomNum(initialSwing - 20, initialSwing - 40) : getRandomNum(initialSwing + 20, initialSwing + 40)
				this.animation.x.push(swing)
			}
			swingLeft = !swingLeft
		}

		//* up down movement
		//* if confetti is on the top half of the field, it should shoot out a bit higher than ones at the bottom half
		const topHalf = this.position.top < 50
		this.animation.y = [0]

		for (let i = 0; i < this.numberOfSwings; i++) {
			if (i === 0) {
				const initialHeight = topHalf ? getRandomNum(-80, -10) : getRandomNum(-20, -80)
				this.animation.y.push(initialHeight)
			} else {
				//* start the decent
				const decentHeight = this.animation.y[i] + getRandomNum(20, 50)
				this.animation.y.push(decentHeight)
			}
		}
	}
}

export const localStorageDifficulty = () => {
	const diff = localStorage.getItem('mineSweeperDiffuculty')
	if (diff) {
		if (diff === 'easy') return easy
		if (diff === 'medium') return medium
		if (diff === 'hard') return hard
	} else {
		return easy
	}
}

export const removeItemOnce = (arr, value) => {
	const index = arr.indexOf(value)
	if (index > -1) {
		arr.splice(index, 1)
	}
	return arr
}

export const setBgColorShade = (index, width, isBgLight) => {
	//* if statment to create a checkered parttern
	if (index % width) {
		isBgLight = !isBgLight
	}
	return isBgLight
}

export const getRandomNum = (min, max) => {
	return Math.random() * (max - min) + min
}
