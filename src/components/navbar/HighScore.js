import { Divider, HStack, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { basicColors } from '../../theme/theme'
import { ImTrophy } from 'react-icons/im'
import { createBlankLocalStorageHighscores } from '../game-grid/grid-functions'

const HighScore = ({ navbarHighet, btnWidth }) => {
	const [localHighScores, setLocalHighScores] = useState()

	useEffect(() => {
		createBlankLocalStorageHighscores()
		const highScores = JSON.parse(localStorage.getItem('minesweeper-highscores'))
		setLocalHighScores(highScores)
	}, [])

	return (
		<VStack as={motion.div} animate={{ scale: [0, 1] }} pos={'absolute'} top={navbarHighet} right={1} w={btnWidth} py={'5px'} zIndex={3} bgColor={'gray.100'}>
			<ImTrophy size={'50px'} color={'#f5c242'} />
			<Divider w={'80%'} color={basicColors.black} />
			<VStack w={'full'} alignItems={'start'}>
				{localHighScores && Object.keys(localHighScores).map((difficulty) => <ScoreComp key={difficulty} difficulty={difficulty} score={localHighScores[difficulty]} />)}
			</VStack>
		</VStack>
	)
}

export default HighScore

const ScoreComp = ({ difficulty, score }) => {
	return (
		<HStack w={'full'} justifyContent={'space-around'}>
			<Text>{difficulty.toUpperCase()}</Text>
			<Text>{score ? score : '---'}</Text>
		</HStack>
	)
}
