import { Button } from '@chakra-ui/react'
import React from 'react'
import { localStorageDifficulty } from '../../game-grid/grid-functions'

const ResetBtn = ({ setDifficulty, resetGame }) => {
	return (
		<Button
			onClick={() => {
				setDifficulty(localStorageDifficulty())
				resetGame()
			}}
			fontWeight={'normal'}
			fontSize='20px'>
			Reset
		</Button>
	)
}

export default ResetBtn
