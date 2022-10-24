import { VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import GameHeader from './game-header/GameHeader'

import { easy } from './difficulty-options'
import GameGrid from './game-grid/GameGrid'
import { localStorageDifficulty } from './game-grid/grid-functions'

const Game = () => {
	const [difficulty, setDifficulty] = useState(localStorageDifficulty())
	const [fields, setFields] = useState([])
	const [fieldsData, setFieldsData] = useState([])
	const [valuesArray, setvaluesArray] = useState([])
	const [exposedArray, setExposedArray] = useState([])
	const [firstClick, setFirstClick] = useState(false)
	const [clickIndex, setClickIndex] = useState(null)
	const numberOfFields = difficulty.horizontal_boxes * difficulty.vertical_boxes

	//* resetToggle created to rerun create initial fieldsData useEffect in GameGrid
	const [resetToggle, setResetToggle] = useState(true)

	const resetGame = () => {
		setResetToggle((current) => !current)
		setExposedArray([])
		setvaluesArray([])
		setFirstClick(false)
		setClickIndex(null)
		setFields([])
		setFieldsData([])
	}

	return (
		<VStack>
			<GameHeader difficulty={difficulty} setDifficulty={setDifficulty} resetGame={resetGame} />
			<GameGrid
				difficulty={difficulty}
				fields={fields}
				setFields={setFields}
				fieldsData={fieldsData}
				setFieldsData={setFieldsData}
				valuesArray={valuesArray}
				setvaluesArray={setvaluesArray}
				firstClick={firstClick}
				setFirstClick={setFirstClick}
				clickIndex={clickIndex}
				setClickIndex={setClickIndex}
				// OnFieldLeftClick={OnFieldLeftClick}
				resetToggle={resetToggle}
				exposedArray={exposedArray}
				setExposedArray={setExposedArray}
				numberOfFields={numberOfFields}
			/>
		</VStack>
	)
}

export default Game
