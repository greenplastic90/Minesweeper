import { HStack } from '@chakra-ui/react'
import React from 'react'
import HighScores from './HighScores'
import HowToPlay from './HowToPlay'
import LogoAndName from './LogoAndName'

const NavBar = () => {
	return (
		<HStack pos={'absolute'} top={0} w={'full'} h={'60px'} px={'5px'} justifyContent={'space-between'} alignContent={'center'} backgroundColor={'hsl(0,0%,100%.0.0)'}>
			<LogoAndName />
			<HStack>
				<HowToPlay />
				<HighScores />
			</HStack>
		</HStack>
	)
}

export default NavBar
