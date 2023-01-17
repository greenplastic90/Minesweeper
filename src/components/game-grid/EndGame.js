import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { ImClock2, ImTrophy } from 'react-icons/im'
import { BsArrowClockwise } from 'react-icons/bs'
import { useEffect } from 'react'
import { createBlankLocalStorageHighscores, getRandomNum } from './grid-functions'
import Color from 'color'

const EndGame = ({ resetGame, showEndGame, timer }) => {
	return (
		<>
			{showEndGame.show && (
				<VStack pos={'absolute'} w='full' h='full' bg={'hsla(100, 100%, 10%, 0.3)'}>
					<VStack as={motion.div} animate={{ scale: [0, 1], transition: { delay: 0 } }} w='200px' zIndex={3} mt={'10px'} pt={['20px', null, '10%']} backgroundColor={'hsl(0,0%,100%,0.3)'}>
						<Times timer={timer} hasWon={showEndGame.hasWon} />
						<Button w='full' onClick={resetGame} borderRadius={0} _hover={{ bg: `${Color('hsl(12.7,65.9%,44.9%)').darken(0.25)}` }} bgColor='numbers.two' color='brand.header_text'>
							<Text pl={'15px'}>{showEndGame.hasWon ? 'Play Again?' : 'Try Again?'}</Text>
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

	//* updates and displays higscores as needed
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
		<VStack w={'full'} spacing={'10px'}>
			<HStack width='full' pt={'5px'} spacing={'40px'} justifyContent='center'>
				<Time icon={<ImClock2 size={'50px'} color={'#f5c242'} />} time={currentScore} />
				<Time icon={<ImTrophy size={'50px'} color={'#f5c242'} />} time={highScore} />
			</HStack>
			<WinOrLose hasWon={hasWon} />
		</VStack>
	)
}

const WinOrLose = ({ hasWon }) => {
	const [message, setMessage] = useState('')

	const colors = { purple: 'hsl(265.6,34.1%,35.1%)', orange_dark: 'hsl(12.7,65.9%,44.9%)', pink_dark: 'hsl(338,57.1%,37.5%)', blue_dark: 'hsl(186.5,79.3%,22.7%)', brown: 'hsl(11.7,63.6%,23.7%)' }

	const messagePicker = (msgArr) => {
		const randIndex = Math.round(getRandomNum(0, msgArr.length - 1))
		return msgArr[randIndex]
	}
	const colorPicker = (previousIndex) => {
		const colorsValues = Object.values(colors)
		let index = Math.round(getRandomNum(0, colorsValues.length - 1))

		if (!(previousIndex === false)) {
			while (previousIndex === index) {
				index = Math.round(getRandomNum(0, colorsValues.length - 1))
			}
		}

		return { chosenColor: colorsValues[index], colorIndex: index }
	}

	useEffect(() => {
		const winMessages = ['You Win!', 'Bravo!', 'Hazzah!', 'You Rock!', 'Congrats!', 'Smashing!']
		const loseMessages = ['Ouch!', 'Boom!', "Don't Suck!", 'Watch Out!', 'Oh No!']
		setMessage(hasWon ? messagePicker(winMessages) : messagePicker(loseMessages))
		return () => setMessage('')
	}, [hasWon])

	return (
		<HStack>
			{message.split(' ').map((word, i) => {
				let delayValue = 0
				let previousIndex = false
				return (
					<HStack key={i} spacing={0}>
						{word.split('').map((letter, j) => {
							delayValue += getRandomNum(0.1, 0.5)
							const { chosenColor, colorIndex } = colorPicker(previousIndex)
							previousIndex = colorIndex
							return (
								<Text key={j} as={motion.div} color={'white'} animate={hasWon && { color: [Color(chosenColor).lighten(0.2).hex(), chosenColor, Color(chosenColor).lighten(0.2).hex()], y: [0, -10, 0], transition: { delay: delayValue, duration: 2, repeat: Infinity } }} fontSize={'50px'}>
									{letter}
								</Text>
							)
						})}
					</HStack>
				)
			})}
		</HStack>
	)
}

const Time = ({ icon, time }) => {
	return (
		<VStack>
			{icon}
			<Text fontSize={'30px'} color='white'>
				{time ? time : '---'}
			</Text>
		</VStack>
	)
}
