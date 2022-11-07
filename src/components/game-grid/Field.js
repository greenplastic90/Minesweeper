import { Box, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BsFillFlagFill } from 'react-icons/bs'
import { getAllSurroundingIndexsToExpose, getFieldsSurroundingExludingIndex } from './grid-functions'

const Field = ({ index, difficulty, bgIsLight, value, firstClick, setFirstClick, exposedArray, setExposedArray, isExposed, boardWidth, valuesArray, setMineClicked, setFlagsArray, hasFlag, handleShakeAnimation, exposedIndexesToAnimate, setExposedIndexesToAnimate }) => {
	const [bgColor, setBgColor] = useState()
	const [bgColorAnimatedField, setBgColorAnimatedField] = useState()
	const [valueColor, setValueColor] = useState()
	const [bgHoverColor, setBgHoverColor] = useState()
	const [border, setBorder] = useState({ top: false, bottom: false, left: false, right: false })
	const [surroundingIndexs, setSurroundingIndexs] = useState([])
	const [exposeAnimation, setExposeAnimation] = useState(false)

	const { mine_width, box_width, value_size } = difficulty
	const borderStyle = {
		width: '2px solid',
		color: 'field.border',
	}
	const exposeAnimationDuration = 1.5

	const exposeValueFieldAnimation = { scale: [1, 0], y: [0, -60, 80], rotate: [0, 50], transition: { duration: exposeAnimationDuration } }

	const handleExposingAnimation = () => {
		setExposeAnimation(true)
		setTimeout(() => setExposeAnimation(false), 1000 * 2)
	}

	//* set bgColor, bgHoverColor, bgColorAnimatedField
	useEffect(() => {
		if (bgIsLight) {
			setBgColorAnimatedField('field.green_light')
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
			setBgColorAnimatedField('field.green_dark')
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

	const OnFieldLeftClick = (e) => {
		e.preventDefault()
		handleExposingAnimation()
		if (!hasFlag) {
			//* only happens on first click to set the values of the fields
			//* need this to work when firstClick has the index 0
			if (!firstClick && firstClick !== 0) {
				setFirstClick(index)
				handleShakeAnimation()
			}
			//* nothing happens if field already exposed
			if (!isExposed) {
				//? Value
				if (value) {
					setExposedArray((currentArray) => {
						currentArray[index] = true
						return [...currentArray]
					})
					setExposedIndexesToAnimate([index])
					//? Mine

					if (value === 'mine') {
						setMineClicked(true)
						handleShakeAnimation()
					}
				}
				//? Zero
				if (value === 0) {
					handleShakeAnimation()
					const allSurroundingIndexs = getAllSurroundingIndexsToExpose(index, valuesArray, boardWidth)
					setExposedIndexesToAnimate(allSurroundingIndexs)
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

	useEffect(() => {
		if (exposedIndexesToAnimate.includes(index)) {
			setExposeAnimation(true)
			setTimeout(() => setExposeAnimation(false), 1000 * exposeAnimationDuration)
		}
	}, [exposedIndexesToAnimate, index, isExposed])

	return (
		<Box pos={'relative'}>
			<VStack
				onContextMenu={onFieldRightClick}
				onClick={(e) => {
					OnFieldLeftClick(e)
				}}
				w={box_width}
				h={box_width}
				bgColor={bgColor}
				_hover={{ bg: bgHoverColor }}
				justifyContent={'center'}
				borderRight={border.right && borderStyle.width}
				borderRightColor={border.right && borderStyle.color}
				borderLeft={border.left && borderStyle.width}
				borderLeftColor={border.left && borderStyle.color}
				borderTop={border.top && borderStyle.width}
				borderTopColor={border.top && borderStyle.color}
				borderBottom={border.bottom && borderStyle.width}
				borderBottomColor={border.bottom && borderStyle.color}>
				{isExposed ? (
					value === 'mine' ? (
						<Mine width={mine_width} />
					) : value !== 0 ? (
						<Text cursor={'default'} fontSize={value_size} fontWeight={'bold'} color={valueColor}>
							{value}
						</Text>
					) : null
				) : hasFlag ? (
					<BsFillFlagFill size={value_size} color={'#DF4826'} />
				) : null}
				{exposeAnimation && <Box as={motion.div} zIndex={1} w={'full'} h={'full'} pos={'absolute'} bgColor={bgColorAnimatedField} animate={exposeAnimation ? exposeValueFieldAnimation : 'null'} />}
			</VStack>
		</Box>
	)
}

export default Field

const Mine = ({ width }) => {
	return <Box w={width} h={width} bgColor='black' borderRadius={'full'} />
}
