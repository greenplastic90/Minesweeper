import { Box, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BsFillFlagFill } from 'react-icons/bs'
import { GameSetup, getAllSurroundingIndexsToExpose, getFieldsSurroundingExludingIndex, getRandomInt } from './grid-functions'

// const Field = ({ index, difficulty, bgIsLight, value, firstClick, setFirstClick, exposedArray, setExposedArray, isExposed, boardWidth, valuesArray, setMineClicked, setFlagsArray, hasFlag, handleShakeAnimation, exposedIndexesToAnimate, setExposedIndexesToAnimate, disbaleField, mineIndexes }) => {
// 	const [bgColor, setBgColor] = useState()
// 	const [bgColorAnimatedField, setBgColorAnimatedField] = useState()
// 	const [valueColor, setValueColor] = useState()
// 	const [bgHoverColor, setBgHoverColor] = useState()
// 	const [border, setBorder] = useState({ top: false, bottom: false, left: false, right: false })
// 	const [surroundingIndexs, setSurroundingIndexs] = useState([])
// 	const [exposeAnimation, setExposeAnimation] = useState(false)
// 	const [explodeMineAnimation, setExplodeMineAnimation] = useState(false)
// 	//* created to delay showing value till animation starts
// 	const [showValue, setShowValue] = useState(false)
// 	const { mine_width, box_width, value_size, border_width } = difficulty
// 	const borderStyle = {
// 		width: border_width,
// 		color: 'field.border',
// 	}
// 	const exposeAnimationDuration = 1.5
// 	const [exposeValueFieldAnimationVisual, setExposeValueFieldAnimationVisual] = useState({ scale: [1, 0], transition: { type: 'spring', stiffness: 1000, duration: exposeAnimationDuration } })
// 	const [explodeMineAnimationVisual, setExplodeMineAnimationVisual] = useState({ scale: [0.75, 1, 1, 1, 0], rotate: [-10, -10, 10, -10, 10], x: [0, -30, 20, -20, 20], y: [0, -50, -40, 0, 40], transition: { type: 'spring', stiffness: 1000, duration: 3 } })
// 	const [mineBgColorToAnimate, setMineBgColorToAnimate] = useState({})
// 	const [mineAnimationColors, setMineAnimationColors] = useState({})

// 	const OnFieldLeftClick = (e) => {
// 		e.preventDefault()

// 		if (!hasFlag && !disbaleField) {
// 			//* only happens on first click to set the values of the fields
// 			//* need this to work when firstClick has the index 0
// 			if (!firstClick && firstClick !== 0) {
// 				setFirstClick(index)
// 				handleShakeAnimation()
// 			}
// 			//* nothing happens if field already exposed
// 			if (!isExposed) {
// 				//? Value
// 				if (value) {
// 					setExposedArray((currentArray) => {
// 						currentArray[index] = true
// 						return [...currentArray]
// 					})
// 					setExposedIndexesToAnimate([index])
// 					//? Mine

// 					if (value === 'mine') {
// 						setMineClicked(index)
// 						handleShakeAnimation()
// 					}
// 				}
// 				//? Zero
// 				if (value === 0) {
// 					handleShakeAnimation()
// 					const allSurroundingIndexs = getAllSurroundingIndexsToExpose(index, valuesArray, boardWidth)
// 					setExposedIndexesToAnimate(allSurroundingIndexs)
// 					setExposedArray((currentArray) => {
// 						return currentArray.map((field, i) => (allSurroundingIndexs.includes(i) ? (currentArray[i] = true) : field))
// 					})
// 				}
// 			}
// 		}
// 	}
// 	const onFieldRightClick = (e) => {
// 		e.preventDefault()
// 		if (!disbaleField) {
// 			setFlagsArray((current) => {
// 				current[index] = current[index] ? false : true
// 				return [...current]
// 			})
// 		}
// 	}

// 	//* set bgColor, bgHoverColor, bgColorAnimatedField
// 	useEffect(() => {
// 		if (bgIsLight) {
// 			setBgColorAnimatedField('field.green_light')
// 			if (isExposed) {
// 				setBgColor('field.brown_light')
// 				//* don't want to add a hover effect if the field is Zero
// 				if (value) {
// 					setBgHoverColor('field.brown_hover_light')
// 				} else {
// 					setBgHoverColor()
// 				}
// 			} else {
// 				setBgColor('field.green_light')
// 				setBgHoverColor('field.green_hover_light')
// 			}
// 		} else {
// 			setBgColorAnimatedField('field.green_dark')
// 			if (isExposed) {
// 				setBgColor('field.brown_dark')
// 				//* don't want to add a hover effect if the field is Zero
// 				if (value) {
// 					setBgHoverColor('field.brown_hover_dark')
// 				} else {
// 					setBgHoverColor()
// 				}
// 			} else {
// 				setBgColor('field.green_dark')
// 				setBgHoverColor('field.green_hover_dark')
// 			}
// 		}
// 	}, [bgIsLight, isExposed, value])

