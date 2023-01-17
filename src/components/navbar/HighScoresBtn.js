import { Button } from '@chakra-ui/react'
import React from 'react'

const HighScoresBtn = ({ setShowHighScore }) => {
	return (
		<>
			<Button
				onClick={() => {
					setShowHighScore((current) => !current)
				}}
				fontWeight={'normal'}
				borderRadius={0}>
				High Scores
			</Button>
		</>
	)
}

export default HighScoresBtn
