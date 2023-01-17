import { HStack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { basicColors } from '../../theme/theme'
import { createBlankLocalStorageHighscores } from '../game-grid/grid-functions'

const HighScore = ({ navbarHighet }) => {
	const [localHighScores, setLocalHighScores] = useState()

	useEffect(() => {
		createBlankLocalStorageHighscores()
		const highScores = JSON.parse(localStorage.getItem('minesweeper-highscores'))
		setLocalHighScores(highScores)
	}, [])

	return (
		<VStack pos={'absolute'} top={navbarHighet} right={1} w={['100px']} h={'200px'} zIndex={3} alignItems={'start'} bgColor={basicColors.white}>
			{localHighScores && Object.keys(localHighScores).map((difficulty) => <ScoreComp key={difficulty} difficulty={difficulty} score={localHighScores[difficulty]} />)}
		</VStack>
	)
}

export default HighScore

const ScoreComp = ({ difficulty, score }) => {
	return (
		<HStack>
			<Text>{difficulty}</Text>
			<Text>{score ? score : '---'}</Text>
		</HStack>
	)
}
