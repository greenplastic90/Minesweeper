import { GridItem, SimpleGrid } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useEffect } from 'react'
import Field from './Field'
import { generateRandomFieldValueArray, getAllSurroundingIndexsToExpose, mineAnimationGenerator, randomShakeArray } from './grid-functions'

const GameGrid = ({ game, setGame }) => {
	const shakeAnimationDuration = 1.5
	const [runShakeAnimation, setRunShakeAnimation] = useState(false)
	const [shakeAnimation, setShakeAnimation] = useState({ y: randomShakeArray(), x: randomShakeArray(), transition: { duration: shakeAnimationDuration } })
	const { fields, difficulty, fieldClickedValue, fieldClickedIndex } = game

	useEffect(() => {
		if (fieldClickedValue === 0 || fieldClickedValue === 'mine') {
			setRunShakeAnimation(true)
			setTimeout(() => setRunShakeAnimation(false), 1000 * shakeAnimationDuration)
			setShakeAnimation((current) => {
				//* randomly creates a shake animation
				return { ...current, y: randomShakeArray(), x: randomShakeArray() }
			})
		}
		//* added fieldClickedIndex to the dependency array, so that if fieldClickedValue happens to be 0 twice in a row, this shake animation would still run
	}, [fieldClickedValue, fieldClickedIndex])

	return (
		<SimpleGrid as={motion.div} animate={runShakeAnimation ? shakeAnimation : 'null'} columns={difficulty.horizontal_boxes}>
			{fields.map((field) => (
				<GridItem key={field.index}>
					<Field field={field} game={game} setGame={setGame} />
				</GridItem>
			))}
		</SimpleGrid>
	)
}
// const GameGrid = ({ difficulty, fields, setFields, fieldsData, setFieldsData, valuesArray, setvaluesArray, firstClick, setFirstClick, mineClicked, setMineClicked, resetToggle, exposedArray, setExposedArray, numberOfFields, flagsArray, setFlagsArray, exposedIndexesToAnimate, setExposedIndexesToAnimate, mineIndexes, setMineIndexes }) => {
// 	const [runShakeAnimation, setRunShakeAnimation] = useState(false)
// 	const shakeAnimationDuration = 1.5
// 	const [shakeAnimation, setShakeAnimation] = useState({ y: randomShakeArray(), x: randomShakeArray(), transition: { duration: shakeAnimationDuration } })

// 	//* create initial fieldsData
// 	useEffect(() => {
// 		const numOfFieldsToCreate = difficulty.horizontal_boxes * difficulty.vertical_boxes

// 		const fieldsArray = []

// 		let bgLight = true

// 		const setBgColorShade = (index) => {
// 			//* if statment to create a checkered parttern
// 			if (index % difficulty.horizontal_boxes) {
// 				bgLight = !bgLight
// 			}
// 			return bgLight
// 		}

// 		for (let i = 0; i < numOfFieldsToCreate; i++) {
// 			fieldsArray.push({
// 				index: i,
// 				difficulty: difficulty,
// 				bgIsLight: setBgColorShade(i),
// 				isExposed: exposedArray[i],
// 				value: valuesArray[i],
// 			})
// 		}

// 		setFieldsData(fieldsArray)
// 	}, [difficulty, setFieldsData, resetToggle, valuesArray, exposedArray])

// 	//* generate valuesArray after firstClick
// 	useEffect(() => {
// 		if (firstClick || firstClick === 0) {
// 			setvaluesArray(generateRandomFieldValueArray(difficulty.mines, numberOfFields, firstClick, difficulty.horizontal_boxes))
// 		}
// 	}, [difficulty, firstClick, numberOfFields, setExposedArray, setvaluesArray])

// 	//* once firstClick then ValuesArray is Created, expose fields based on the firstClick
// 	useEffect(() => {
// 		if (valuesArray.length > 0) {
// 			const allSurroundingIndexs = getAllSurroundingIndexsToExpose(firstClick, valuesArray, difficulty.horizontal_boxes)
// 			setExposedIndexesToAnimate(allSurroundingIndexs)
// 			setExposedArray((currentArray) => {
// 				return currentArray.map((field, i) => (allSurroundingIndexs.includes(i) ? (currentArray[i] = true) : field))
// 			})
// 		}
// 	}, [difficulty, firstClick, setExposedArray, setExposedIndexesToAnimate, valuesArray])

