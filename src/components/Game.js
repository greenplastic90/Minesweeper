import { VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import GameHeader from './game-header/GameHeader'
import { v4 as uuidv4 } from 'uuid'

import GameGrid from './game-grid/GameGrid'
import { Field, GameSetup, localStorageDifficulty, setBgColorShade } from './game-grid/grid-functions'

const Game = () => {
	const [game, setGame] = useState()
	const [difficulty, setDifficulty] = useState(localStorageDifficulty())
	//* resetToggle created to rerun create initial fieldsData useEffect in GameGrid
	const [resetToggle, setResetToggle] = useState(true)
	const [showEndGame, setShowEndGame] = useState(false)

	const resetGame = () => {
		setResetToggle((current) => !current)
		setShowEndGame(false)
	}
	//* setup initial game
	useEffect(() => {
		setShowEndGame(false)

		const numOfFieldsToCreate = difficulty.horizontal_boxes * difficulty.vertical_boxes

		//? fields backgroup color shade
		let bgIsLight = true

		const initialFieldsCreated = []
		for (let i = 0; i < numOfFieldsToCreate; i++) {
			const feildId = uuidv4()
			bgIsLight = setBgColorShade(i, difficulty.horizontal_boxes, bgIsLight)
			const field = new Field(feildId, i, bgIsLight, null)
			initialFieldsCreated.push(field)
		}

		const currentGame = new GameSetup(difficulty, initialFieldsCreated, null, null, null, 'reset')
		console.log(currentGame)
		setGame(currentGame)
	}, [difficulty, resetToggle])

	return (
		<VStack spacing={0} boxShadow={'dark-lg'}>
			{game && (
				<>
					<GameHeader game={game} setDifficulty={setDifficulty} resetGame={resetGame} />
					<GameGrid game={game} setGame={setGame} showEndGame={showEndGame} setShowEndGame={setShowEndGame} resetGame={resetGame} />
				</>
			)}
		</VStack>
	)
}

export default Game
