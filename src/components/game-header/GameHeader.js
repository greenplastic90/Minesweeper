import { HStack } from '@chakra-ui/react'
import React from 'react'
import DifficultyDropdown from './components/DifficultyDropdown'
import Flags from './components/Flags'
import ResetBtn from './components/ResetBtn'
import Timer from './components/Timer'

const GameHeader = ({ game, setDifficulty, resetGame, timer, showEndGame }) => {
	return (
		<HStack pos={'relative'} w={'-webkit-fill-available'} justifyContent={'space-between'} bgColor={'brand.header'} p='10px'>
			{/* dropdown */}
			<DifficultyDropdown setDifficulty={setDifficulty} resetGame={resetGame} showEndGame={showEndGame} />
			<HStack justify={'center'} spacing={'10px'}>
				{/* flags */}
				<Flags numberOfFlags={game.numberOfFlags} />
				{/* timer */}
				<Timer game={game} timer={timer} />
			</HStack>
			{/* rest button */}
			<ResetBtn setDifficulty={setDifficulty} resetGame={resetGame} showEndGame={showEndGame} />
		</HStack>
	)
}

export default GameHeader
