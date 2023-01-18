import { Button } from '@chakra-ui/react'
import React from 'react'

const HighScoresBtn = ({ btnWidth, handelHighScoreClick }) => {
	return (
		<>
			<Button onClick={handelHighScoreClick} w={btnWidth} fontWeight={'normal'} borderRadius={0}>
				HIGH SCORES
			</Button>
		</>
	)
}

export default HighScoresBtn
