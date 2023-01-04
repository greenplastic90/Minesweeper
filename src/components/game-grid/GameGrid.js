import { GridItem, SimpleGrid } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useEffect } from 'react'
import EndGame from './EndGame'
import Field from './Field'
import { GameSetup } from './grid-functions'

const GameGrid = ({ game, setGame, showEndGame, setShowEndGame, resetGame }) => {
	const shakeAnimationDuration = 1.5
	const [runShakeAnimation, setRunShakeAnimation] = useState(false)
	const [shakeAnimation] = useState({ y: game.randomShakeArray(), x: game.randomShakeArray(), transition: { duration: shakeAnimationDuration } })
	const { fields, difficulty, fieldClickedValue, fieldClickedIndex } = game

	useEffect(() => {
		if (fieldClickedValue === 0 || fieldClickedValue === 'mine') {
			setRunShakeAnimation(true)
			setTimeout(() => setRunShakeAnimation(false), 1000 * shakeAnimationDuration)
		}
		//* added fieldClickedIndex to the dependency array, so that if fieldClickedValue happens to be 0 twice in a row, this shake animation would still run
	}, [fieldClickedValue, fieldClickedIndex])

	//* checks if game is won
	// useEffect(() => {
	// 	setGame((current) => {
	// 		if (current.isGameWon()) {
	// 			setShowEndGame(true)
	// 			current.pauseTimer()
	// 			return new GameSetup(current.difficulty, current.fields, current.fieldClickedIndex, current.fieldClickedValue, current.mineClickedIndex, current.timer)
	// 		}
	// 		return current
	// 	})
	// }, [setGame, setShowEndGame])

	return (
		<SimpleGrid pos={'relative'} as={motion.div} animate={runShakeAnimation ? shakeAnimation : 'null'} columns={difficulty.horizontal_boxes}>
			{fields.map((field) => (
				<GridItem key={field.id}>
					<Field field={field} game={game} setGame={setGame} setShowEndGame={setShowEndGame} />
				</GridItem>
			))}
			{showEndGame && <EndGame resetGame={resetGame} />}
		</SimpleGrid>
	)
}

export default GameGrid
