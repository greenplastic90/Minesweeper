import { GridItem, SimpleGrid } from '@chakra-ui/react'
import { useEffect } from 'react'
import Field from './Field'
import { generateRandomFieldValueArray } from './grid-functions'

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
	firstClickIndex,
	setFirstClickIndex,
	OnFieldLeftClick,
	resetToggle,
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
				isExposed: false,
				value: null,
			})
		}

		setFieldsData(fieldsArray)
	}, [difficulty, setFieldsData, resetToggle])

	//* Generate values after first click
	useEffect(() => {
		if (firstClick) {
			setvaluesArray(
				generateRandomFieldValueArray(
					difficulty.mines,
					difficulty.horizontal_boxes * difficulty.vertical_boxes,
					firstClickIndex,
					difficulty.horizontal_boxes
				)
			)
		}
	}, [difficulty, firstClick, firstClickIndex, setvaluesArray])

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
					setFirstClickIndex={setFirstClickIndex}
					OnFieldLeftClick={OnFieldLeftClick}
					isExposed={f.isExposed}
				/>
			)
		)
		setFields(fieldCompsArr)
	}, [difficulty, fieldsData, firstClick, setFields, setFirstClick, setFirstClickIndex])

	return (
		<SimpleGrid columns={difficulty.horizontal_boxes}>
			{fields.map((field, i) => (
				<GridItem key={i}>{field}</GridItem>
			))}
		</SimpleGrid>
	)
}

export default GameGrid