// 	//* set valueColor
// 	useEffect(() => {
// 		if (value === 1) setValueColor('numbers.one')
// 		if (value === 2) setValueColor('numbers.two')
// 		if (value === 3) setValueColor('numbers.three')
// 		if (value === 4) setValueColor('numbers.four')
// 		if (value === 5) setValueColor('numbers.five')
// 		if (value === 6) setValueColor('numbers.six')
// 		if (value === 7) setValueColor('numbers.seven')
// 		if (value === 8) setValueColor('numbers.eight')
// 	}, [value])

// 	//* get the index surrounding this fields index
// 	useEffect(() => {
// 		if (exposedArray.length > 0) {
// 			setSurroundingIndexs(getFieldsSurroundingExludingIndex(index, exposedArray.length, boardWidth))
// 		}
// 	}, [boardWidth, index, exposedArray])

// 	//* update border based on if the surrounding borders have been exposed
// 	useEffect(() => {
// 		if (isExposed && value !== 'mine') {
// 			setBorder((current) => {
// 				let newBorder = { ...current }
// 				surroundingIndexs.forEach((fieldIndex) => {
// 					//* if the field adjacent is not exposed OR it is exposed and the value is mine
// 					if (!exposedArray[fieldIndex] || (exposedArray[fieldIndex] && valuesArray[fieldIndex] === 'mine')) {
// 						if (fieldIndex + boardWidth === index) newBorder = { ...newBorder, top: true }
// 						if (fieldIndex - boardWidth === index) newBorder = { ...newBorder, bottom: true }
// 						if (fieldIndex + 1 === index) newBorder = { ...newBorder, left: true }
// 						if (fieldIndex - 1 === index) newBorder = { ...newBorder, right: true }
// 						//* if the field adjacent is exposed
// 					} else if (exposedArray[fieldIndex]) {
// 						if (fieldIndex + boardWidth === index) newBorder = { ...newBorder, top: false }
// 						if (fieldIndex - boardWidth === index) newBorder = { ...newBorder, bottom: false }
// 						if (fieldIndex + 1 === index) newBorder = { ...newBorder, left: false }
// 						if (fieldIndex - 1 === index) newBorder = { ...newBorder, right: false }
// 					}
// 				})

// 				return newBorder
// 			})
// 		}
// 	}, [boardWidth, exposedArray, index, isExposed, surroundingIndexs, value, valuesArray])

// 	//* remove flag if exposed
// 	useEffect(() => {
// 		if (hasFlag && isExposed) {
// 			setFlagsArray((current) => {
// 				current[index] = false
// 				return [...current]
// 			})
// 		}
// 	})
// 	//* if index is in exposedIndexesToAnimate create, exposeAnimation
// 	useEffect(() => {
// 		if (exposedIndexesToAnimate.includes(index)) {
// 			setExposeAnimation(true)
// 			setTimeout(() => setExposeAnimation(false), 1000 * exposeAnimationDuration)

// 			//* created to delay showing value till animation starts
// 			setShowValue(true)

// 			//* expose animation values
// 			const yUp = getRandomInt(0, -80)
// 			const yDown = getRandomInt(0, 150)
// 			const x = getRandomInt(-80, 80)
// 			const rotate = x > 0 ? getRandomInt(30, 190) : getRandomInt(-190, -30)
// 			setExposeValueFieldAnimationVisual((current) => {
// 				return { ...current, x: [0, x], y: [0, yUp, yDown], rotate: [0, rotate] }
// 			})
// 		}
// 	}, [exposedIndexesToAnimate, index, setExposeValueFieldAnimationVisual])

// 	//* expose Mine with animation
// 	useEffect(() => {
// 		const explodeMine = mineIndexes.find((mine) => mine.index === index)
// 		if (explodeMine) {
// 			const {
// 				animateTimeout,
// 				timer,
// 				animation: {
// 					color: { mineColor, bgColorStart, bgColorEnd },
// 				},
// 			} = explodeMine

// 			animateTimeout(setExplodeMineAnimation, timer)

// 			setMineBgColorToAnimate({ backgroundColor: [bgColorStart, bgColorEnd] })
// 			setMineAnimationColors({ mine: mineColor, confetti: mineColor })
// 		}
// 	}, [index, mineIndexes])

