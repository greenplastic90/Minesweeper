import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import Color from 'color'
import { basicColors } from '../../theme/theme'

const LogoAndName = () => {
	return (
		<HStack>
			<Logo />
			<Text fontSize={'30px'} color={'white'}>
				MINESWEEPER
			</Text>
		</HStack>
	)
}

const Logo = () => {
	return (
		<VStack w='45px' h='45px' justifyContent={'center'} bgColor={'numbers.six'}>
			<Box w={'18px'} h={'18px'} bgColor={Color(basicColors.pink_dark).darken(0.5).hex()} borderRadius={'full'} />
		</VStack>
	)
}

export default LogoAndName
