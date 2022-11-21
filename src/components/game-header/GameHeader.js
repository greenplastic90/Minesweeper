import { HStack } from '@chakra-ui/react'
import React from 'react'
import DifficultyDropdown from './components/DifficultyDropdown'
import Flags from './components/Flags'
import ResetBtn from './components/ResetBtn'
import Timer from './components/Timer'

const GameHeader = ({ setDifficulty, resetGame, fieldClickedIndex, numberOfFlags, mineClickedIndex }) => {
	return (
		<HStack pos={'relative'} w={'-webkit-fill-available'} justifyContent={'space-between'} bgColor={'brand.header'} p='10px'>
			{/* dropdown */}
			<DifficultyDropdown setDifficulty={setDifficulty} resetGame={resetGame} />
			<HStack justify={'center'} spacing={'10px'}>
				{/* flags */}
				<Flags numberOfFlags={numberOfFlags} />
				{/* timer */}
				<Timer fieldClickedIndex={fieldClickedIndex} mineClickedIndex={mineClickedIndex} />
			</HStack>
			{/* rest button */}
			<ResetBtn setDifficulty={setDifficulty} resetGame={resetGame} />
		</HStack>
	)
}

export default GameHeader
