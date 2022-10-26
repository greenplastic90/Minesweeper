import { Box, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
	getAllSurroundingIndexsToExpose,
	getFieldsSurroundingExludingIndex,
	getFieldsSurroundingIndexWithNoMines,
	removeItemOnce,
} from './grid-functions'

const Field = ({
	index,
	fieldWidth,
	mineWidth,
	bgIsLight,
	value,
	firstClick,
	setFirstClick,
	exposedArray,
	setExposedArray,
	isExposed,
	boardWidth,
	valuesArray,
	setMineClicked,
}) => {
	const [bgColor, setBgColor] = useState()
	const [bgHoverColor, setBgHoverColor] = useState()

	//* set bgColor and bgHoverColor
	useEffect(() => {
		if (bgIsLight) {
			if (isExposed) {
				setBgColor('field.brown_light')
				//* don't want to add a hover effect if the field is Zero
				if (value) {
					setBgHoverColor('field.brown_hover_light')
				} else {
					setBgHoverColor()
				}
			} else {
				setBgColor('field.green_light')
				setBgHoverColor('field.green_hover_light')
			}
		} else {
			if (isExposed) {
				setBgColor('field.brown_dark')
				//* don't want to add a hover effect if the field is Zero
				if (value) {
					setBgHoverColor('field.brown_hover_dark')
				} else {
					setBgHoverColor()
				}
			} else {
				setBgColor('field.green_dark')
				setBgHoverColor('field.green_hover_dark')
			}
		}
	}, [bgIsLight, isExposed, value])

	const OnFieldLeftClick = () => {
		//* only happens on first click to set the values of the fields
		//* need this to work when firstClick has the index 0
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
	//* determain what sides have a border
	useEffect(() => {
		if (valuesArray.length > 0) {
			const surroundingIndexs = getFieldsSurroundingExludingIndex(index, valuesArray, boardWidth)
			const surroundingIndexsWithFieldIndexRemoved = removeItemOnce(surroundingIndexs, index)
			console.log(surroundingIndexs)
		}
	}, [boardWidth, index, valuesArray])

	return (
		<VStack
			onClick={() => {
				OnFieldLeftClick()
			}}
			w={fieldWidth}
			h={fieldWidth}
			bgColor={bgColor}
			_hover={{ bg: bgHoverColor }}
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
