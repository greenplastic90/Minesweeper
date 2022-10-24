import { Button } from '@chakra-ui/react'
import React from 'react'
import { easy, hard, medium } from '../../difficulty-options'
import { localStorageDifficulty } from '../../game-grid/grid-functions'

const ResetBtn = ({ setDifficulty, resetGame }) => {
	return (
		<Button
			onClick={() => {
				resetGame()
				setDifficulty(localStorageDifficulty())
			}}>
			Reset
		</Button>
	)
}

export default ResetBtn