// 	//* updates fields whenever valuesArray or exposedArray are updated
// 	useEffect(() => {
// 		const disableField = mineClicked || mineClicked === 0 ? true : false
// 		const fieldCompsArr = []
// 		fieldsData.forEach((f, i) => fieldCompsArr.push(<Field index={f.index} difficulty={f.difficulty} bgIsLight={f.bgIsLight} value={f.value} firstClick={firstClick} setFirstClick={setFirstClick} exposedArray={exposedArray} setExposedArray={setExposedArray} isExposed={exposedArray[i]} numberOfFields={numberOfFields} boardWidth={difficulty.horizontal_boxes} valuesArray={valuesArray} setMineClicked={setMineClicked} setFlagsArray={setFlagsArray} hasFlag={flagsArray[i]} handleShakeAnimation={handleShakeAnimation} exposedIndexesToAnimate={exposedIndexesToAnimate} setExposedIndexesToAnimate={setExposedIndexesToAnimate} disbaleField={disableField} mineIndexes={mineIndexes} />))
// 		setFields(fieldCompsArr)
// 	}, [difficulty, exposedArray, exposedIndexesToAnimate, fieldsData, firstClick, flagsArray, numberOfFields, setExposedArray, setExposedIndexesToAnimate, setFields, setFirstClick, setFlagsArray, setMineClicked, valuesArray, mineClicked, mineIndexes])

// 	//* EndGame when mineClicked
// 	useEffect(() => {
// 		const animateTimeout = (setState, timer) => {
// 			setTimeout(() => setState(true), 1000 * timer)
// 		}
// 		if (mineClicked || mineClicked === 0) {
// 			let timer = 0
// 			const mineArr = []

// 			mineArr.push({ index: mineClicked, animation: mineAnimationGenerator(), animateTimeout: animateTimeout, timer: timer })

// 			valuesArray.forEach((field, i) => {
// 				//* must be "mine", not covered with flag and not already in the array.
// 				if (field === 'mine' && !flagsArray[i] && !mineArr.some((mine) => mine.index === i)) {
// 					timer = timer + 0.2
// 					mineArr.push({ index: i, animation: mineAnimationGenerator(), animateTimeout: animateTimeout, timer: timer })
// 				}
// 			})
// 			//! if flag doesn't cover a mine, expose it with an X at the end of exposing mines.
// 			//! stop timer when player wins
// 			console.log(mineArr)
// 			setMineIndexes(mineArr)
// 		}
// 	}, [flagsArray, mineClicked, setMineIndexes, valuesArray])

// 	//* expose mines in squence once gamne ends
// 	// useEffect(() => {
// 	// 	if (mineIndexes.length > 0) {
// 	// 		let i = 0

// 	// 		const mineExplodingInterval = setInterval(() => {
// 	// 			if (mineIndexes.length > i) {
// 	// 				setMinesToExpose((current) => {
// 	// 					//* below if statmnet makes sure we aren't adding an inedx already in mineIndexes (first clicked mine is already there)
// 	// 					if (current.map((c) => c.index).includes(mineIndexes[i])) i++
// 	// 					setExposedArray((c) => {
// 	// 						c[mineIndexes[i]] = true
// 	// 						return [...c]
// 	// 					})
// 	// 					setExposedIndexesToAnimate([mineIndexes[i]])
// 	// 					return [...current, { index: mineIndexes[i], animation: mineAnimationGenerator() }]
// 	// 				})

// 	// 				i++
// 	// 			}
// 	// 		}, 1000 * 0.3)

// 	// 		return () => {
// 	// 			clearInterval(mineExplodingInterval)
// 	// 		}
// 	// 	}
// 	// }, [mineClicked, mineIndexes, setExposedArray, setExposedIndexesToAnimate, setMinesToExpose])

// 	//* randomize shake animation
// 	useEffect(() => {
// 		setShakeAnimation((current) => {
// 			return { ...current, y: randomShakeArray(), x: randomShakeArray() }
// 		})
// 	}, [runShakeAnimation])

// 	const handleShakeAnimation = () => {
// 		setRunShakeAnimation(true)
// 		setTimeout(() => setRunShakeAnimation(false), 1000 * shakeAnimationDuration)
// 	}

// 	return (
// 		<SimpleGrid as={motion.div} animate={runShakeAnimation ? shakeAnimation : 'null'} columns={difficulty.horizontal_boxes}>
// 			{fields.map((field, i) => (
// 				<GridItem key={i}>{field}</GridItem>
// 			))}
// 		</SimpleGrid>
// 	)
// }

export default GameGrid
