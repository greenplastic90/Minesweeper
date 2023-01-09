import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { ImClock2, ImTrophy } from 'react-icons/im'
import { BsArrowClockwise } from 'react-icons/bs'
import { useEffect } from 'react'
import { createBlankLocalStorageHighscores } from './grid-functions'
import Color from 'color'

const EndGame = ({ resetGame, showEndGame, timer }) => {
	return (
		<>
			{showEndGame.show && (
				<VStack pos={'absolute'} w='full' h='full' bg={'hsla(100, 100%, 10%, 0.3)'}>
					<VStack as={motion.div} animate={{ scale: [0, 1], transition: { delay: 0 } }} w='200px' zIndex={3} pt={['20px', null, '10%']}>
						<Times timer={timer} hasWon={showEndGame.winner} />
						<Button w='full' onClick={resetGame} borderRadius={0} _hover={{ bg: `${Color('hsl(186.5,79.3%,22.7%)').darken(0.25)}` }} bgColor='numbers.four' color='brand.header_text'>
							<BsArrowClockwise onClick={resetGame} style={{ transform: 'rotate(60deg)' }} size={'20px'} /> <Text pl={'15px'}>Play Again</Text>
						</Button>
					</VStack>
				</VStack>
			)}
		</>
	)
}

export default EndGame
const Times = ({ timer, hasWon }) => {
	const [currentScore, setCurrentScore] = useState(null)
	const [highScore, setHighScore] = useState(null)
	useEffect(() => {
		createBlankLocalStorageHighscores()

		const difficulty = localStorage.getItem('mineSweeperDiffuculty')
		const localHighscores = JSON.parse(localStorage.getItem('minesweeper-highscores'))
		const localDifficultyHighscore = localHighscores[difficulty]
		const score = parseInt(timer)

		if (hasWon) {
			if (!localDifficultyHighscore || score < localDifficultyHighscore) {
				const updatelocalHighscores = { ...localHighscores, [difficulty]: score }
				localStorage.setItem('minesweeper-highscores', JSON.stringify(updatelocalHighscores))
				setCurrentScore(score)
				setHighScore(score)
			} else {
				setCurrentScore(score)
				setHighScore(localDifficultyHighscore)
			}
		} else {
			setCurrentScore(null)
			setHighScore(localDifficultyHighscore)
		}
		//* only show high score
		//? if win
		//* check if current score > HS, if so update HS first, then display both score and HS
	}, [hasWon, timer])

	return (
		<HStack width='full' pt={'20px'} pb={'100px'} spacing={'40px'} justifyContent='center' bgColor={'numbers.four'}>
			<Time icon={<ImClock2 size={'30px'} color={'#f5c242'} />} time={currentScore} />
			<Time icon={<ImTrophy size={'30px'} color={'#f5c242'} />} time={highScore} />
		</HStack>
	)
}

const Time = ({ icon, time }) => {
	return (
		<VStack>
			{icon}
			<Text fontWeight={'bold'} color='white'>
				{time ? time : '---'}
			</Text>
		</VStack>
	)
}
