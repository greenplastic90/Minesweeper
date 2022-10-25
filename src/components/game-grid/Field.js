import { Box, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getFieldsAroundIndex } from './grid-functions'

const Field = ({
	index,
	fieldWidth,
	mineWidth,
	bgIsLight,
	value,
	firstClick,
	setFirstClick,
	setClickIndex,
	exposedArray,
	setExposedArray,
	isExposed,
	boardWidth,
	valuesArray,
}) => {
	const [bgColor, setBgColor] = useState()
	// const [isExposed, setIsExposed] = useState(false)

	//* set bgColor
	useEffect(() => {
		if (bgIsLight) {
			if (isExposed) {
				setBgColor('field.brown_light')
			} else {
				setBgColor('field.green_light')
			}
		} else {
			if (isExposed) {
				setBgColor('field.brown_dark')
			} else {
				setBgColor('field.green_dark')
			}
		}
	}, [bgIsLight, isExposed])

	const getAllSurroundingIndexs = (indexWithValueZero) => {
		const surroundingIndexsThatAreZero = []
		const surroundingIndexsThatAreZeroThatAreChecked = []
		let allSurroundingIndexsToExpose = []

		const getImmediateSurroundingIndexs = (zeroValueIndex) => {
			const surroundingIndexs = getFieldsAroundIndex(zeroValueIndex, valuesArray, boardWidth)
			allSurroundingIndexsToExpose = [
				...new Set([...allSurroundingIndexsToExpose, ...surroundingIndexs]),
			]
			surroundingIndexs.forEach((index) => {
				if (valuesArray[index] === 0 && !surroundingIndexsThatAreZero.includes(index)) {
					surroundingIndexsThatAreZero.push(index)
				}
				surroundingIndexsThatAreZeroThatAreChecked.push(zeroValueIndex)
			})
			surroundingIndexsThatAreZero.forEach((index) => {
				if (!surroundingIndexsThatAreZeroThatAreChecked.includes(index))
					getImmediateSurroundingIndexs(index)
			})
		}
		getImmediateSurroundingIndexs(indexWithValueZero)

		return allSurroundingIndexsToExpose
	}

	const OnFieldLeftClick = () => {
		//* only happens first click to set the values of the fields
		if (!firstClick) {
			setFirstClick(index)
		}
		//* nothing happens if field already exposed
		if (!isExposed) {
			setClickIndex(index)

			//? Mine
			if (value === 'mine') console.log('Boom!')
			//! End Game

			//? Number
			if (value && value !== 'mine') {
				setExposedArray((currentArray) => {
					currentArray[index] = true
					return [...currentArray]
				})
			}
			//? Zero
			if (value === 0) {
				const allSurroundingIndexs = getAllSurroundingIndexs(index)
				console.log(allSurroundingIndexs)
				setExposedArray((currentArray) => {
					console.log(currentArray)
					return currentArray.map((field, i) =>
						allSurroundingIndexs.includes(i) ? (currentArray[i] = true) : field
					)
				})
			}
		}
	}

	return (
		<VStack
			onClick={() => {
				OnFieldLeftClick()
			}}
			w={fieldWidth}
			h={fieldWidth}
			bgColor={bgColor}
			justifyContent={'center'}>
			{value === 'mine' ? <Mine width={mineWidth} /> : <Text>{value}</Text>}
		</VStack>
	)
}

export default Field

const Mine = ({ width }) => {
	return <Box w={width} h={width} bgColor='black' borderRadius={'full'} />
}
