import { easy, medium, hard } from '../difficulty-options'

export class GameSetup {
	constructor(difficulty, fields, fieldClicked, mineClicked) {
		this.difficulty = difficulty
		this.fields = fields
		this.numberOfFields = this.fields.length
		this.fieldClicked = fieldClicked
		this.mineClicked = mineClicked
		this.numberOfFlags = this.difficulty.mines
		this.numberOfMines = this.difficulty.mines
	}
	isFirstClick() {
		return this.fieldClicked === null
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

		return this.fields
	}
	mineAnimationGenerator() {
		class MineColor {
			constructor(mineColor, bgColorStart, bgColorEnd) {
				this.mineColor = mineColor
				this.bgColorStart = bgColorStart
				this.bgColorEnd = bgColorEnd
			}
		}
		const blueMine = new MineColor('#175FC7', '#86B2F1', '#5894EC')
		const lightBlueMine = new MineColor('#018686', '#EDFFFF', '#88FEFE')
		const pinkMine = new MineColor('#A2396D', '#F6E4ED', '#DB99BA')
		const greenMine = new MineColor('#056717', '#0AC82D', '#079822')
		const purpleMine = new MineColor('#321F96', '#A496EA', '#5A42D8')
		const yellowMine = new MineColor('#999900', '#FFFF66', '#FFFF00')
		const redMine = new MineColor('#6C0E14', '#EA5C64', '#C61A24')
		const mineColors = [blueMine, lightBlueMine, pinkMine, greenMine, purpleMine, yellowMine, redMine]
		//! number of confetti
		//! starting location of each confetti
		//! swining animation of each confetti
		//! colors for confetti, mine and background (before and after)
		const randomColor = mineColors[Math.floor(Math.random() * mineColors.length)]
		return { color: randomColor }
	}
	disableAllFields() {
		return this.fields.map((field) => {
			return { ...field, isDisabled: true }
		})
	}
	getAllSurroundingIndexsToExpose(indexWithValueZero, boardWidth) {
		const surroundingIndexsThatAreZero = []
		const surroundingIndexsThatAreZeroThatAreChecked = []
		let allSurroundingIndexsToExpose = []

		const valuesArray = this.fields.map((field) => field.value)
		console.log(valuesArray)

		const getImmediateSurroundingIndexs = (zeroValueIndex) => {
			const surroundingIndexs = getFieldsSurroundingIndexWithNoMines(zeroValueIndex, valuesArray, boardWidth)
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
	exposeFields(fieldIndexsToExpose) {
		fieldIndexsToExpose.forEach((index) => {
			this.fields[index].isExposed = true
		})

		return this.fields
	}
}

export class Field {
	constructor(index, bgIsLight, value) {
		this.index = index
		this.value = value
		this.isExposed = false
		this.hasFlag = false
		this.bgIsLight = bgIsLight
		this.isDisabled = false
	}
	isMine() {
		return this.value === 'mine' ? true : false
	}

	generateFieldColors() {
		let bgColor, bgHoverColor, bgColorAnimatedField, valueColor
		//* bgColor, bgHoverColor, bgColorAnimatedField
		if (this.bgIsLight) {
			bgColorAnimatedField = 'field.green_light'
			if (this.isExposed) {
				bgColor = 'field.brown_light'
				//* don't want to add a hover effect if the field is Zero
				if (this.value) {
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

//! in Class
export const generateRandomFieldValueArray = (numOfMines, numOfFields, startingIndex, width) => {
	const arr = Array.apply(null, Array(numOfFields))
	//* starting index and srounding fields can't have mines
	//* creating an array of indexs that can't have mines (ones surrounding startingIndex)
	const mineFreeIndexs = []

	const topLeftIndex = startingIndex - width - 1
	const bottomLeftIndex = startingIndex + width - 1

	for (let i = topLeftIndex; i <= bottomLeftIndex; i = i + width) {
		for (let j = i; j < i + 3; j++) {
			mineFreeIndexs.push(j)
		}
	}

	let mineCount = numOfMines
	//* populate array with random mines
	while (mineCount > 0) {
		const randomIndex = Math.floor(Math.random() * numOfFields)
		if (!mineFreeIndexs.includes(randomIndex)) {
			if (!arr[randomIndex]) {
				arr[randomIndex] = 'mine'
				mineCount--
			}
		}
	}

	return generateArrayWithValues(arr, width)
}
//! in Class
export const generateArrayWithValues = (mineArray, width) => {
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

	return arr
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

export const getFieldsSurroundingIndexWithNoMines = (i, valuesArray, width) => {
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

export const getFieldsSurroundingExludingIndex = (i, numberOfFields, width) => {
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
			if (k >= 0 && k < numberOfFields) {
				arrayOfIndexes.push(k)
			}
		}
	}
	return arrayOfIndexes
}

export const getAllSurroundingIndexsToExpose = (indexWithValueZero, valuesArray, boardWidth) => {
	const surroundingIndexsThatAreZero = []
	const surroundingIndexsThatAreZeroThatAreChecked = []
	let allSurroundingIndexsToExpose = []

	const getImmediateSurroundingIndexs = (zeroValueIndex) => {
		const surroundingIndexs = getFieldsSurroundingIndexWithNoMines(zeroValueIndex, valuesArray, boardWidth)
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

export const removeItemOnce = (arr, value) => {
	const index = arr.indexOf(value)
	if (index > -1) {
		arr.splice(index, 1)
	}
	return arr
}

export const randomShakeArray = () => {
	const arr = []
	const arrLength = 35

	for (let i = 0; i < arrLength; i++) {
		//* keeps first and last items in the array are 0
		if (i === 0 || i === arrLength - 1) {
			arr.push(0)
		} else {
			arr.push(getRandomInt(-1, 1))
		}
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

export const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min
}
//! in Class
export const mineAnimationGenerator = () => {
	class MineColor {
		constructor(mineColor, bgColorStart, bgColorEnd) {
			this.mineColor = mineColor
			this.bgColorStart = bgColorStart
			this.bgColorEnd = bgColorEnd
		}
	}

	const blueMine = new MineColor('#175FC7', '#86B2F1', '#5894EC')
	const lightBlueMine = new MineColor('#018686', '#EDFFFF', '#88FEFE')
	const pinkMine = new MineColor('#A2396D', '#F6E4ED', '#DB99BA')
	const greenMine = new MineColor('#056717', '#0AC82D', '#079822')
	const purpleMine = new MineColor('#321F96', '#A496EA', '#5A42D8')
	const yellowMine = new MineColor('#999900', '#FFFF66', '#FFFF00')
	const redMine = new MineColor('#6C0E14', '#EA5C64', '#C61A24')
	const mineColors = [blueMine, lightBlueMine, pinkMine, greenMine, purpleMine, yellowMine, redMine]
	//! number of confetti
	//! starting location of each confetti
	//! swining animation of each confetti
	//! colors for confetti, mine and background (before and after)
	const randomColor = mineColors[Math.floor(Math.random() * mineColors.length)]
	return { color: randomColor }
}
