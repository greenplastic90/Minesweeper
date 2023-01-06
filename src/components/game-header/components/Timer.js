import { HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { ImClock2 } from 'react-icons/im'
const Timer = ({ timer }) => {
	return (
		<HStack spacing={'4px'}>
			<ImClock2 color={'#f5c242'} fontSize={'20px'} />
			<HStack spacing={0}>
				<Text fontSize={'30px'} color={'brand.header_text'}>
					{timer}
				</Text>
			</HStack>
		</HStack>
	)
}

export default Timer
