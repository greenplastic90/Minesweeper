import { HStack } from '@chakra-ui/react'
import React from 'react'
import DifficultyDropdown from './components/DifficultyDropdown'
import Flags from './components/Flags'
import ResetBtn from './components/ResetBtn'
import Timer from './components/Timer'

const GameHeader = ({ difficulty, setDifficulty, resetGame, firstClick, numberOfFlags }) => {
	return (
		<HStack w={'-webkit-fill-available'} justifyContent={'space-between'}>
			{/* dropdown */}
			<DifficultyDropdown setDifficulty={setDifficulty} resetGame={resetGame} />
			<HStack w='full' justify={'center'}>
				{/* flags */}
				<Flags numberOfFlags={numberOfFlags} />
				{/* timer */}
				<Timer firstClick={firstClick} />
			</HStack>
			{/* rest button */}
			<ResetBtn setDifficulty={setDifficulty} resetGame={resetGame} />
		</HStack>
	)
}

export default GameHeader
