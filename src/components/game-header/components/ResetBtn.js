import { Button } from '@chakra-ui/react'
import React from 'react'
import { localStorageDifficulty } from '../../game-grid/grid-functions'

const ResetBtn = ({ setDifficulty, resetGame, showEndGame }) => {
	return (
		<Button
			disabled={showEndGame.disableBtns}
			onClick={() => {
				setDifficulty(localStorageDifficulty())
				resetGame()
			}}
			borderRadius={0}
			fontWeight={'normal'}
			fontSize={['15px', '20px']}>
			RESET
		</Button>
	)
}

export default ResetBtn
