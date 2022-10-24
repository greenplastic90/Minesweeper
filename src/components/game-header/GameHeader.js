import { HStack } from '@chakra-ui/react'
import React from 'react'
import DifficultyDropdown from './components/DifficultyDropdown'
import Flags from './components/Flags'
import ResetBtn from './components/ResetBtn'
import Timer from './components/Timer'

const GameHeader = ({ difficulty, setDifficulty, resetGame }) => {
	return (
		<HStack
			w={'-webkit-fill-available'}
			justifyContent={'space-between'}
			// bgColor={'brand.header'}
		>
			{/* dropdown */}
			<DifficultyDropdown setDifficulty={setDifficulty} resetGame={resetGame} />
			<HStack>
				{/* flags */}
				<Flags numOfMines={difficulty.mines} />
				{/* timer */}
				<Timer />
			</HStack>
			{/* rest button */}
			<ResetBtn setDifficulty={setDifficulty} resetGame={resetGame} />
		</HStack>
	)
}

export default GameHeader
