import { VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import GameHeader from './game-header/GameHeader'
import { v4 as uuidv4 } from 'uuid'

import GameGrid from './game-grid/GameGrid'
import { createBlankLocalStorageHighscores, Field, GameSetup, localStorageDifficulty, setBgColorShade } from './game-grid/grid-functions'

const Game = () => {
	const [game, setGame] = useState()
	const [difficulty, setDifficulty] = useState(localStorageDifficulty())
	//* resetToggle created to rerun create initial fieldsData useEffect in GameGrid
	const [resetToggle, setResetToggle] = useState(true)
	const [showEndGame, setShowEndGame] = useState({ show: false, disableBtns: false })

	//* timer states
	const [ones, setOnes] = useState(0)
	const [tens, setTens] = useState(0)
	const [hundreds, setHundreds] = useState(0)
	const [timeIntervals, setTimeIntervals] = useState({ ones: null, tens: null, hundreds: null })

	//* starts timer when after first click
	useEffect(() => {
		const updateTimer = (set) => {
			set((current) => {
				//* resets to 0 after 9 is reached
				if (current === 9) {
					return 0
				}
				return current + 1
			})
		}
		const clearAllIntervals = () => {
			setTimeIntervals((current) => {
				clearInterval(current.ones)
				clearInterval(current.tens)
				clearInterval(current.hundreds)
				current.ones = null
				current.tens = null
				current.hundreds = null
				return current
			})
		}
		const resetTimerToZeros = () => {
			setOnes(0)
			setTens(0)
			setHundreds(0)
		}
		if (game) {
			if (game.timer === 'active') {
				//? only set intervals if there isn't an interval already
				if (!timeIntervals.ones) setTimeIntervals({ ones: setInterval(() => updateTimer(setOnes), 1000), tens: setInterval(() => updateTimer(setTens), 1000 * 10), hundreds: setInterval(() => updateTimer(setHundreds), 1000 * 100) })
			}
			if (game.timer === 'reset') {
				clearAllIntervals()
				resetTimerToZeros()
			}
			if (game.timer === 'pause') {
				clearAllIntervals()
			}
			//* pauses counter at 999 when reached
			if (ones === 9 && tens === 9 && hundreds === 9) {
				clearAllIntervals()
			}
		}
	}, [game, hundreds, ones, tens, timeIntervals.ones])

	const resetGame = () => {
		setResetToggle((current) => !current)
		setShowEndGame({ show: false, disableBtns: false })
	}
	//* setup initial game
	useEffect(() => {
		createBlankLocalStorageHighscores()
		setShowEndGame({ show: false, disableBtns: false })

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
					<GameHeader game={game} setDifficulty={setDifficulty} resetGame={resetGame} timer={`${hundreds}${tens}${ones}`} showEndGame={showEndGame} />
					<GameGrid game={game} setGame={setGame} showEndGame={showEndGame} setShowEndGame={setShowEndGame} resetGame={resetGame} timer={`${hundreds}${tens}${ones}`} />
				</>
			)}
		</VStack>
	)
}

export default Game
