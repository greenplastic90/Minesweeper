import { GridItem, SimpleGrid, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useEffect } from 'react'
import EndGame from './EndGame'
import Field from './Field'
import Instructions from './Instructions'

const GameGrid = ({
	game,
	setGame,
	showEndGame,
	setShowEndGame,
	resetGame,
	timer,
	setEndGameTimeout,
}) => {
	const shakeAnimationDuration = 1.5
	const [runShakeAnimation, setRunShakeAnimation] = useState(false)
	const [isFirstGame, setisFirstGame] = useState(true)

	const [shakeAnimation] = useState({
		y: game.randomShakeArray(),
		x: game.randomShakeArray(),
		transition: { duration: shakeAnimationDuration },
	})
	const { fields, difficulty, fieldClickedValue, fieldClickedIndex } = game

	useEffect(() => {
		if (fieldClickedValue === 0 || fieldClickedValue === 'mine') {
			setRunShakeAnimation(true)
			setTimeout(() => setRunShakeAnimation(false), 1000 * shakeAnimationDuration)
		}
		//* added fieldClickedIndex to the dependency array, so that if fieldClickedValue happens to be 0 twice in a row, this shake animation would still run
	}, [fieldClickedValue, fieldClickedIndex])

	//* instructions will only show the first time the page is loaded, but not on resets
	useEffect(() => {
		!game.isFirstClick() && setisFirstGame(false)
	}, [game])

	return (
		<VStack pos={'relative'}>
			<SimpleGrid
				w={'full'}
				as={motion.div}
				animate={runShakeAnimation ? shakeAnimation : 'null'}
				columns={difficulty.horizontal_boxes}>
				{fields.map((field) => (
					<GridItem key={field.id}>
						<Field
							field={field}
							game={game}
							setGame={setGame}
							setShowEndGame={setShowEndGame}
							setEndGameTimeout={setEndGameTimeout}
						/>
					</GridItem>
				))}
			</SimpleGrid>
			<EndGame resetGame={resetGame} showEndGame={showEndGame} timer={timer} />
			{isFirstGame && game.isFirstClick() && <Instructions />}
		</VStack>
	)
}

export default GameGrid
