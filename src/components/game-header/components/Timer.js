import { HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { ImClock2 } from 'react-icons/im'
const Timer = () => {
	return (
		<HStack>
			<ImClock2 />
			<Text>000</Text>
		</HStack>
	)
}

export default Timer
