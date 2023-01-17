import { Box, Image, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useCallback } from 'react'
import { useEffect, useState } from 'react'

import { TbX } from 'react-icons/tb'
import FlagImage from '../../assets/icons/flag-3.svg'
import { GameSetup, getRandomNum, ConfettiSetup, isMobileOrTablet } from './grid-functions'

const Field = ({ field, game, setGame, setShowEndGame, setEndGameTimeout }) => {
	const { index, value, isExposed, hasFlag, isDisabled, runMineAnimation, exposeMineTimer, mineColor, falseFlag } = field

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
	const [touchStart, setTouchStart] = useState(null)
	const holdDownInSeconds = 0.5

	const onFieldLeftClick = useCallback(() => {
		//* if timer is pause, the game has been won or lost
		//* so if a click has happend after the game has ended, we want to display showEndGame and cancel the timer that was set to show it after all the mines have exploded
		if (game.timer === 'pause') {
			setEndGameTimeout((current) => {
				clearTimeout(current)
				return current
			})

			setShowEndGame((current) => {
				return { ...current, show: true }
			})
		}
		if (!isDisabled && !hasFlag) {
			setGame((current) => {
				//* only generates the value arrays if this is the first click
				if (current.isFirstClick()) {
					current.activateTimer()
					current.generateRandomFieldValueArray(index)
				}

				//* updates index and value clicked
				current.fieldClicked(index)

				//* fields to expose
				let fieldsToExpose = current.fields[index].value === 0 ? current.getAllSurroundingIndexsToExpose(index, horizontal_boxes) : [index]
				current.exposeFields(fieldsToExpose)

				if (current.isGameWon() || value === 'mine') {
					current.pauseTimer()

					const timeUntilEndGameIsDisplayed = value === 'mine' ? current.explodeMineTimer : 0
					setShowEndGame((current) => {
						return { ...current, disableBtns: true, hasWon: value === 'mine' ? false : true }
					})

					const timeOut = setTimeout(
						() =>
							setShowEndGame((current) => {
								return { ...current, show: true }
							}),
						1000 * (timeUntilEndGameIsDisplayed + 1.5)
					)
					setEndGameTimeout(timeOut)
				}

				return new GameSetup(current.difficulty, current.fields, current.fieldClickedIndex, current.fieldClickedValue, current.mineClickedIndex, current.timer)
			})
		}
	}, [game, hasFlag, horizontal_boxes, index, isDisabled, setEndGameTimeout, setGame, setShowEndGame, value])

	const handleToggleFlag = useCallback(
		(e) => {
			if (e) e.preventDefault()
			if (!isDisabled) {
				field.toggleFlag()
				setGame((current) => {
					return new GameSetup(current.difficulty, current.fields, current.fieldClickedIndex, current.fieldClickedValue, current.mineClickedIndex, current.timer)
				})
			}
		},
		[field, isDisabled, setGame]
	)

	const handelLongPress = (e) => {
		const touchEnd = e.timeStamp
		console.log('touchStart ->', touchStart, 'touchEnd ->', touchEnd)

		const timePressedInSeconds = (touchEnd - touchStart) / 1000

		timePressedInSeconds < holdDownInSeconds ? onFieldLeftClick() : handleToggleFlag()
	}

	//* expose false flag (falg that has been placed where no mine is present)
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
				setMineAnimationColors(mineColor)
			}, 1000 * exposeMineTimer)
		}
	}, [exposeMineTimer, field, mineColor, runMineAnimation])

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
			const yUp = getRandomNum(0, -80)
			const yDown = getRandomNum(0, 150)
			const x = getRandomNum(-80, 80)
			const rotate = x > 0 ? getRandomNum(30, 190) : getRandomNum(-190, -30)
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

	return (
		<Box cursor={'pointer'} pos={'relative'}>
			<VStack
				as={motion.div}
				animate={mineExplodeAnimation ? { backgroundColor: [mineAnimationColors.bgColorStart, mineAnimationColors.bgColorEnd] } : 'null'}
				onContextMenu={
					isMobileOrTablet()
						? (e) => {
								e.preventDefault(e)
						  }
						: handleToggleFlag
				}
				onClick={isMobileOrTablet() ? () => {} : onFieldLeftClick}
				onTouchStart={(e) => {
					setTouchStart(e.timeStamp)
				}}
				onTouchEnd={handelLongPress}
				userSelect={'none'}
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
							<Text cursor={'default'} fontSize={value_size} fontWeight={'extrabold'} color={colors.valueColor}>
								{value}
							</Text>
						)
					) : null
				) : hasFlag ? (
					exposeFalseFlag ? (
						<TbX size='100%' color={'#DF4826'} />
					) : (
						<Image
							//? stops ios from showing same image menu when holding down on the flag image
							style={{ WebkitTouchCallout: 'none' }}
							onContextMenu={(e) => {
								e.preventDefault()
							}}
							userSelect={'none'}
							h={value_size}
							src={FlagImage}
							alt='flag'
						/>
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
			const NUMBER_OF_CONFETTI = getRandomNum(6, 8)
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
					{confettiArrayData.map((c) => (
						<Box key={c.id} as={motion.div} zIndex={2} top={`${c.position.top}%`} bottom={`${c.position.bottom}%`} left={`${c.position.left}%`} right={`${c.position.right}%`} pos={'absolute'} bgColor={c.color} animate={c.animation} />
					))}
				</>
			)}
		</>
	)
}

const Mine = ({ width, color }) => {
	return <Box w={width} h={width} bgColor={color} borderRadius={'full'} />
}

const FieldTopLayer = ({ expose, exposeAnimationValues, color }) => {
	return <Box as={motion.div} zIndex={1} top={0} bottom={0} left={0} right={0} pos={'absolute'} bgColor={color} animate={expose ? exposeAnimationValues : 'null'} />
}
