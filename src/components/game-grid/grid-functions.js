import { easy, medium, hard } from '../difficulty-options'

export const generateRandomFieldValueArray = (numOfMines, numOfFields, startingIndex, width) => {
	const arr = Array.apply(null, Array(numOfFields))
	//* starting index and srounding fields can't have mines
	//* creating an array of indexs that can't have mines
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
		const randomIndex = Math.floor(Math.random() * numOfFields + 1)
		if (!mineFreeIndexs.includes(randomIndex)) {
			if (!arr[randomIndex]) {
				arr[randomIndex] = 'mine'
				mineCount--
			}
		}
	}
	return generateArrayWithValues(arr, width)
}

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

export const getFieldsAroundIndex = (i, valuesArray, width) => {
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
	const arrayOfIndexesToExpose = []

	for (let j = topLeftIndex; j <= bottomLeftIndex; j = j + width) {
		for (let k = j; k < j + numOfLoops; k++) {
			if ((valuesArray[k] || valuesArray[k] === 0) && valuesArray[k] !== 'mine')
				arrayOfIndexesToExpose.push(k)
		}
	}
	return arrayOfIndexesToExpose
}
