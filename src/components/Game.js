import { VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import GameHeader from './game-header/GameHeader'

import GameGrid from './game-grid/GameGrid'
import { Field, GameSetup, localStorageDifficulty, setBgColorShade } from './game-grid/grid-functions'

const Game = () => {
	const [game, setGame] = useState()
	const [difficulty, setDifficulty] = useState(localStorageDifficulty())
	const numberOfFields = difficulty.horizontal_boxes * difficulty.vertical_boxes
	const [fields, setFields] = useState([])
	const [fieldsData, setFieldsData] = useState([])
	const [mineClicked, setMineClicked] = useState(null)
	const [mineIndexes, setMineIndexes] = useState([])
	const [firstClick, setFirstClick] = useState(null)
	const [valuesArray, setvaluesArray] = useState(Array.apply(null, Array(numberOfFields)))
	const [exposedArray, setExposedArray] = useState(Array.apply(null, Array(numberOfFields)))
	const [flagsArray, setFlagsArray] = useState(Array.apply(null, Array(numberOfFields)))
	const [numberOfFlags, setNumberOfFlags] = useState(difficulty.mines)
	const [exposedIndexesToAnimate, setExposedIndexesToAnimate] = useState()

	useEffect(() => {
		const numOfFieldsToCreate = difficulty.horizontal_boxes * difficulty.vertical_boxes

		const initialFieldsCreated = []

		let bgIsLight = true

		for (let i = 0; i < numOfFieldsToCreate; i++) {
			bgIsLight = setBgColorShade(i, difficulty.horizontal_boxes, bgIsLight)
			const field = new Field(i, bgIsLight, null)
			initialFieldsCreated.push(field)
		}

		const currentGame = new GameSetup(difficulty, initialFieldsCreated)
		console.log(currentGame)
		setGame(currentGame)
	}, [difficulty])

	//* resetToggle created to rerun create initial fieldsData useEffect in GameGrid
	const [resetToggle, setResetToggle] = useState(true)

	const resetGame = () => {
		setResetToggle((current) => !current)
	}
	//* resets exposedArray with proper numberOfFields when difficulty changes or reset button is clicked
	useEffect(() => {
		setFirstClick(null)
		setMineClicked(false)
		setFields([])
		setFieldsData([])
		setExposedArray(Array.apply(null, Array(numberOfFields)))
		setFlagsArray(Array.apply(null, Array(numberOfFields)))
		setvaluesArray(Array.apply(null, Array(numberOfFields)))
		setNumberOfFlags(difficulty.mines)
		setExposedIndexesToAnimate()
		setMineIndexes([])
	}, [difficulty, numberOfFields, resetToggle])

	//* updated number of flags based on how many flags in flagsArray
	useEffect(() => {
		setNumberOfFlags((current) => {
			// flags array has `true` values on indexs with a flag
			const numOfFlagsInArray = flagsArray.filter((flag) => flag).length
			return difficulty.mines - numOfFlagsInArray
		})
	}, [flagsArray, difficulty])

	//* checks if all none mine fields are exposed
	useEffect(() => {
		//* exposedArray[i] will return true if the field is exposed
		const playerWon = valuesArray.every((field, i) => (field === 'mine' ? true : exposedArray[i]))
		if (playerWon) {
			//* End Game
			//! Stop Timer
			alert('YOU WIN')
		}
	}, [exposedArray, valuesArray])

	return (
		<VStack spacing={0} boxShadow={'dark-lg'}>
			{game && (
				<>
					<GameHeader setDifficulty={setDifficulty} resetGame={resetGame} firstClick={game.firstClick} numberOfFlags={game.numberOfFlags} mineClicked={mineClicked} />
					<GameGrid game={game} setGame={setGame} />
				</>
			)}
			{/* <GameGrid difficulty={difficulty} fields={fields} setFields={setFields} fieldsData={fieldsData} setFieldsData={setFieldsData} valuesArray={valuesArray} setvaluesArray={setvaluesArray} firstClick={firstClick} setFirstClick={setFirstClick} mineClicked={mineClicked} setMineClicked={setMineClicked} resetToggle={resetToggle} exposedArray={exposedArray} setExposedArray={setExposedArray} numberOfFields={numberOfFields} flagsArray={flagsArray} setFlagsArray={setFlagsArray} exposedIndexesToAnimate={exposedIndexesToAnimate} setExposedIndexesToAnimate={setExposedIndexesToAnimate} mineIndexes={mineIndexes} setMineIndexes={setMineIndexes} /> */}
		</VStack>
	)
}

export default Game
