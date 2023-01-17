import { Button } from '@chakra-ui/react'
import React from 'react'

const HighScoresBtn = ({ btnWidth, setShowHighScore }) => {
	return (
		<>
			<Button
				onClick={() => {
					setShowHighScore((current) => !current)
				}}
				w={btnWidth}
				fontWeight={'normal'}
				borderRadius={0}>
				High Scores
			</Button>
		</>
	)
}

export default HighScoresBtn
