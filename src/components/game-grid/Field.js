import { Box, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BsFillFlagFill } from 'react-icons/bs'
import { TbX } from 'react-icons/tb'
import { GameSetup, getRandomInt, ConfettiSetup } from './grid-functions'

const Field = ({ field, game, setGame }) => {
	const { index, value, isExposed, hasFlag, isDisabled, runMineAnimation, exposeMineTimer, mineExplodeAimationValues, falseFlag } = field

	const {
		difficulty: { mine_width, value_size, box_width, border_width, horizontal_boxes },
		numberOfFields,
		fields,
	} = game
	const borderStyle = {
		width: border_width,
		color: 'field.border',
	}
	const [colors, setColors] = useState({})
	const [mineAnimationColors, setMineAnimationColors] = useState({})
	const [borders, setBorders] = useState({ top: false, bottom: false, left: false, right: false })
	const [exposeAnimation, setExposeAnimation] = useState(false)
	const exposeAnimationDuration = 1.5
	const [exposeValueFieldAnimationVisual, setExposeValueFieldAnimationVisual] = useState({ scale: [1, 0], transition: { type: 'spring', stiffness: 1000, duration: exposeAnimationDuration } })
	//* showValue is created so that when animation is exposed, there is a slight delay before value is shown, otherwise the value shows over the animation for a brief time
	const [showValue, setShowValue] = useState(false)
	const [mineExplodeAnimation, setMineExplodeAnimation] = useState(false)
	const [exposeFalseFlag, setExposeFalseFlag] = useState(false)

	const onFieldLeftClick = () => {
		if (!isDisabled) {
			setGame((current) => {
				//* only generates the value arrays if this is the first click
				if (current.isFirstClick()) current.generateRandomFieldValueArray(index)

				//* updates index and value clicked
				current.fieldClicked(index)

				//* fields to expose
				let fieldsToExpose = current.fields[index].value === 0 ? current.getAllSurroundingIndexsToExpose(index, horizontal_boxes) : [index]
				current.exposeFields(fieldsToExpose)

				return new GameSetup(current.difficulty, current.fields, current.fieldClickedIndex, current.fieldClickedValue, current.mineClickedIndex)
			})
		}
	}
	const onFieldRightClick = (e) => {
		e.preventDefault()
		field.toggleFlag()
		setGame((current) => {
			return new GameSetup(current.difficulty, current.fields, current.fieldClickedIndex, current.fieldClickedValue, current.mineClickedIndex)
		})
	}

	//* expose false flag
	useEffect(() => {
		if (falseFlag) {
			setTimeout(() => {
				setExposeFalseFlag(true)
			}, 1000 * exposeMineTimer)
		}
	}, [exposeMineTimer, falseFlag])

	//* runs when mines are exposed
	useEffect(() => {
		if (runMineAnimation) {
			setTimeout(() => {
				setMineExplodeAnimation(true)
				field.isExposed = true
				field.runMineAnimation = false
				setMineAnimationColors(mineExplodeAimationValues.color)
			}, 1000 * exposeMineTimer)
		}
	}, [exposeMineTimer, field, mineExplodeAimationValues, runMineAnimation])

	useEffect(() => {
		//* set bgColor, bgHoverColor, bgColorAnimatedField
		setColors((current) => {
			return { ...current, ...field.generateFieldColors() }
		})
		//* runs exposed animation
		if (isExposed) {
			setExposeAnimation(true)
			setTimeout(() => setShowValue(true), 1000 * 0.1)

			//* expose animation values
			const yUp = getRandomInt(0, -80)
			const yDown = getRandomInt(0, 150)
			const x = getRandomInt(-80, 80)
			const rotate = x > 0 ? getRandomInt(30, 190) : getRandomInt(-190, -30)
			setExposeValueFieldAnimationVisual((current) => {
				return { ...current, x: [0, x], y: [0, yUp, yDown], rotate: [0, rotate] }
			})
		}
	}, [field, isExposed])
	//* create border
	useEffect(() => {
		setBorders((current) => {
			return { ...current, ...field.createBorders(current, numberOfFields, horizontal_boxes, fields) }
		})
	}, [field, fields, horizontal_boxes, numberOfFields, game])

	//! mines covers with flags not covering mines will show an x after mines finish exploding
	//!
	return (
		<Box pos={'relative'}>
			<VStack
				as={motion.div}
				animate={mineExplodeAnimation ? { backgroundColor: [mineAnimationColors.bgColorStart, mineAnimationColors.bgColorEnd] } : 'null'}
				onContextMenu={onFieldRightClick}
				onClick={onFieldLeftClick}
				w={box_width}
				h={box_width}
				bgColor={colors.bgColor}
				//* if expose animation is true, remove hover effect
				_hover={!exposeAnimation && { bg: colors.bgHoverColor }}
				justifyContent={'center'}
				borderRight={borders.right && borderStyle.width}
				borderRightColor={borders.right && borderStyle.color}
				borderLeft={borders.left && borderStyle.width}
				borderLeftColor={borders.left && borderStyle.color}
				borderTop={borders.top && borderStyle.width}
				borderTopColor={borders.top && borderStyle.color}
				borderBottom={borders.bottom && borderStyle.width}
				borderBottomColor={borders.bottom && borderStyle.color}>
				{isExposed ? (
					value === 'mine' ? (
						<Mine width={mine_width} color={mineAnimationColors.mineColor} />
					) : value !== 0 ? (
						showValue && (
							<Text cursor={'default'} fontSize={value_size} fontWeight={'bold'} color={colors.valueColor}>
								{value}
							</Text>
						)
					) : null
				) : hasFlag ? (
					exposeFalseFlag ? (
						<TbX size='100%' color={'#DF4826'} />
					) : (
						<BsFillFlagFill size={value_size} color={'#DF4826'} />
					)
				) : null}
			</VStack>
			{exposeAnimation && <FieldTopLayer expose={exposeAnimation} exposeAnimationValues={exposeValueFieldAnimationVisual} color={colors.bgColorAnimatedField} />}
			<DisplayConfetti runAnimation={mineExplodeAnimation} color={mineAnimationColors.mineColor} />
		</Box>
	)
}

