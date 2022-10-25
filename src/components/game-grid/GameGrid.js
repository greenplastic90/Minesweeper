import { GridItem, SimpleGrid } from '@chakra-ui/react'
import { useEffect } from 'react'
import Field from './Field'
import { checkFieldsAroundIndex, generateRandomFieldValueArray } from './grid-functions'

const GameGrid = ({
	difficulty,
	fields,
	setFields,
	fieldsData,
	setFieldsData,
	valuesArray,
	setvaluesArray,
	firstClick,
	setFirstClick,
	clickIndex,
	setClickIndex,
	resetToggle,
	exposedArray,
	setExposedArray,
	numberOfFields,
}) => {
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

	//* Generate values after first click
	useEffect(() => {
		if (firstClick) {
			setvaluesArray(
				generateRandomFieldValueArray(
					difficulty.mines,
					numberOfFields,
					firstClick,
					difficulty.horizontal_boxes
				)
			)
		}
	}, [difficulty, firstClick, numberOfFields, setvaluesArray])

	//* Updates fields whenever valuesArray or exposedArray are updated
	useEffect(() => {
		const fieldCompsArr = []
		fieldsData.forEach((f, i) =>
			fieldCompsArr.push(
				<Field
					index={f.index}
					fieldWidth={f.fieldWidth}
					mineWidth={f.mineWidth}
					bgIsLight={f.bgIsLight}
					value={f.value}
					firstClick={firstClick}
					setFirstClick={setFirstClick}
					setClickIndex={setClickIndex}
					exposedArray={exposedArray}
					setExposedArray={setExposedArray}
					isExposed={exposedArray[i]}
					numberOfFields={numberOfFields}
					boardWidth={difficulty.horizontal_boxes}
					valuesArray={valuesArray}
					// OnFieldLeftClick={OnFieldLeftClick}
				/>
			)
		)
		setFields(fieldCompsArr)
	}, [
		difficulty,
		exposedArray,
		fieldsData,
		firstClick,
		numberOfFields,
		setExposedArray,
		setFields,
		setFirstClick,
		setClickIndex,
		valuesArray,
	])

	return (
		<SimpleGrid columns={difficulty.horizontal_boxes}>
			{fields.map((field, i) => (
				<GridItem key={i}>{field}</GridItem>
			))}
		</SimpleGrid>
	)
}

export default GameGrid