// 	return (
// 		<Box pos={'relative'}>
// 			<VStack
// 				as={motion.div}
// 				animate={value === 'mine' && isExposed ? mineBgColorToAnimate : 'null'}
// 				onContextMenu={onFieldRightClick}
// 				onClick={(e) => {
// 					OnFieldLeftClick(e)
// 				}}
// 				w={box_width}
// 				h={box_width}
// 				bgColor={bgColor}
// 				_hover={{ bg: bgHoverColor }}
// 				justifyContent={'center'}
// 				borderRight={border.right && borderStyle.width}
// 				borderRightColor={border.right && borderStyle.color}
// 				borderLeft={border.left && borderStyle.width}
// 				borderLeftColor={border.left && borderStyle.color}
// 				borderTop={border.top && borderStyle.width}
// 				borderTopColor={border.top && borderStyle.color}
// 				borderBottom={border.bottom && borderStyle.width}
// 				borderBottomColor={border.bottom && borderStyle.color}>
// 				{isExposed ? (
// 					value === 'mine' ? (
// 						<Mine width={mine_width} color={mineAnimationColors.mine} />
// 					) : value !== 0 ? (
// 						showValue && (
// 							<Text cursor={'default'} fontSize={value_size} fontWeight={'bold'} color={valueColor}>
// 								{value}
// 							</Text>
// 						)
// 					) : null
// 				) : hasFlag ? (
// 					<BsFillFlagFill size={value_size} color={'#88252B'} />
// 				) : null}
// 			</VStack>

// 			{exposeAnimation && <Box as={motion.div} zIndex={1} top={0} bottom={0} left={0} right={0} pos={'absolute'} bgColor={bgColorAnimatedField} animate={exposeAnimation ? exposeValueFieldAnimationVisual : 'null'} />}
// 			{explodeMineAnimation && <Box as={motion.div} zIndex={2} top={'50%'} bottom={'30%'} left={'20%'} right={'50%'} pos={'absolute'} bgColor={mineAnimationColors.confetti} animate={explodeMineAnimation ? explodeMineAnimationVisual : 'null'} />}
// 		</Box>
// 	)
// }
const Field = ({ field, game, setGame }) => {
	const { index, value, isExposed, hasFlag, isDisabled } = field

	const {
		difficulty: { mine_width, value_size, box_width, horizontal_boxes },
	} = game

	const [colors, setColors] = useState({})

	const onFieldLeftClick = () => {
		setGame((current) => {
			//* only generates the value arrays if this is the first click
			if (current.isFirstClick()) current.fields = game.generateRandomFieldValueArray(index)
			current.fieldClickedIndex = index
			current.fieldClickedValue = current.fields[index].value

			//* fields to expose
			let fieldsToExpose
			console.log(current.fields[index].value)
			if (current.fields[index].value === 0) {
				fieldsToExpose = current.getAllSurroundingIndexsToExpose(index, horizontal_boxes)
			} else if (value === 'mine') {
				fieldsToExpose = [index]
			} else {
				//* value is an int
				fieldsToExpose = [index]
			}

			current.fields = game.exposeFields(fieldsToExpose)

			return new GameSetup(current.difficulty, current.fields, current.fieldClickedIndex, current.fieldClickedValue, null)
		})
	}

	//* set bgColor, bgHoverColor, bgColorAnimatedField
	useEffect(() => {
		setColors((current) => {
			return { ...current, ...field.generateFieldColors() }
		})
	}, [field, field.isExposed])
	return (
		<Box pos={'relative'}>
			<VStack
				as={motion.div}
				// animate={value === 'mine' && isExposed ? mineBgColorToAnimate : 'null'}
				// onContextMenu={onFieldRightClick}
				onClick={onFieldLeftClick}
				w={box_width}
				h={box_width}
				bgColor={colors.bgColor}
				_hover={{ bg: colors.bgHoverColor }}
				justifyContent={'center'}
				// borderRight={border.right && borderStyle.width}
				// borderRightColor={border.right && borderStyle.color}
				// borderLeft={border.left && borderStyle.width}
				// borderLeftColor={border.left && borderStyle.color}
				// borderTop={border.top && borderStyle.width}
				// borderTopColor={border.top && borderStyle.color}
				// borderBottom={border.bottom && borderStyle.width}
				// borderBottomColor={border.bottom && borderStyle.color}
			>
				{isExposed ? (
					value === 'mine' ? (
						<Mine
							width={mine_width}
							// color={mineAnimationColors.mine}
						/>
					) : value !== 0 ? (
						<Text cursor={'default'} fontSize={value_size} fontWeight={'bold'} color={colors.valueColor}>
							{value}
						</Text>
					) : null
				) : hasFlag ? (
					<BsFillFlagFill size={value_size} color={'#88252B'} />
				) : null}
			</VStack>

			{/* {exposeAnimation && <Box as={motion.div} zIndex={1} top={0} bottom={0} left={0} right={0} pos={'absolute'} bgColor={bgColorAnimatedField} animate={exposeAnimation ? exposeValueFieldAnimationVisual : 'null'} />}
			{explodeMineAnimation && <Box as={motion.div} zIndex={2} top={'50%'} bottom={'30%'} left={'20%'} right={'50%'} pos={'absolute'} bgColor={mineAnimationColors.confetti} animate={explodeMineAnimation ? explodeMineAnimationVisual : 'null'} />} */}
		</Box>
	)
}

export default Field

const Mine = ({ width, color }) => {
	return <Box w={width} h={width} bgColor={color} borderRadius={'full'} />
}
