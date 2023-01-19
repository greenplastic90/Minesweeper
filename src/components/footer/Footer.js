import { HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { basicColors } from '../../theme/theme'

const Footer = () => {
	return (
		<HStack w={'full'} justifyContent={'flex-end'} h='30px'>
			<Text fontWeight={'bold'} fontSize={'30px'} color={basicColors.blue_dark}>
				BasharOthman
			</Text>
		</HStack>
	)
}

export default Footer
