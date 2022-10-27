import { VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import GameHeader from './game-header/GameHeader'

import GameGrid from './game-grid/GameGrid'
import { localStorageDifficulty } from './game-grid/grid-functions'

const Game = () => {
	const [difficulty, setDifficulty] = useState(localStorageDifficulty())
	const [fields, setFields] = useState([])
	const [fieldsData, setFieldsData] = useState([])
	const [valuesArray, setvaluesArray] = useState([])
	const [mineClicked, setMineClicked] = useState(false)
	const [firstClick, setFirstClick] = useState(null)
	const numberOfFields = difficulty.horizontal_boxes * difficulty.vertical_boxes
	const [exposedArray, setExposedArray] = useState(Array.apply(null, Array(numberOfFields)))

	//* resetToggle created to rerun create initial fieldsData useEffect in GameGrid
	const [resetToggle, setResetToggle] = useState(true)

	const resetGame = () => {
		setResetToggle((current) => !current)

		setvaluesArray([])
		setFirstClick(null)
		setMineClicked(false)
		setFields([])
		setFieldsData([])
	}
	//* resets exposedArray with proper numberOfFields when difficulty changes or reset button is clicked
	useEffect(() => {
		setExposedArray(Array.apply(null, Array(numberOfFields)))
	}, [numberOfFields, resetToggle])

	return (
		<VStack>
			<GameHeader
				difficulty={difficulty}
				setDifficulty={setDifficulty}
				resetGame={resetGame}
				firstClick={firstClick}
			/>
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
				mineClicked={mineClicked}
				setMineClicked={setMineClicked}
				resetToggle={resetToggle}
				exposedArray={exposedArray}
				setExposedArray={setExposedArray}
				numberOfFields={numberOfFields}
			/>
		</VStack>
	)
}

export default Game
