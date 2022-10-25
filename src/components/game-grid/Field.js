import { Box, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getAllSurroundingIndexsToExpose } from './grid-functions'

const Field = ({
	index,
	fieldWidth,
	mineWidth,
	bgIsLight,
	value,
	firstClick,
	setFirstClick,
	setExposedArray,
	isExposed,
	boardWidth,
	valuesArray,
	setMineClicked,
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

	const OnFieldLeftClick = () => {
		//* only happens first click to set the values of the fields
		if (!firstClick && firstClick !== 0) {
			setFirstClick(index)
		}
		//* nothing happens if field already exposed
		if (!isExposed) {
			//? Value
			if (value) {
				setExposedArray((currentArray) => {
					currentArray[index] = true
					return [...currentArray]
				})
				//? Mine
				if (value === 'mine') setMineClicked(true)
			}
			//? Zero
			if (value === 0) {
				const allSurroundingIndexs = getAllSurroundingIndexsToExpose(index, valuesArray, boardWidth)
				setExposedArray((currentArray) => {
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
			{isExposed ? (
				value === 'mine' ? (
					<Mine width={mineWidth} />
				) : value !== 0 ? (
					<Text>{value}</Text>
				) : null
			) : null}
		</VStack>
	)
}

export default Field

const Mine = ({ width }) => {
	return <Box w={width} h={width} bgColor='black' borderRadius={'full'} />
}
