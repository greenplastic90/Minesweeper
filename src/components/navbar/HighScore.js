import { HStack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { createBlankLocalStorageHighscores } from '../game-grid/grid-functions'

const HighScore = ({ navbarHighet }) => {
	const [localHighScores, setLocalHighScores] = useState()

	useEffect(() => {
		createBlankLocalStorageHighscores()
		const highScores = JSON.parse(localStorage.getItem('minesweeper-highscores'))
		setLocalHighScores(highScores)
	}, [])

	return (
		<VStack pos={'absolute'} top={navbarHighet} alignItems={'start'}>
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
