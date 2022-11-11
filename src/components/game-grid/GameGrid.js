import { GridItem, SimpleGrid } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useEffect } from 'react'
import Field from './Field'
import { generateRandomFieldValueArray, getAllSurroundingIndexsToExpose, randomShakeArray } from './grid-functions'

const GameGrid = ({ difficulty, fields, setFields, fieldsData, setFieldsData, valuesArray, setvaluesArray, firstClick, setFirstClick, mineClicked, setMineClicked, resetToggle, exposedArray, setExposedArray, numberOfFields, flagsArray, setFlagsArray, exposedIndexesToAnimate, setExposedIndexesToAnimate, mineIndexes, setMineIndexes, minesToExpose, setMinesToExpose }) => {
	const [runShakeAnimation, setRunShakeAnimation] = useState(false)
	const shakeAnimationDuration = 1.5
	const [shakeAnimation, setShakeAnimation] = useState({ y: randomShakeArray(), x: randomShakeArray(), transition: { duration: shakeAnimationDuration } })

	//* create initial fieldsData
	useEffect(() => {
		const numOfFieldsToCreate = difficulty.horizontal_boxes * difficulty.vertical_boxes

		const fieldsArray = []

		let bgLight = true

		const setBgColorShade = (index) => {
			//* if statment to create a checkered parttern
			if (index % difficulty.horizontal_boxes) {
				bgLight = !bgLight
			}
			return bgLight
		}

		for (let i = 0; i < numOfFieldsToCreate; i++) {
			fieldsArray.push({
				index: i,
				difficulty: difficulty,
				bgIsLight: setBgColorShade(i),
				isExposed: exposedArray[i],
				value: valuesArray[i],
			})
		}

		setFieldsData(fieldsArray)
	}, [difficulty, setFieldsData, resetToggle, valuesArray, exposedArray])

	//* generate valuesArray after firstClick
	useEffect(() => {
		if (firstClick || firstClick === 0) {
			setvaluesArray(generateRandomFieldValueArray(difficulty.mines, numberOfFields, firstClick, difficulty.horizontal_boxes))
		}
	}, [difficulty, firstClick, numberOfFields, setExposedArray, setvaluesArray])

	//* once firstClick then ValuesArray is Created, expose fields based on the firstClick
	useEffect(() => {
		if (valuesArray.length > 0) {
			const allSurroundingIndexs = getAllSurroundingIndexsToExpose(firstClick, valuesArray, difficulty.horizontal_boxes)
			setExposedIndexesToAnimate(allSurroundingIndexs)
			setExposedArray((currentArray) => {
				return currentArray.map((field, i) => (allSurroundingIndexs.includes(i) ? (currentArray[i] = true) : field))
			})
		}
	}, [difficulty, firstClick, setExposedArray, setExposedIndexesToAnimate, valuesArray])

	//* updates fields whenever valuesArray or exposedArray are updated
	useEffect(() => {
		const disableField = mineClicked || mineClicked === 0 ? true : false
		const fieldCompsArr = []
		fieldsData.forEach((f, i) => fieldCompsArr.push(<Field index={f.index} difficulty={f.difficulty} bgIsLight={f.bgIsLight} value={f.value} firstClick={firstClick} setFirstClick={setFirstClick} exposedArray={exposedArray} setExposedArray={setExposedArray} isExposed={exposedArray[i]} numberOfFields={numberOfFields} boardWidth={difficulty.horizontal_boxes} valuesArray={valuesArray} setMineClicked={setMineClicked} setFlagsArray={setFlagsArray} hasFlag={flagsArray[i]} handleShakeAnimation={handleShakeAnimation} exposedIndexesToAnimate={exposedIndexesToAnimate} setExposedIndexesToAnimate={setExposedIndexesToAnimate} disbaleField={disableField} minesToExpose={minesToExpose} setMinesToExpose={setMinesToExpose} />))
		setFields(fieldCompsArr)
	}, [difficulty, exposedArray, exposedIndexesToAnimate, fieldsData, firstClick, flagsArray, numberOfFields, setExposedArray, setExposedIndexesToAnimate, setFields, setFirstClick, setFlagsArray, setMineClicked, valuesArray, mineClicked, minesToExpose, setMinesToExpose])

	//* EndGame when mineClicked
	useEffect(() => {
		if (mineClicked || mineClicked === 0) {
			const thesee = []
			valuesArray.forEach((field, i) => {
				if (field === 'mine') thesee.push(i)
			})
			setMineIndexes(thesee)
		}
	}, [mineClicked, setMineIndexes, valuesArray])

	//* expose mines one at a time one gamne ends
	useEffect(() => {
		if (mineIndexes.length > 0) {
			let i = 0

			const mineExplodingInterval = setInterval(() => {
				if (mineIndexes.length > i) {
					setMinesToExpose((current) => {
						if (current.includes(mineIndexes[i])) i++
						setExposedArray((c) => {
							c[mineIndexes[i]] = true
							return [...c]
						})
						return [...current, mineIndexes[i]]
					})

					i++
				}
			}, 1000)

			return () => {
				clearInterval(mineExplodingInterval)
			}
		}
	}, [mineClicked, mineIndexes, setExposedArray, setMinesToExpose])

	//* randomize shake animation
	useEffect(() => {
		setShakeAnimation((current) => {
			return { ...current, y: randomShakeArray(), x: randomShakeArray() }
		})
	}, [runShakeAnimation])

	const handleShakeAnimation = () => {
		setRunShakeAnimation(true)
		setTimeout(() => setRunShakeAnimation(false), 1000 * shakeAnimationDuration)
	}

	return (
		<SimpleGrid as={motion.div} animate={runShakeAnimation ? shakeAnimation : 'null'} columns={difficulty.horizontal_boxes}>
			{fields.map((field, i) => (
				<GridItem key={i}>{field}</GridItem>
			))}
		</SimpleGrid>
	)
}

export default GameGrid
