import { GridItem, SimpleGrid } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useEffect } from 'react'
import Field from './Field'
import { generateRandomFieldValueArray, getAllSurroundingIndexsToExpose } from './grid-functions'

const GameGrid = ({ difficulty, fields, setFields, fieldsData, setFieldsData, valuesArray, setvaluesArray, firstClick, setFirstClick, mineClicked, setMineClicked, resetToggle, exposedArray, setExposedArray, numberOfFields, flagsArray, setFlagsArray }) => {
	const [runAnimation, setRunAnumation] = useState(false)

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
				fieldWidth: difficulty.box_width,
				mineWidth: difficulty.mine_width,
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
			setExposedArray((currentArray) => {
				return currentArray.map((field, i) => (allSurroundingIndexs.includes(i) ? (currentArray[i] = true) : field))
			})
		}
	}, [difficulty, firstClick, setExposedArray, valuesArray])

	//* updates fields whenever valuesArray or exposedArray are updated
	useEffect(() => {
		const fieldCompsArr = []
		fieldsData.forEach((f, i) => fieldCompsArr.push(<Field index={f.index} fieldWidth={f.fieldWidth} mineWidth={f.mineWidth} bgIsLight={f.bgIsLight} value={f.value} firstClick={firstClick} setFirstClick={setFirstClick} exposedArray={exposedArray} setExposedArray={setExposedArray} isExposed={exposedArray[i]} numberOfFields={numberOfFields} boardWidth={difficulty.horizontal_boxes} valuesArray={valuesArray} setMineClicked={setMineClicked} setFlagsArray={setFlagsArray} hasFlag={flagsArray[i]} />))
		setFields(fieldCompsArr)
	}, [difficulty, exposedArray, fieldsData, firstClick, flagsArray, numberOfFields, setExposedArray, setFields, setFirstClick, setFlagsArray, setMineClicked, valuesArray])

	//* EndGame when mineClicked
	useEffect(() => {}, [mineClicked])

	const handleAnimation = () => {
		setRunAnumation(true)
		setTimeout(() => setRunAnumation(false), 1000)
	}
	const variants = {
		shake: { y: [0, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, 0], x: [0, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, 0], transition: { duration: 0.5 } },
	}

	return (
		<SimpleGrid as={motion.div} onClick={() => handleAnimation()} variants={variants} animate={runAnimation ? 'shake' : 'null'} columns={difficulty.horizontal_boxes}>
			{fields.map((field, i) => (
				<GridItem key={i}>{field}</GridItem>
			))}
		</SimpleGrid>
	)
}

export default GameGrid
