import { Box, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BsFillFlagFill } from 'react-icons/bs'
import { getAllSurroundingIndexsToExpose, getFieldsSurroundingExludingIndex } from './grid-functions'

const Field = ({ index, fieldWidth, mineWidth, bgIsLight, value, firstClick, setFirstClick, exposedArray, setExposedArray, isExposed, boardWidth, valuesArray, setMineClicked, setFlagsArray, hasFlag }) => {
	const [bgColor, setBgColor] = useState()
	const [valueColor, setValueColor] = useState()
	const [bgHoverColor, setBgHoverColor] = useState()
	const [border, setBorder] = useState({ top: false, bottom: false, left: false, right: false })
	const [surroundingIndexs, setSurroundingIndexs] = useState([])

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

	//* set valueColor
	useEffect(() => {
		if (value === 1) setValueColor('numbers.one')
		if (value === 2) setValueColor('numbers.two')
		if (value === 3) setValueColor('numbers.three')
		if (value === 4) setValueColor('numbers.four')
		if (value === 5) setValueColor('numbers.five')
		if (value === 6) setValueColor('numbers.six')
		if (value === 7) setValueColor('numbers.seven')
		if (value === 8) setValueColor('numbers.eight')
	}, [value])

	const OnFieldLeftClick = () => {
		if (!hasFlag) {
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
						return currentArray.map((field, i) => (allSurroundingIndexs.includes(i) ? (currentArray[i] = true) : field))
					})
				}
			}
		}
	}
	const onFieldRightClick = (e) => {
		e.preventDefault()
		setFlagsArray((current) => {
			current[index] = current[index] ? false : true
			return [...current]
		})
	}

	//* get the index surrounding this fields index
	useEffect(() => {
		if (exposedArray.length > 0) {
			setSurroundingIndexs(getFieldsSurroundingExludingIndex(index, exposedArray.length, boardWidth))
		}
	}, [boardWidth, index, exposedArray])

	//* update border based on if the surrounding borders have been exposed
	useEffect(() => {
		if (isExposed) {
			setBorder((current) => {
				let newBorder = { ...current }
				surroundingIndexs.forEach((fieldIndex) => {
					//* if the field adjacent is not exposed
					if (!exposedArray[fieldIndex]) {
						if (fieldIndex + boardWidth === index) newBorder = { ...newBorder, top: true }
						if (fieldIndex - boardWidth === index) newBorder = { ...newBorder, bottom: true }
						if (fieldIndex + 1 === index) newBorder = { ...newBorder, left: true }
						if (fieldIndex - 1 === index) newBorder = { ...newBorder, right: true }
					}
					//* if the field adjacent is exposed
					if (exposedArray[fieldIndex]) {
						if (fieldIndex + boardWidth === index) newBorder = { ...newBorder, top: false }
						if (fieldIndex - boardWidth === index) newBorder = { ...newBorder, bottom: false }
						if (fieldIndex + 1 === index) newBorder = { ...newBorder, left: false }
						if (fieldIndex - 1 === index) newBorder = { ...newBorder, right: false }
					}
				})

				return newBorder
			})
		}
	}, [boardWidth, exposedArray, index, isExposed, surroundingIndexs])

	//* remove flag if exposed
	useEffect(() => {
		if (hasFlag && isExposed) {
			setFlagsArray((current) => {
				current[index] = false
				return [...current]
			})
		}
	})

	return (
		<VStack
			onContextMenu={onFieldRightClick}
			onClick={(e) => {
				OnFieldLeftClick(e)
			}}
			w={fieldWidth}
			h={fieldWidth}
			bgColor={bgColor}
			_hover={{ bg: bgHoverColor }}
			justifyContent={'center'}
			borderRight={border.right && '2px solid'}
			borderRightColor={border.right && 'field.border'}
			borderLeft={border.left && '2px solid'}
			borderLeftColor={border.left && 'field.border'}
			borderTop={border.top && '2px solid'}
			borderTopColor={border.top && 'field.border'}
			borderBottom={border.bottom && '2px solid'}
			borderBottomColor={border.bottom && 'field.border'}>
			{isExposed ? (
				value === 'mine' ? (
					<Mine width={mineWidth} />
				) : value !== 0 ? (
					<Text fontWeight={'bold'} color={valueColor}>
						{value}
					</Text>
				) : null
			) : hasFlag ? (
				<BsFillFlagFill />
			) : null}
		</VStack>
	)
}

export default Field

const Mine = ({ width }) => {
	return <Box w={width} h={width} bgColor='black' borderRadius={'full'} />
}