export default Field

const DisplayConfetti = ({ runAnimation, color }) => {
	const [confettiArrayData, setConfettiArrayData] = useState([])

	useEffect(() => {
		if (runAnimation) {
			const NUMBER_OF_CONFETTI = getRandomInt(5, 7)
			const arrayOfConfetti = []

			for (let i = 0; i < NUMBER_OF_CONFETTI; i++) {
				const newConfetti = new ConfettiSetup(color)
				newConfetti.generateRandomConfetti()

				arrayOfConfetti.push(newConfetti)
			}
			setConfettiArrayData(arrayOfConfetti)
		}
	}, [color, runAnimation])

	return (
		<>
			{runAnimation && (
				<>
					{confettiArrayData.map((c, i) => (
						<Box key={i} as={motion.div} zIndex={2} top={`${c.position.top}%`} bottom={`${c.position.bottom}%`} left={`${c.position.left}%`} right={`${c.position.right}%`} pos={'absolute'} bgColor={color} animate={c.animation} />
					))}
				</>
			)}
		</>
	)
}
const Confetti = ({ position, animation, color }) => {
	const { top, bottom, left, right } = position
	return <Box as={motion.div} zIndex={2} top={`${top}%`} bottom={`${bottom}%`} left={`${left}%`} right={`${right}%`} pos={'absolute'} bgColor={color} animate={animation} />
}

const Mine = ({ width, color }) => {
	return <Box w={width} h={width} bgColor={color} borderRadius={'full'} />
}

const FieldTopLayer = ({ expose, exposeAnimationValues, color }) => {
	return <Box as={motion.div} zIndex={1} top={0} bottom={0} left={0} right={0} pos={'absolute'} bgColor={color} animate={expose ? exposeAnimationValues : 'null'} />
}
