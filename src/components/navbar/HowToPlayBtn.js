import { Button } from '@chakra-ui/react'
import React from 'react'

const HowToPlayBtn = ({ btnWidth }) => {
	return (
		<Button w={btnWidth} fontWeight={'normal'} borderRadius={0}>
			Instructions
		</Button>
	)
}

export default HowToPlayBtn
